import React, { useContext, useState, useEffect } from "react";
import { color1 } from "./colors";
import { UserContext } from "./UserContext";
import {
  Backdrop,
  Paper,
  TextField,
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { PlusOne } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";

function CreatorRequest(props) {
  const { createSpendingRequest, getSpendingRequest } = useContext(UserContext);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [requestList, setRequestList] = useState([]);
  const [backdropDetails, setBackdropDetails] = useState({
    id: String(
      Math.floor(Math.random() * 10000 + 1) + new Date().toISOString()
    ),
    description: "This is the exmaple spending request message",
    amount: 2,
    recipient: "0x0Acbd51D560D1bD1d53Fe2e2506db23d5F209bEc",
    completed: false,
    approvalCount: 0,
    approvals: [],
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
    let result = await createSpendingRequest(props.projectId, backdropDetails);
    if (result?.success) {
      handleToggleBackdrop();
      let result = await getSpendingRequest(props.projectId);
      setRequestList(result);
    }
  };

  const ProjectCard = (props) => {
    const {
      id,
      description,
      amount,
      recipient,
      completed,
      approvalCount,
      approvals,
    } = props.datas;

    return (
      <div
        style={{
          padding: "20px",
          width: "80%",
          borderRadius: "5px",
          boxShadow: "1px 2px 12px 1px rgba(199,199,199,0.81)",
          marginBottom: "25px",
          backgroundColor: "#fff",
          margin: "20px 0",
        }}>
        <Typography variant='subtitle1'>
          Recipient Address : {recipient}
        </Typography>
        <Typography variant='subtitle1'>{description}</Typography>
        <Typography variant='subtitle1' color='gray'>
          Spending Amount : {amount} RZN
        </Typography>
        <Typography variant='subtitle1' color='gray'>
          Total Approvals : {approvalCount}
        </Typography>
        {completed && (
          <Button
            variant='contained'
            sx={{ width: "20%", my: 1 }}
            onClick={() => {}}>
            Send Amount
          </Button>
        )}
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      let result = await getSpendingRequest(props.projectId);
      setRequestList(result);
    })();
  }, []);
  return (
    <div
      style={{
        padding: "40px 50px 0",
        backgroundColor: "#fafafa",
        minHeight: "600px",
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Typography variant='h4'>Requests List</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          sx={{ width: "25%" }}
          onClick={handleToggleBackdrop}>
          Create Spending Request
        </Button>
      </div>
      {requestList.length === 0 ? (
        <Typography
          variant='h6'
          color='gray'
          sx={{ textAlign: "center", mt: 25 }}>
          No Active request available
        </Typography>
      ) : (
        <div>
          {requestList.map((i) => (
            <ProjectCard key={i.id} datas={i} />
          ))}
        </div>
      )}

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

          <TextField
            id='recipient'
            label='Recipient'
            variant='outlined'
            sx={{ my: 2 }}
            value={backdropDetails?.recipient}
            onChange={(e) => onChange("recipient", e.target.value)}
          />
          <TextField
            id='description'
            label='Description'
            variant='outlined'
            sx={{ my: 2 }}
            value={backdropDetails?.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
          <TextField
            id='amount'
            label='Amount'
            variant='outlined'
            sx={{ my: 2, mb: 4 }}
            value={backdropDetails?.amount}
            onChange={(e) => onChange("amount", Number(e.target.value))}
          />
          <Button
            variant='contained'
            sx={{ width: "25%", mt: 4, alignSelf: "flex-end" }}
            onClick={onSubmit}>
            Confirm
          </Button>
        </Paper>
      </Backdrop>
    </div>
  );
}

export default CreatorRequest;
