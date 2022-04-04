import React, { useEffect, useState, useContext } from "react";
import { Button, Typography } from "@mui/material";
import { color1 } from "./colors";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function InvestorProfile(props) {
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState([]);
  const { getInvestedProjects } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      let result = await getInvestedProjects();
      setProjectsList(result);
    })();
  }, []);

  const ProjectCard = (props) => {
    const { id, title, tagline, investedAmount } = props.datas;

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
          <div style={{ width: "90%" }}>
            <Typography variant='h6'>{title}</Typography>
            <Typography variant='subtitle1' color='gray'>
              {tagline}
            </Typography>
          </div>
          <div
            style={{
              width: "7%",
              marginLeft: "10px",
            }}>
            <Typography variant='h4'>{investedAmount} RZN</Typography>
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
        Projects Invested
      </Typography>
      {projectsList.map((i) => (
        <ProjectCard key={i.id} datas={i} />
      ))}
    </div>
  );
}

export default InvestorProfile;
