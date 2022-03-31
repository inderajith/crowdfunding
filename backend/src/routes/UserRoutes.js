const express = require("express");
const userRoutes = express.Router();
const Project = require("../models/Project");
const User = require("../models/User");
const ContractProject = require("../models/ContractProject");

userRoutes.get("/details/:address", (req, res) => {
  const address = req.params.address;
  User.find({ address }).exec((err, data) => {
    if (err) {
      console.log("err in fetching account details: ", err);
      res.send({ msg: "error in fetching account details", success: false });
    } else {
      if (data?.length === 0) {
        res.status(200).json({
          msg: "Not registered",
          success: false,
          details: {},
        });
      } else {
        res.status(200).json({
          msg: "Account details fetched",
          success: true,
          details: data[0],
        });
      }
    }
  });
});

userRoutes.post("/signup", (req, res) => {
  const { userData } = req.body;
  let user = new User(userData);
  user
    .save()
    .then(() => {
      res
        .status(200)
        .json({ msg: "Account Created Successfully", success: true });
    })
    .catch((err) => {
      console.log("err in Signup", err);
      res.status(404).json({
        msg: "Failed to Signup. Try again Later!",
        success: false,
      });
    });
});

userRoutes.get("/project", (req, res) => {
  Project.find({}, function (err, projects) {
    if (err) {
      console.log("err in fetching: ", err);
      res.send("error in fetching");
    } else {
      let myArray = projects.map((i) => {
        return {
          id: i._id,
          title: i.title,
          tagline: i.tagline,
          amount: i.amount,
          thumbnail: i.thumbnail,
          raisedAmount: i.raisedAmount,
        };
      });
      res.status(200).json({ projectList: myArray });
    }
  });
});

userRoutes.get("/project/:id", (req, res) => {
  const projectId = req.params.id;
  Project.find({ _id: projectId }).exec((err, data) => {
    if (err) {
      console.log("err in fetching project details: ", err);
      res.send("error in fetching project details");
    } else {
      ContractProject.find({ projectId }).exec((err1, data1) => {
        if (err1) {
          console.log("err in fetching Contract Project details: ", err1);
          res.send("error in fetching Contract Project details");
        } else {
          res.status(200).json({
            details: data[0],
            contractAddress: data1[0].contractAddress,
          });
        }
      });
    }
  });
});

userRoutes.post("/project", (req, res) => {
  const { address, projectData } = req.body;

  User.find({ address })
    .populate("projects")
    .exec((err, fetchedData) => {
      if (err) {
        console.log("err in adding projects userRoutes: ", err);
        res.status(404).json({
          msg: "Failed to add in projects. Try again Later!",
          success: false,
        });
      } else {
        let myData = {
          userId: "0x0Acbd51D560D1bD1d53Fe2e2506db23d5F209bEc",
          title: "Weather Forecasting Alarm",
          tagline:
            "A devices which detects and gives alarm before a natural disaster gonna happen.",
          amount: "10000",
          raisedAmount: "3000",
          endDate: "2022-03-08T05:41:31.233Z",
          about:
            "We appreciate your support with this Special Mission of ReStorage The Love to help George & Jeremy Hales with YouTube Channel What the Hales raise funds. Education will help the Orphan Children get exposure to new ideas and concepts that can be used to appreciate and improve the world around them. Georges Aunt Kamilia & Georges Mom were both Orphans growing up in Egypt, and this Mission has become a passion close to their hearts.",
          thumbnail: "Thumbnail string",
          imageGallery: "Image gallery",
          videoLink: "https://youtu.be/fdErsR8_NaU",
          otherLink: "https://www.accuweather.com/en/press/57827706",
        };
        const myProject = new Project(projectData);
        let projectId;
        myProject
          .save()
          .then((details) => {
            projectId = details._id;
            console.log("fetchedData: ", fetchedData);
            fetchedData[0].projects.push(myProject);
            return fetchedData[0].save();
          })
          .then((ee) => {
            console.log("ee: ", ee);
            res
              .status(200)
              .json({ msg: "Submition Successful", success: true, projectId });
          })
          .catch((err) => {
            console.log("err in projects saving to database", err);
            res.status(404).json({
              msg: "Failed to add in projects. Try again Later!",
              success: false,
            });
          });
      }
    });
});

userRoutes.post("/createContract", (req, res) => {
  const { details } = req.body;
  let contractProject = new ContractProject(details);
  contractProject
    .save()
    .then(() => {
      res
        .status(200)
        .json({ msg: "Contract Created Successfully", success: true });
    })
    .catch((err) => {
      console.log("err in Contract Creation", err);
      res.status(404).json({
        msg: "Failed to Create Contract. Try again Later!",
        success: false,
      });
    });
});

