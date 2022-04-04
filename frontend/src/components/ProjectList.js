import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function ProjectList() {
  const navigate = useNavigate();
  const { getProjectsList } = useContext(UserContext);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      let result = await getProjectsList();
      setProjects(result);
    })();
  }, []);

  const MyCard = (props) => {
    const { title, tagline, amount, raisedAmount, thumbnail, id } = props.datas;
    return (
      <Card
        onClick={() => navigate(`/ViewDetails/${id}`)}
        sx={{
          width: "300px",
          marginLeft: "20px",
          marginRight: "70px",
          marginTop: "30px",
          marginBottom: "50px",
          borderRadius: "5px",
        }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='200'
            image={thumbnail}
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h5'>
              {title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {tagline}
            </Typography>
            <LinearProgress
              variant='determinate'
              color='success'
              value={(raisedAmount / amount) * 100}
              sx={{ my: 1 }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}>
              <Typography variant='h6' component='h6'>
                RZN {raisedAmount}
              </Typography>
              <Typography
                variant='subtitle1'
                component='p'
                ml={1}
                color='text.secondary'>
                of RZN {amount}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  return (
    <div style={{ margin: "20px" }}>
      <div style={{ display: "flex", margin: "40px 10px 10px 10px" }}>
        <TextField
          id='input-with-icon-textfield'
          placeholder='Search'
          sx={{ width: "75%" }}
          InputProps={{
            // startAdornment: (
            //   <InputAdornment position="start">
            //     <SearchIcon />
            //   </InputAdornment>
            // ),
            classes: {
              notchedOutline: {
                borderWidth: "px",
                borderColor: "green !important",
              },
            },
          }}
          variant='outlined'
        />
      </div>
      <Typography variant='h5' ml={2.5} mt={1} mb={1} fontSize='bold'>
        Top Fundraisers
      </Typography>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {
          //projects.length !== 0 && <MyCard datas={projects[0]} />
          projects.map((item) => (
            <MyCard key={item.id} datas={item} />
          ))
        }
      </div>
    </div>
  );
}
