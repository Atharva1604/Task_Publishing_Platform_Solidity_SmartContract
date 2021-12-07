// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.3.2 (token/ERC20/ERC20.sol)

pragma solidity ^0.8.2;

import "TaskToken.sol";

contract TASK is TaskToken
{
    address _owner;
    modifier onlyOwner {
        require( msg.sender == _owner);
        _;
    }
    
    modifier onlyAssignor(address _jobassignor) {
        require( msg.sender == _jobassignor);
        _;
    }
   
    struct Assignee{
        uint token_balance;
        uint avg_rating;
        uint no_of_jobs_completed;
    }
   
    mapping(address => uint) A_token_balance;
    mapping(address => Assignee) Assignee_details;    
    
    constructor()  {
        _owner = msg.sender;
    }
   
    struct jobmapping{
        string name;
        address Assignor;
        address Assignee;
        uint cost;
        uint rating;
        string ipfslink;
    }
   
    mapping(uint => jobmapping) Jobs;
    uint public job_counter = 0;
   
    function job_completed(uint _job_id, uint rating) public onlyAssignor(Jobs[_job_id].Assignor){
       transferFrom(address(this), Jobs[_job_id].Assignee, Jobs[_job_id].cost);
       
        Assignee_details[Jobs[_job_id].Assignee].avg_rating =  ((Assignee_details[Jobs[_job_id].Assignee].avg_rating*Assignee_details[Jobs[_job_id].Assignee].no_of_jobs_completed) + rating)/(Assignee_details[Jobs[_job_id].Assignee].no_of_jobs_completed + 1);
        Assignee_details[Jobs[_job_id].Assignee].no_of_jobs_completed =  Assignee_details[Jobs[_job_id].Assignee].no_of_jobs_completed + 1;
       
    }
    function job_not_completed(uint _job_id) public onlyAssignor(Jobs[_job_id].Assignor){
       
        transferFrom(address(this), Jobs[_job_id].Assignor,Jobs[_job_id].cost);
        Jobs[_job_id].cost = 0;
       
    }
   
    function get_job_details(uint _job_id) public view returns(string memory, uint, uint, string memory){
        return (Jobs[_job_id].name, Jobs[_job_id].cost,Jobs[_job_id].rating,Jobs[_job_id].ipfslink);
    }    
   
    function add_job_details(string memory QM_ipfslink, string memory name, uint value) public {
        job_counter = job_counter + 1;
        jobmapping storage job_det = Jobs[job_counter];
        transfer(address(this), value);
        job_det.Assignor = msg.sender;
        approve(address(this),msg.sender,_totalSupply);
        approve(msg.sender, address(this),_totalSupply);
        job_det.name = name;
        job_det.ipfslink = QM_ipfslink;
        job_det.cost = value;
        
       
    }

    function return_job_counter() public view returns (uint) {
        return job_counter;
    }
   
    function add_assignee_details(uint _job_id, address assignee_address) public{
        jobmapping storage job_det = Jobs[_job_id];
        job_det.Assignee = assignee_address;
        approve(address(this),  msg.sender,_totalSupply);
        approve(msg.sender, address(this),_totalSupply);
    }
     
    function get_rating_address(address assignee_address) public view returns(uint){
        return (Assignee_details[assignee_address].avg_rating);
    }  
   
    function no_jobs_completed(address assignee_address) public view returns(uint){
        return (Assignee_details[assignee_address].no_of_jobs_completed);
    }      
   
   
    function view_contract_balance() public view returns(uint){
        return address(this).balance;
    }
   

}
