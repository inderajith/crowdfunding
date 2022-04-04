import React, { useState, useEffect, useContext } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { color1 } from "./colors";
import { UserContext } from "./UserContext";
import moment from "moment";

function CreatorProfile() {
  const navigate = useNavigate();

  const [projectList, setProjectList] = useState([]);
  const { getCreatedProjects } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      let result = await getCreatedProjects();
      setProjectList(result);
    })();
  }, []);

  const ProjectCard = (props) => {
    const {
      id,
      title,
      tagline,
      amount,
      raisedAmount,
      startDate,
      endDate,
      investorsCount,
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
          cursor: "pointer",
        }}
        onClick={() => navigate(`/Request/${id}`)}>
        <div
          style={{
            display: "flex",
          }}>
          <div style={{ width: "100%" }}>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='subtitle1'>{tagline}</Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}>
              <Typography variant='subtitle1' color='gray'>
                {moment(startDate).format("ll")}
              </Typography>
              <Typography variant='subtitle1' color='gray' sx={{ mx: 1 }}>
                to
              </Typography>
              <Typography variant='subtitle1' color='gray'>
                {moment(endDate).format("ll")}
              </Typography>
            </div>
            <Typography variant='subtitle1' color='gray'>
              {investorsCount} Investors
            </Typography>
            <Typography variant='subtitle1' color='gray'>
              Target {amount} RZN
            </Typography>
            <Typography variant='subtitle1' color='gray'>
              Raised Amount {raisedAmount} RZN
            </Typography>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      style={{
        padding: "40px 100px 0",
        backgroundColor: "#fafafa",
        minHeight: "600px",
      }}>
      <Typography variant='h4' mt={7} mb={2}>
        Projects Created
      </Typography>
      {projectList.map((i) => (
        <ProjectCard key={i.id} datas={i} />
      ))}
    </div>
  );
}

export default CreatorProfile;
