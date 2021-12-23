// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import  './Reward.sol';
import  './Tether.sol';

contract DecentralizedBank {
  
  string public name = 'Decentral Bank';
  address public owner = msg.sender;
  Reward public reward;
  Tether public tether;

  constructor(Reward _reward, Tether _tether) public {
      reward = _reward;
      tether = _tether;
  }
  
}
