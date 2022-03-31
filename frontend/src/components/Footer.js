import React from "react";
import Typography from "@mui/material/Typography";
import { color1 } from "./colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  const footer1 = [
    { title: "About Us" },
    { title: "Blog" },
    { title: "Help & Support" },
    { title: "Trust & Safety" },
    { title: "Contact" },
  ];
  const footer2 = [
    { title: "Success Stories" },
    { title: "how it works" },
    { title: "Common Questions" },
    { title: "What we do" },
  ];
  const footer3 = [
    { title: "Fundraising Ideas" },
    { title: "Explore" },
    { title: "Experts Directory" },
    { title: "Fees" },
  ];

  return (
    <div className='footerContainer'>
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%" }}>
          <Typography variant='h6' color={color1}>
            ABOUT
          </Typography>
          {footer1.map((i) => {
            return (
              <Typography key={i.title} color='#adadad' variant='subtitle1'>
                {i.title}
              </Typography>
            );
          })}
        </div>
        <div style={{ width: "20%" }}>
          <Typography variant='h6' color={color1}>
            LEARN MORE
          </Typography>
          {footer2.map((i) => {
            return (
              <Typography key={i.title} color='#adadad' variant='subtitle1'>
                {i.title}
              </Typography>
            );
          })}
        </div>
        <div style={{ width: "20%" }}>
          <Typography variant='h6' color={color1}>
            RESOURCES
          </Typography>
          {footer3.map((i) => {
            return (
              <Typography key={i.title} color='#adadad' variant='subtitle1'>
                {i.title}
              </Typography>
            );
          })}
        </div>
        <div
          style={{
            width: "20%",
            marginLeft: "30px",
            display: "flex",
            justifyContent: "space-around",
          }}>
          <FacebookIcon fontSize='large' color='success' />
          <YouTubeIcon fontSize='large' color='success' />
          <TwitterIcon fontSize='large' color='success' />
          <InstagramIcon fontSize='large' color='success' />
        </div>
      </div>
      <div className='line'></div>

      <p className='credit'>© 2022</p>
    </div>
  );
}

export default Footer;
