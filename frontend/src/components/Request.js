import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import CreatorRequest from "./CreatorRequest";
import InvestorRequest from "./InvestorRequest";
import { UserContext } from "./UserContext";

function Request() {
  const params = useParams();
  const { userDetails } = useContext(UserContext);

  return userDetails?.role === "creator" ? (
    <CreatorRequest projectId={params?.projectId} />
  ) : (
    <InvestorRequest projectId={params?.projectId} />
  );
}

export default Request;
