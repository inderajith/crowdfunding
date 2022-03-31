// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Helloworld{

    string public message;

    constructor(string memory _message){
        message = _message;
    }

    function getMessage() public view returns(string memory){
        return message;
    }

    function setMessage(string memory _message) public payable{
        require(msg.value >= 1 ether, "Not enough funds");
        message = _message;
    }
}