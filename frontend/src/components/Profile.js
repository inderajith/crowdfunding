import React, { useContext } from "react";
import CreatorProfile from "./CreatorProfile";
import InvestorProfile from "./InvestorProfile";
import { UserContext } from "./UserContext";

function Profile() {
  const { userDetails } = useContext(UserContext);
  return userDetails?.role === "creator" ? (
    <CreatorProfile />
  ) : (
    <InvestorProfile />
  );
}

export default Profile;
