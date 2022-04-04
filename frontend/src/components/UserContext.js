import React, { useState, useEffect, useContext } from "react";
import { api_call, SUCCESS_CODE } from "./api";
import Project from "../contracts/Project.json";
import Renzin from "../contracts/RenzinToken.json";
import Web3 from "web3";
export const UserContext = React.createContext();

export default ({ children }) => {
  const web3 = new Web3(window.ethereum);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState({
    open: false,
    message: "",
  });
  const [selectedAccount, setSelectedAccount] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [projectDetails, setProjectDetails] = useState({});
  const [tokenAddress, setTokenAddress] = useState("");
  const [projectMainContract, setProjectMainContract] = useState({});
  const [projectContract, setProjectContract] = useState({});

  const register = async (userData) => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/signup`,
      method: "post",
      body: { userData },
    });
    if (statusCode === SUCCESS_CODE) {
      await getUserDetails();
      return responseData;
    } else {
      return false;
    }
  };

  const getUserDetails = async () => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/details/${selectedAccount}`,
      method: "get",
    });
    if (statusCode === SUCCESS_CODE) {
      setUserDetails(responseData.details);
      return responseData;
    } else {
      return false;
    }
  };

  const getProjectsList = async () => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/project`,
      method: "get",
    });
    if (statusCode === SUCCESS_CODE) {
      return responseData.projectList;
    } else {
      return [];
    }
  };

  const getProjectDetails = async (id) => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/project/${id}`,
      method: "get",
    });
    if (statusCode === SUCCESS_CODE) {
      const myContract = new web3.eth.Contract(
        Project.abi,
        responseData?.contractAddress
      );
      setProjectContract(myContract);
      return responseData.details;
    } else {
      return false;
    }
  };

  const fundProjectContract = async (fund, projectId) => {
    let res1 = await projectMainContract.methods.renzinTokenAddress().call();
    console.log("res1: ", res1);
    const renzonContract = new web3.eth.Contract(Renzin.abi, res1);

    let res2 = await renzonContract.methods
      .transfer(projectContract?._address, fund * 10 ** 2)
      .send({ from: selectedAccount });
    console.log("res2: ", res2);
    // let res3 = await renzonContract.methods
    //   .balanceOf(projectContract?._address)
    //   .call();
    // console.log("res3: ", res3 / 10 ** 2);
    // let res4 = await projectContract.methods
    //   .contribute(fund)
    //   .send({
    //     from: selectedAccount,
    //     value: web3.utils.toWei(String(fund), "ether"),
    //   });
    // console.log("res4: ", res4);
    let details = {
      address: userDetails.address,
      name: userDetails.name,
      amount: fund,
    };
    const { responseData, statusCode } = await api_call({
      apiUrl: `/fundProject/${projectId}`,
      method: "post",
      body: { details },
    });
    if (statusCode === SUCCESS_CODE) {
      setSnackbarDetails({ message: responseData?.msg, open: true });
      return responseData;
    } else {
      return false;
    }
  };

  const createProjectContract = async (fund, projectId) => {
    console.log("fund: ", fund);
    console.log("projectMainContract", projectMainContract);
    let res1 = await projectMainContract.methods
      .createProject(fund)
      .send({ from: selectedAccount });
    console.log("res1: ", res1);
    let res2 = await projectMainContract.methods.getLastProject().call();
    let details = {
      owner: selectedAccount,
      contractAddress: res2,
      minimumAmount: fund,
      projectId,
    };
    const { responseData, statusCode } = await api_call({
      apiUrl: `/createContract`,
      method: "post",
      body: { details },
    });
    if (statusCode === SUCCESS_CODE) {
      return responseData;
    } else {
      return false;
    }
  };

  const postProjectDetails = async (details) => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/project`,
      method: "post",
      body: details,
    });
    if (statusCode === SUCCESS_CODE) {
      if (responseData?.success) {
        let result = await createProjectContract(
          details.projectData.minimumContribution,
          responseData.projectId
        );
      }
      return responseData;
    } else {
      return false;
    }
  };

  const getInvestedProjects = async () => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/investedProjects/${selectedAccount}`,
      method: "get",
    });
    if (statusCode === SUCCESS_CODE) {
      return responseData?.investedProjects;
    } else {
      return [];
    }
  };

  const getCreatedProjects = async () => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/createdProjects/${selectedAccount}`,
      method: "get",
    });
    if (statusCode === SUCCESS_CODE) {
      return responseData.projectsList;
    } else {
      return [];
    }
  };

  const createSpendingRequest = async (projectId, details) => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/createSpendingRequest/${projectId}`,
      method: "post",
      body: { details },
    });
    if (statusCode === SUCCESS_CODE) {
      if (responseData?.success) {
        setSnackbarDetails({ message: responseData?.msg, open: true });
      }
      return responseData;
    } else {
      return false;
    }
  };

  const getSpendingRequest = async (projectId) => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/getSpendingRequest/${projectId}`,
      method: "get",
    });
    if (statusCode === SUCCESS_CODE) {
      return responseData.details;
    } else {
      return false;
    }
  };

  const investorSpendingRequest = async (projectId, requestId, details) => {
    const { responseData, statusCode } = await api_call({
      apiUrl: `/investorSpendingRequest/${projectId}/${requestId}`,
      method: "post",
      body: { details },
    });
    if (statusCode === SUCCESS_CODE) {
      if (responseData?.success) {
        setSnackbarDetails({ message: "Success", open: true });
      }
      return responseData;
    } else {
      return false;
    }
  };

  const login = async () => {
    setSnackbarDetails({ message: "Login Successfull", open: true });
    setIsAuthenticated(true);
    localStorage.setItem("details", selectedAccount);
  };

  const logout = async () => {
    localStorage.removeItem("details");
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        register,
        getProjectsList,
        getProjectDetails,
        postProjectDetails,
        selectedAccount,
        setSelectedAccount,
        getUserDetails,
        userDetails,
        setUserDetails,
        login,
        logout,
        snackbarDetails,
        setSnackbarDetails,
        projectMainContract,
        setProjectMainContract,
        projectContract,
        setProjectContract,
        createProjectContract,
        fundProjectContract,
        getInvestedProjects,
        getCreatedProjects,
        createSpendingRequest,
        getSpendingRequest,
        investorSpendingRequest,
      }}>
      {children}
    </UserContext.Provider>
  );
};
