const RenzinToken = artifacts.require("RenzinToken");
const ProjectMain = artifacts.require("ProjectMain");

module.exports = function (deployer) {
  deployer.deploy(RenzinToken).then(() => {
    console.log("RenzinToken.address: ", RenzinToken.address);
    return deployer.deploy(ProjectMain, RenzinToken.address);
  });
};
