// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FakeToken {
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;
    uint256 public totalSupply;
    string public name;
    string public symbol;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        _mint(msg.sender, 100 * 10 ** 18);
    }

    function transfer(address _to, uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function transferFrom(address _from, address _to, uint256 _amount) public {
        require(
            allowances[_from][msg.sender] >= _amount,
            "Insufficient allowance"
        );
        require(balances[_from] >= _amount, "Insufficient balance");
        balances[_from] -= _amount;
        allowances[_from][msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function approve(address _to, uint256 _amount) public {
        allowances[msg.sender][_to] = _amount;
    }

    function _mint(address _to, uint256 _amount) internal {
        balances[_to] += _amount;
    }

    function _burn(address _from, uint256 _amount) internal {
        require(balances[_from] >= _amount);
        balances[_from] -= _amount;
    }

    function myBalance() public view returns (uint256 balance) {
        return balances[msg.sender];
    }
}
