import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { color1 } from "./colors";
import ServicesCard from "./ServicesCard";
import PublicIcon from "@mui/icons-material/Public";
import Header from "./Header";
import { FormControl, Grid, InputLabel, Select } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Backdrop, Paper, TextField } from "@mui/material";
import {
  Close,
  Favorite,
  HealthAndSafety,
  ListAlt,
  ManageSearch,
  Settings,
} from "@mui/icons-material";
import CheckDetails from "./CheckDetails";
import HomeBannerImg from "../images/homeBanner.png";
import ReviewBannerImg from "../images/reviewImg.jpg";
const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, selectedAccount } = useContext(UserContext);
  const servicesData1 = [
    {
      id: "1",
      title: "Simple Setup",
      description:
        "You can create an account and start a project or fund projects in just few mins of creation.",
      icon: (
        <Settings
          color='success'
          style={{ marginTop: "2px", marginRight: "8px" }}
        />
      ),
    },
    {
      id: "2",
      title: "Transparency",
      description:
        "The entire process is transparent and no one can tamper the datas.",
      icon: (
        <ListAlt
          color='success'
          style={{ marginTop: "2px", marginRight: "8px" }}
        />
      ),
    },
    {
      id: "3",
      title: "Trust",
      description:
        "Smart contract code handles logic and no middleman is there.",
      icon: (
        <Favorite
          color='success'
          style={{ marginTop: "2px", marginRight: "8px" }}
        />
      ),
    },
  ];
  const servicesData2 = [
    {
      id: "1",
      title: "Secure",
      description:
        "Our app is built on top of blockchain, so there is no way to loss your funds.",
      icon: (
        <HealthAndSafety
          color='success'
          style={{ marginTop: "2px", marginRight: "8px" }}
        />
      ),
    },
    {
      id: "2",
      title: "WorldWide usage",
      description:
        "Our app is used all over the world for its trust, transparency and security",
      icon: (
        <PublicIcon
          color='success'
          style={{ marginTop: "2px", marginRight: "8px" }}
        />
      ),
    },
    {
      id: "3",
      title: "Trackage of funds",
      description:
        "Each and every transaction is recorded for the easy trackage for users.",
      icon: (
        <ManageSearch
          color='success'
          style={{ marginTop: "2px", marginRight: "8px" }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className='bannerContainer'>
        <img src={HomeBannerImg} className='homeBanner' />
        <div className='bannerRight'>
          <Typography variant='h4'>
            Trusted Fundraising for all life's moments.
          </Typography>
          <Typography color='#adadad' variant='subtitle1'>
            Get Help. Give Kindness.
          </Typography>
          <Button
            variant='contained'
            onClick={() => navigate("/ProjectList")}
            style={{
              backgroundColor: color1,
              marginTop: "15px",
            }}>
            Fund a project
          </Button>
        </div>
      </div>
      <div className='servicesContainer'>
        <Typography textAlign='center' variant='h3'>
          Our Services
        </Typography>
        <div style={{ display: "flex" }}>
          {servicesData1.map((i) => (
            <ServicesCard
              key={i.id}
              title={i.title}
              description={i.description}
              icon={i.icon}
            />
          ))}
        </div>
        <div style={{ display: "flex" }}>
          {servicesData2.map((i) => (
            <ServicesCard
              key={i.id}
              title={i.title}
              description={i.description}
              icon={i.icon}
            />
          ))}
        </div>
        <Button
          variant='contained'
          onClick={() => navigate("/EnterDetailsProject")}
          sx={{
            backgroundColor: color1,
            marginLeft: "42%",
          }}>
          Start project
        </Button>
      </div>
      <div className='reviewContainer'>
        <div className='reviewContainerLeft'>
          <Typography variant='h4'>Alan's Story</Typography>
          <Typography mt={4} color='#adadad' variant='subtitle1'>
            I thought about the times in my life when I couldn't even afford $5
            for a book. That's when it hit me. Wouldn't it be cool if the price
            tag said, '5 jumping jacks and a sit-up? for a book. That's when it
            hit me. Wouldn't it be cool if the price tag said, '5 jumping jacks
            and a sit-up?'
          </Typography>
        </div>
        <div className='reviewContainerRight'>
          <img src={ReviewBannerImg} className='reviewBanner' />
        </div>
      </div>
      <div className='statisticsContainer'>
        <div
          style={{
            width: "30%",
          }}>
          <Typography
            fontWeight={400}
            variant='h2'
            textAlign='center'
            color={color1}>
            28
          </Typography>
          <Typography textAlign='center' variant='h6'>
            Projects Funded
          </Typography>
        </div>
        <div
          style={{
            width: "30%",
          }}>
          <Typography
            fontWeight={400}
            variant='h2'
            textAlign='center'
            color={color1}>
            $79,097
          </Typography>
          <Typography textAlign='center' variant='h6'>
            Total Raised
          </Typography>
        </div>
        <div
          style={{
            width: "30%",
          }}>
          <Typography
            fontWeight={400}
            variant='h2'
            textAlign='center'
            color={color1}>
            4,284
          </Typography>
          <Typography textAlign='center' variant='h6'>
            Total Investors
          </Typography>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ResponsiveAppBar;
