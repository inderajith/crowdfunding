// SPDX-License-Identifier: UNLINCENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RenzinToken is ERC20{
    constructor() ERC20("Renzin", "RZN") {        
        _mint(msg.sender, 10000 * 10 ** 2);
    }   

    function decimals() public view override returns (uint8) {
        return 2;
	}

    function mint(address _account, uint256 _amount) public{
        _mint(_account, _amount);
    }

    function burn(address _account, uint256 _amount) public{
        _burn(_account, _amount);
    }
}