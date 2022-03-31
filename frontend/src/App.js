import "./App.css";
import EnterDetailsProject from "./components/EnterDetailsProject";
import Home from "./components/Home";
import ViewDetailsProject from "./components/ViewDetailsProject";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import Header from "./components/Header";
import React, { useContext, useEffect } from "react";
import { UserContext } from "./components/UserContext";
import CheckDetails from "./components/CheckDetails";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Profile from "./components/Profile";
import ProjectMain from "./contracts/ProjectMain.json";
import Web3 from "web3";
import Request from "./components/Request";

function App() {
  const {
    selectedAccount,
    setSelectedAccount,
    isAuthenticated,
    snackbarDetails,
    setSnackbarDetails,
    logout,
    setProjectMainContract,
    createProjectContract,
  } = useContext(UserContext);

  const handleClick = () => {
    setSnackbarDetails((prev) => {
      return { ...prev, open: true };
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarDetails((prev) => {
      return { ...prev, open: false };
    });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    let provider = window.ethereum;
    let accounts;
    (async () => {
      if (window.ethereum) {
        try {
          accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("Account is : ", accounts[0]);
          setSelectedAccount(accounts[0]);

          window.ethereum.on("accountsChanged", async (accounts) => {
            setSelectedAccount(accounts[0]);
            logout();
            console.log(`Selected account changed to ${accounts[0]}`);
          });
        } catch (error) {
          if (error.code === 4001) {
            // User rejected request
            console.log(error);
          }
        }
        const web3 = new Web3(provider);

        const networkId = await web3.eth.net.getId();
        const myContract = new web3.eth.Contract(
          ProjectMain.abi,
          ProjectMain.networks[networkId]?.address
        );
        setProjectMainContract(myContract);
      }
    })();
  }, []);

  if (!isAuthenticated) {
    return <CheckDetails />;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/ViewDetails/:projectId'
          element={<ViewDetailsProject />}
        />
        <Route path='/profile' element={<Profile />} />
        <Route path='/EnterDetailsProject' element={<EnterDetailsProject />} />
        <Route path='/ProjectList' element={<ProjectList />} />
        <Route path='/Request/:projectId' element={<Request />} />
      </Routes>
      <Snackbar
        open={snackbarDetails?.open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackbarDetails?.message}
        action={action}
      />
    </Router>
  );
}

export default App;
