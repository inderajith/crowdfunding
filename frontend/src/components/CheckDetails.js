import React, { useContext, useState, useEffect } from "react";
import { color1 } from "./colors";
import { Link, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { Close } from "@mui/icons-material";

function CheckDetails() {
  const {
    selectedAccount,
    getUserDetails,
    register,
    setIsAuthenticated,
    login,
  } = useContext(UserContext);
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [backdropDetails, setBackdropDetails] = useState({
    address: selectedAccount,
    name: "",
    role: "",
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
    let result = await register(backdropDetails);
    if (result?.success) {
      localStorage.setItem("details", selectedAccount);
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    setBackdropDetails({
      address: selectedAccount,
      name: "",
      role: "",
    });
    (async () => {
      if (selectedAccount?.length !== 0) {
        let myAddress = localStorage.getItem("details");
        if (myAddress) {
          await getUserDetails();
          setIsAuthenticated(true);
        } else {
          setIsLoading(true);
          setIsRegistered(false);
          let result = await getUserDetails();
          if (result?.success) {
            setBackdropDetails(result?.details);
            setIsRegistered(true);
          } else {
            setBackdropDetails({
              address: selectedAccount,
              name: "",
              role: "",
            });
            setIsRegistered(false);
          }
          setIsLoading(false);
        }
      }
    })();
  }, [selectedAccount]);

  return (
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
        {/* <Close
      sx={{ alignSelf: "flex-end", my: 1, cursor: "pointer" }}
      onClick={handleToggleBackdrop}
    /> */}
        {isLoading ? (
          <CircularProgress sx={{ alignSelf: "center", mt: 10 }} />
        ) : (
          <>
            <TextField
              id='address'
              label='Wallet Address'
              variant='outlined'
              sx={{ my: 2 }}
              disabled={true}
              value={selectedAccount}
              onChange={(e) => onChange("address", e.target.value)}
            />
            <TextField
              id='name'
              label='Name'
              variant='outlined'
              sx={{ mt: 2, mb: 4 }}
              disabled={isRegistered}
              value={backdropDetails?.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Role</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                disabled={isRegistered}
                value={backdropDetails?.role}
                // sx={{ my: 2 }}
                label='Role'
                onChange={(e) => onChange("role", e.target.value)}>
                <MenuItem value='creator'>Creator</MenuItem>
                <MenuItem value='investor'>Investor</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant='contained'
              sx={{ width: "25%", mt: 4, alignSelf: "flex-end" }}
              onClick={isRegistered ? login : onSubmit}
              disabled={backdropDetails?.role === ""}>
              {isRegistered ? "Proceed" : "Submit"}
            </Button>
          </>
        )}
      </Paper>
    </Backdrop>
  );
}

export default CheckDetails;