userRoutes.post("/fundProject/:id", (req, res) => {
  const projectId = req.params.id;
  const { details } = req.body;
  Project.find({ _id: projectId }).exec((err, data) => {
    if (err) {
      console.log("err in fetching project details: ", err);
      res.send("error in fetching project details");
    } else {
      console.log("data: ", data);
      data[0].raisedAmount += details.amount;
      data[0].remainingAmount += details.amount;
      data[0].investors.push(details);
      data[0].save().then(() => {
        User.find({ address: details.address }).exec((err, fetchedData) => {
          if (err) {
            console.log(
              "err in adding investors project adding userRoutes: ",
              err
            );
            res.status(404).json({
              msg: "Failed to add investors project. Try again Later!",
              success: false,
            });
          } else {
            fetchedData[0].invested.push(projectId);
            fetchedData[0]
              .save()
              .then(() => {
                res.status(200).json({
                  msg: "Successfully Funded the project",
                  success: true,
                });
              })
              .catch((err) => {
                console.log("err in Funding the project", err);
                res.status(404).json({
                  msg: "Failed to Funding the project. Try again Later!",
                  success: false,
                });
              });
          }
        });
      });
    }
  });
});

userRoutes.get("/investedProjects/:address", (req, res) => {
  const address = req.params.address;
  let investedProjects = [];
  User.find({ address }).exec(async (err, data) => {
    if (err) {
      console.log("err in fetching invested projects: ", err);
      res.status(404).json({
        msg: "Failed to fetch invested projects. Try again Later!",
        success: false,
      });
    } else {
      let myArr = data[0]?.invested;
      myArr.map((item) => {
        Project.findOne({ _id: item }, function (err, projects) {
          if (err) {
            console.log("err in fetching invested projects: ", err);
            res.status(404).json({
              msg: "Failed to fetch invested projects. Try again Later!",
              success: false,
            });
          } else {
            let investedDetails = projects.investors.filter(
              (i1) => i1.address === address
            );
            let details = {
              id: projects._id,
              title: projects.title,
              tagline: projects.tagline,
              investedAmount: investedDetails[0].amount,
            };
            console.log("details: ", details);
            investedProjects.push(details);
          }
        });
      });
      console.log("investedProjects: ", investedProjects);
      setTimeout(() => {
        res.status(200).json({ investedProjects });
      }, 2000);
    }
  });
});

userRoutes.get("/createdProjects/:address", (req, res) => {
  const address = req.params.address;
  let investedProjects = [];
  User.find({ address })
    .populate("projects")
    .exec((err, fetchedData) => {
      if (err) {
        console.log("err in fetching created projects userRoutes: ", err);
        res.status(404).json({
          msg: "Failed to fetch projects. Try again Later!",
          success: false,
        });
      } else {
        console.log("fetchedData: ", fetchedData[0].projects);
        let myArray = fetchedData[0].projects.map((i) => {
          return {
            id: i._id,
            title: i.title,
            tagline: i.tagline,
            amount: i.amount,
            raisedAmount: i.raisedAmount,
            startDate: i.startDate,
            endDate: i.endDate,
            investorsCount: i.investors.length,
          };
        });
        res.status(200).json({ projectsList: myArray });
      }
    });
});

userRoutes.post("/createSpendingRequest/:id", (req, res) => {
  const projectId = req.params.id;
  const { details } = req.body;
  Project.find({ _id: projectId }).exec((err, data) => {
    if (err) {
      console.log("err in fetching project details: ", err);
      res.send("error in fetching project details");
    } else {
      data[0].requests.push(details);
      data[0]
        .save()
        .then(() => {
          res.status(200).json({
            msg: "Successfully Created Spending Request",
            success: true,
          });
        })
        .catch((err) => {
          console.log("err in creating spending request", err);
          res.status(404).json({
            msg: "Failed to create spending request. Try again Later!",
            success: false,
          });
        });
    }
  });
});

userRoutes.get("/getSpendingRequest/:id", (req, res) => {
  const projectId = req.params.id;
  Project.find({ _id: projectId }).exec((err, data) => {
    if (err) {
      console.log("err in fetching project details: ", err);
      res.status(200).json({
        msg: "Successfully Created Spending Request",
        success: false,
        details: [],
      });
      res.send("error in fetching project details");
    } else {
      res.status(200).json({
        msg: "Successfully Fetched Spending Request",
        success: true,
        details: data[0].requests,
      });
    }
  });
});

userRoutes.post(
  "/investorSpendingRequest/:projectId/:requestId",
  (req, res) => {
    const projectId = req.params.projectId;
    const requestId = req.params.requestId;
    const { details } = req.body;
    Project.find({ _id: projectId }).exec((err, data) => {
      if (err) {
        console.log("err in investor Spending Request: ", err);
        res.status(404).json({
          msg: "Failed investor Spending Request Try again Later!",
          success: false,
        });
      } else {
        let investorsCount = data[0].investors.length;
        let requestsCount;
        data[0].requests.map((i) => {
          if (i.id === requestId) {
            i.approvals.push(details);
            if (details?.status) {
              requestsCount = i.approvalCount + 1;
              i.approvalCount += 1;
            }
            if ((requestsCount / investorsCount) * 100 > 50) {
              i.completed = true;
            }
          }
        });
        data[0]
          .save()
          .then(() => {
            res.status(200).json({
              msg: "Successfull investor request",
              success: true,
            });
          })
          .catch((err) => {
            console.log("err in creating spending request", err);
            res.status(404).json({
              msg: "Failed to create spending request. Try again Later!",
              success: false,
            });
          });
      }
    });
  }
);

module.exports = userRoutes;
