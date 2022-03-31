import React, { useEffect, useState, useContext } from "react";
import { Button, Typography } from "@mui/material";
import { color1 } from "./colors";
import { UserContext } from "./UserContext";

function InvestorRequest(props) {
  const { investorSpendingRequest, getSpendingRequest, userDetails } =
    useContext(UserContext);
  const [requestList, setRequestList] = useState([]);

  const onClick = async (value, requestId) => {
    let details = {
      address: userDetails.address,
      name: userDetails.name,
      status: value,
    };
    let result = await investorSpendingRequest(
      props.projectId,
      requestId,
      details
    );
    console.log("result: ", result);
  };

  const RequestCard = (props) => {
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
        }}>
        <div
          style={{
            display: "flex",
          }}>
          <div style={{ width: "74%", marginRight: "10px" }}>
            <Typography variant='subtitle1'>
              Recipient Address : {recipient}
            </Typography>
            <Typography variant='subtitle1'>{description}</Typography>
            <Typography variant='subtitle1' color='gray'>
              Spending Amount : {amount}
            </Typography>
            <Typography variant='subtitle1' color='gray'>
              Total Approvals : {approvalCount}
            </Typography>
          </div>
          <div
            style={{
              width: "25%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}>
            <Button
              variant='contained'
              style={{
                backgroundColor: "#02A95C",
                // marginTop: "15px",
              }}
              onClick={() => onClick(true, id)}>
              Accept
            </Button>
            <Button
              variant='contained'
              style={{
                backgroundColor: "#c82333",
                // marginTop: "15px",
              }}
              onClick={() => onClick(false, id)}>
              Decline
            </Button>
          </div>
        </div>
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
      <Typography variant='h4'>Requests List</Typography>;
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
            <RequestCard key={i.id} datas={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default InvestorRequest;
