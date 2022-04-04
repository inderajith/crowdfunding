//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RenzinToken.sol";

contract ProjectMain{
    address[] public deployedProjects;    

    address public renzinTokenAddress;    

    constructor (address _renzinTokenAddress) {
        renzinTokenAddress = _renzinTokenAddress;
    }
    
    function createProject(uint minimum) public {
        address newProject = address(new Project(minimum,msg.sender, renzinTokenAddress));        
        deployedProjects.push(newProject);
    }
    
    function getAllProjects() public view returns(address[] memory){
        return deployedProjects;
    }

    function getLastProject() public view returns(address){
        return deployedProjects[deployedProjects.length-1];
    }

}

contract Project{
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    uint numRequests;
    mapping (uint => Request) public requests;    
    address private rznTokenAddress;
    // Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount = 0;
        
    constructor(uint minimum, address creator, address renzinTokenAddress){
        manager = creator;
        minimumContribution = minimum;
        rznTokenAddress = renzinTokenAddress;
    }
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    function contribute(uint _amount) public{
        // require(_amount > minimumContribution);
        RenzinToken rt = RenzinToken(rznTokenAddress);
        rt.transfer(address(this), _amount); 
        approvers[msg.sender] = true;
        approversCount++;
    }    
    
    function createRequest(string memory description, uint value, address recipient) public restricted{
        // Request memory newRequest = Request({
        //     description:description,
        //     value:value,
        //     recipient:recipient,
        //     complete:false,
        //     approvalCount:0
        // });
        // requests.push(newRequest);
        
        Request storage r = requests[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;
        
        
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvalCount++;
        request.approvals[msg.sender] = true;
    }
    
    function finaliseRequest(uint index) public restricted{
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        
        payable(request.recipient).transfer(request.value);
        request.complete = true;
        
    }

    function getSummary() public view returns(uint, uint, uint,uint,address){
        return(
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns(uint){
        return numRequests;
    }
    
}