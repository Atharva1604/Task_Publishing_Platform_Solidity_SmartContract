// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.3.2 (token/ERC20/ERC20.sol)

pragma solidity ^0.8.2;
// import "TaskToken.sol";

import "./TaskToken.sol";

contract TASK is ERC20{
    address _owner;
    //IERC20 public token;
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
        // token = new ERC20();
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
   
    function job_completed(uint _job_id, uint rating) public onlyAssignor(Jobs[_job_id].Assignor){
        //payable(Jobs[_job_id].Assignee).transfer(Jobs[_job_id].cost);
       transfer(address(this), Jobs[_job_id].Assignee, Jobs[_job_id].cost);
       
        Assignee_details[Jobs[_job_id].Assignee].avg_rating =  ((Assignee_details[Jobs[_job_id].Assignee].avg_rating*Assignee_details[Jobs[_job_id].Assignee].no_of_jobs_completed) + rating)/(Assignee_details[Jobs[_job_id].Assignee].no_of_jobs_completed + 1);
        Assignee_details[Jobs[_job_id].Assignee].no_of_jobs_completed =  Assignee_details[Jobs[_job_id].Assignee].no_of_jobs_completed + 1;
        //B_details[Jobs[_job_id].B].token_balance =  B_details[Jobs[_job_id].B].token_balance - Jobs[_job_id].cost;
       
    }
    function job_not_completed(uint _job_id) public onlyAssignor(Jobs[_job_id].Assignor){
       
        // payable(Jobs[_job_id].Assignor).transfer(Jobs[_job_id].cost);
        transferFrom(address(this), Jobs[_job_id].Assignor, totalSupply());
        Jobs[_job_id].cost = 0;
       
    }
   
    function get_job_details(uint _job_id) public view returns(string memory, uint, uint, string memory){
        return (Jobs[_job_id].name, Jobs[_job_id].cost,Jobs[_job_id].rating,Jobs[_job_id].ipfslink);
    }    
   
    function add_job_details(uint _job_id, string memory QM_ipfslink, string memory name, uint value) public {
        jobmapping storage job_det = Jobs[_job_id];
        transfer(address(this), value);
        job_det.Assignor = msg.sender;
        approve(address(this),msg.sender,_totalSupply);
        approve(msg.sender, address(this),_totalSupply);
        job_det.name = name;
        job_det.ipfslink = QM_ipfslink;
        job_det.cost = value;
       
    }
   
    function add_assignee_details(uint _job_id, address assignee_address) public{
        jobmapping storage job_det = Jobs[_job_id];
        job_det.Assignee = assignee_address;
        approve(address(this),  msg.-,_totalSupply);
        approve(msg.sender, address(this),_totalSupply);
    }
   
    //  function get_rating(uint _job_id) public view returns(uint){
    //     return (Assignee_details[Jobs[_job_id].Assignee].avg_rating);
    // }  
   
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