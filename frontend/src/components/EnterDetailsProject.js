import React, { useState, useContext } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { color1 } from "./colors";
import { UserContext } from "./UserContext";

function EnterDetailsProject() {
  const navigate = useNavigate();
  const { postProjectDetails, selectedAccount, setSnackbarDetails } =
    useContext(UserContext);
  const [inputValues, setInputValues] = useState({
    title: "Weather Forecasting Alarm",
    tagline:
      "A devices which detects and gives alarm before a natural disaster gonna happen.",
    amount: 100,
    minimumContribution: 5,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    about:
      "We appreciate your support with this Special Mission of ReStorage The Love to help George & Jeremy Hales with YouTube Channel What the Hales raise funds. Education will help the Orphan Children get exposure to new ideas and concepts that can be used to appreciate and improve the world around them. Georges Aunt Kamilia & Georges Mom were both Orphans growing up in Egypt, and this Mission has become a passion close to their hearts.",
    thumbnail: "",
    imageGallery: "",
    videoLink: "https://youtu.be/fdErsR8_NaU",
    otherLink: "https://www.accuweather.com/en/press/57827706",
    raisedAmount: 0,
    remainingAmount: 0,
    userId: selectedAccount,
    investors: [],
    requests: [],
  });

  const onChange = (inputKey, value) => {
    setInputValues((prev) => ({ ...prev, [inputKey]: value }));
  };

  const onFileChange = (inputKey, event) => {
    let file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setInputValues((prev) => ({ ...prev, [inputKey]: e.target.result }));
      };
    }
  };

  const onSubmit = async () => {
    let myDetails = {
      address: selectedAccount,
      projectData: inputValues,
    };
    let res = await postProjectDetails(myDetails);
    if (res?.success) {
      navigate("/");
      setSnackbarDetails({
        message: "Project Started Successfull",
        open: true,
      });
    }
    console.log("res: ", res);
  };

  return (
    <div
      style={{
        padding: "30px 50px",
        display: "flex",
        justifyContent: "space-between",
      }}>
      <div className='leftDetailsContainer'>
        <div style={{ marginBottom: "30px" }}>
          <Typography variant='h5' mb={1}>
            Project Title
          </Typography>
          <TextField
            id='title'
            label='Enter title'
            variant='outlined'
            fullWidth
            value={inputValues.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Typography variant='h5' mb={1}>
            Short Tagline
          </Typography>
          <TextField
            id='tagline'
            label='Enter short description in one line'
            variant='outlined'
            fullWidth
            value={inputValues.tagline}
            onChange={(e) => onChange("tagline", e.target.value)}
          />
        </div>
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <div>
            <Typography variant='h5' mb={1}>
              Amount to Raise
            </Typography>
            <TextField
              id='amount'
              label='Enter Amount'
              variant='outlined'
              fullWidth
              value={inputValues.amount}
              onChange={(e) => onChange("amount", Number(e.target.value))}
              sx={{ width: 180 }}
            />
          </div>
          <div>
            <Typography variant='h5' mb={1}>
              Minimum Contribution Amount
            </Typography>
            <TextField
              id='minimumContribution'
              label='Minimum Amount'
              variant='outlined'
              fullWidth
              value={inputValues.minimumContribution}
              onChange={(e) =>
                onChange("minimumContribution", Number(e.target.value))
              }
              sx={{ width: 320 }}
            />
          </div>
          <div>
            <Typography variant='h5' mb={1}>
              End Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label='Date desktop'
                  inputFormat='MM/dd/yyyy'
                  value={inputValues.endDate}
                  onChange={(e) => {
                    setInputValues((prev) => ({
                      ...prev,
                      endDate: e.toISOString(),
                    }));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Typography variant='h5' mb={1}>
            About Project
          </Typography>
          <TextField
            id='tagline'
            label='Enter in detail about project'
            variant='outlined'
            fullWidth
            value={inputValues.about}
            onChange={(e) => onChange("about", e.target.value)}
            multiline
            minRows={10}
          />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Typography variant='h5' mb={1}>
            Image Gallery
          </Typography>
          <div className='detailsImage'>
            <input
              type='file'
              onChange={(e) => onFileChange("imageGallery", e)}
            />
            {/* <button onClick={onFileUpload}>Upload!</button> */}
          </div>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Typography variant='h5' mb={1}>
            Video Link
          </Typography>
          <TextField
            id='videoLink'
            label='Youtube video links(if any)'
            variant='outlined'
            fullWidth
            value={inputValues.videoLink}
            onChange={(e) => onChange("videoLink", e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Typography variant='h5' mb={1}>
            Other Links
          </Typography>
          <TextField
            id='otherLink'
            label='Demo site, app store, Github repo'
            variant='outlined'
            fullWidth
            value={inputValues.otherLink}
            onChange={(e) => onChange("otherLink", e.target.value)}
          />
        </div>
        <Button
          variant='contained'
          style={{
            backgroundColor: color1,
            //   marginTop: "15px",
          }}
          onClick={onSubmit}>
          Submit
        </Button>
        <Button
          variant='outlined'
          style={{
            // backgroundColor: color1,
            marginLeft: "30px",
            color: "#adadad",
            borderColor: "#adadad",
          }}
          onClick={() => navigate("/")}>
          Cancel
        </Button>
      </div>
      <div style={{ width: "25%" }}>
        <Typography variant='h5' mb={1}>
          Thumbnail Image
        </Typography>
        <div className='detailsThumbnailImg'>
          <input type='file' onChange={(e) => onFileChange("thumbnail", e)} />
        </div>
      </div>
    </div>
  );
}

export default EnterDetailsProject;
