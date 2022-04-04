import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  LinearProgress,
  Typography,
  TextField,
  Backdrop,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Close } from "@mui/icons-material";

import { color1 } from "./colors";
import { UserContext } from "./UserContext";

function ViewDetailsProject() {
  const params = useParams();
  const navigate = useNavigate();

  const investorsList = [
    {
      id: "1",
      name: "James",
      amount: "50",
    },
    {
      id: "2",
      name: "Robert",
      amount: "120",
    },
    {
      id: "3",
      name: "Jennifier",
      amount: "30",
    },
  ];
  const { getProjectDetails, fundProjectContract } = useContext(UserContext);

  const [projectDetails, setProjectDetails] = useState({});
  console.log("projectDetails: ", projectDetails);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [backdropDetails, setBackdropDetails] = useState({
    amount: projectDetails?.minimumContribution || 0,
  });

  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  const onChange = (key, value) => {
    setBackdropDetails((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const onSubmit = async () => {
    let result = await fundProjectContract(
      backdropDetails.amount,
      projectDetails._id
    );
    if (result?.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    (async () => {
      let result = await getProjectDetails(params.projectId);
      console.log("result: ", result);
      setProjectDetails(result);
    })();
  }, []);
  return (
    <div
      style={{
        padding: "30px 100px",
        display: "flex",
        justifyContent: "space-between",
      }}>
      <div style={{ width: "65%" }}>
        <Typography variant='h4' mb={3}>
          {projectDetails?.title}
        </Typography>
        <img
          src={projectDetails?.thumbnail}
          style={{ width: "100%", height: "400px" }}
        />
        <Typography variant='h5' mb={3} mt={5}>
          About the project
        </Typography>
        <Typography color='gray' variant='subtitle1'>
          {projectDetails?.about}
        </Typography>
        <Typography variant='h5' mb={2} mt={4}>
          Links
        </Typography>
        <Typography color='gray' variant='subtitle1'>
          {projectDetails?.videoLink}
        </Typography>
        <Typography color='gray' variant='subtitle1'>
          {projectDetails?.otherLink}
        </Typography>
      </div>
      <div style={{ width: "30%" }}>
        <div
          style={{
            padding: "20px",
            // border: "1px solid gray",
            borderRadius: "5px",
            boxShadow: "1px 2px 12px 1px rgba(199,199,199,0.81)",
          }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: "10px",
            }}>
            <Typography variant='h6'>
              RZN {projectDetails?.raisedAmount}
            </Typography>
            <Typography variant='subtitle1' color='gray' ml={1}>
              raised of RZN {projectDetails?.amount}
            </Typography>
          </div>
          <LinearProgress
            value={
              (projectDetails?.raisedAmount / projectDetails?.amount) * 100
            }
            variant='determinate'
            color='success'
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "30px 0",
            }}>
            <div>
              <Typography variant='h4'>
                {projectDetails?.investors?.length}
              </Typography>
              <Typography variant='subtitle1' color='gray'>
                Investors
              </Typography>
            </div>
            <div>
              <Typography variant='h4'>
                {moment(projectDetails?.endDate).diff(moment(), "days")}
              </Typography>
              <Typography variant='subtitle1' color='gray'>
                Days Left
              </Typography>
            </div>
          </div>
          <Button
            variant='contained'
            style={{
              backgroundColor: color1,
              width: "100%",
              //   marginTop: "15px",
            }}
            onClick={handleToggleBackdrop}>
            Fund Project
          </Button>
          <Button
            variant='outlined'
            style={{
              width: "100%",
              color: color1,
              borderColor: color1,
              marginTop: "20px",
              //   marginTop: "15px",
            }}>
            Share
          </Button>
        </div>
        <div
          style={{
            padding: "20px",
            marginTop: "50px",
            borderRadius: "5px",
            boxShadow: "1px 2px 12px 1px rgba(199,199,199,0.81)",
          }}>
          {projectDetails?.investors?.map((i) => {
            return (
              <div key={i.id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant='h6'>{i.name}</Typography>
                  <Typography variant='subtitle1' color='gray'>
                    RZN{i.amount}
                  </Typography>
                </div>
                <div className='line'></div>
              </div>
            );
          })}
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}>
        <Paper
          sx={{
            p: 5,
            pt: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: 200,
            minWidth: 600,
          }}>
          <Close
            sx={{ alignSelf: "flex-end", my: 1, cursor: "pointer" }}
            onClick={handleToggleBackdrop}
          />
          <Typography variant='subtitle1' color='gray'>
            Minimum Contribution RZN{projectDetails?.minimumContribution}
          </Typography>
          <TextField
            id='amount'
            label='Enter the Amount'
            variant='outlined'
            sx={{ my: 2 }}
            value={backdropDetails?.amount}
            onChange={(e) => onChange("amount", Number(e.target.value))}
          />
          <Button
            variant='contained'
            sx={{ width: "25%", mt: 4, alignSelf: "flex-end" }}
            onClick={onSubmit}
            disabled={
              backdropDetails?.amount < projectDetails?.minimumContribution
            }>
            Confirm
          </Button>
        </Paper>
      </Backdrop>
    </div>
  );
}

export default ViewDetailsProject;
