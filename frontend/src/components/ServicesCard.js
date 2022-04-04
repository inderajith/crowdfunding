import React from "react";
import { AccessAlarm } from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";
import Typography from "@mui/material/Typography";

import { color1 } from "./colors";

function ServicesCard(props) {
  const { title, description, icon } = props;

  return (
    <div className='serviceCardContainer'>
      {icon}
      <div>
        <Typography variant='h6'>{title}</Typography>
        <div>
          <Typography color='#adadad' variant='subtitle1'>
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default ServicesCard;
