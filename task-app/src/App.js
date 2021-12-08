import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
// import web3 from 'web3.js';
import web3 from 'web3';
import taskplatform from './taskplatform';

class App extends Component {
  
  state = {
    balance : '',
    bvalue:'',
    message:'',
    details:'',
    ether:'',
    number_of_jobs:'',
    cost_of_job:'',
    name_of_task:'',
    ipfs_link:'',
    job_rating:'',
    job_id:'',
    job_id1:'',
    assignee_address:'',
    job_id2:'',
    assignee_address1:'',
    rating:''

  };
  async componentDidMount(){
    const balance = await taskplatform.methods.totalSupply().call();
    this.setState({balance});
    const number_of_jobs = await taskplatform.methods.return_job_counter().call();
    this.setState({number_of_jobs});
    console.log(number_of_jobs);
  }
  onSubmit = async (event) =>{
    event.preventDefault();
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts[1]);
    // this.setState({ message: 'Waiting to succeed'});
    //const addjobdetails = await taskplatform.methods.add_job_details("blah","Audio",10000000000000000000).send();
    const details = await taskplatform.methods.get_job_details(this.state.bvalue).call();
    const ether = (details[1]/1000000000000000000);
    this.setState({details});
    this.setState({ether});
    this.componentDidMount();
    
    // this.setState({ message: 'Here are the details'});
    // var amount = 10000000000000000000;
    // const addjobdetails = await taskplatform.methods.add_job_details("blah","Audio",amount.toString()).send({from:accounts[0]});
    // console.log(addjobdetails);    
  };
  onSubmit1 = async (event) => {
    event.preventDefault();
    
    const Web3 = require('web3');
    // web3 lib instance
    const web3 = new Web3(window.ethereum);
    // get all accounts
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]); 
    var amount = this.state.cost_of_job;
    const addjobdetails = await taskplatform.methods.add_job_details(this.state.ipfs_link,this.state.name_of_task,amount.toString()).send({from:accounts[0]});
    console.log(addjobdetails);
    this.componentDidMount();


    // const accounts = await web3.eth.getAccounts();
    // //console.log(accounts[1]);
    // var amount = this.state.cost_of_job;
    // // console.log(this.state.cost_of_job);
    // // console.log(this.ipfs_link);
    // // console.log(this.name_of_task);
    // const addjobdetails = await taskplatform.methods.add_job_details(this.state.ipfs_link,this.state.name_of_task,amount.toString()).send({from:accounts[0]});
    // //const addjobdetails = await taskplatform.methods.add_job_details("blah","Audio",amount.toString()).send({from:accounts[0]});
    // this.componentDidMount();
    // console.log(addjobdetails);    
  };
  onSubmit2 = async (event) => {
    event.preventDefault();
    // const accounts = await web3.eth.getAccounts();
    
    const Web3 = require('web3');
    // web3 lib instance
    const web3 = new Web3(window.ethereum);
    // get all accounts
    const accounts = await web3.eth.getAccounts();
    const jobcompleted = await taskplatform.methods.job_completed(this.state.job_id,this.state.job_rating).send({from:accounts[0]});
    // console.log(jobcompleted);
  };
  onSubmit3 = async (event) => {
    event.preventDefault();
    // const accounts = await web3.eth.getAccounts();
    
    const Web3 = require('web3');
    // web3 lib instance
    const web3 = new Web3(window.ethereum);
    // get all accounts
    const accounts = await web3.eth.getAccounts();
    const job_not_completed1 = await taskplatform.methods.job_not_completed(this.state.job_id1).send({from:accounts[0]});
    // console.log(job_not_completed1);
  };
  onSubmit4 = async (event) => {
    event.preventDefault();
    // const accounts = await web3.eth.getAccounts();
    
    const Web3 = require('web3');
    // web3 lib instance
    const web3 = new Web3(window.ethereum);
    // get all accounts
    const accounts = await web3.eth.getAccounts();
    const addassignee = await taskplatform.methods.add_assignee_details(this.state.job_id2,this.state.assignee_address).send({from:accounts[0]});
    // console.log(addassignee);
  };
  onSubmit5 = async (event) => {
    event.preventDefault();
    // const accounts = await web3.eth.getAccounts();
    // var address = this.state.assignee_address;
    const rating = await taskplatform.methods.get_rating_address(this.state.assignee_address1).call();
    this.setState({rating});
    // console.log(rating);
  };
  onSubmit6 = async (event) => {
    event.preventDefault();
    const number_of_finished_jobs = await taskplatform.methods.no_jobs_completed(this.state.assignee_address2).call();
    this.setState({number_of_finished_jobs});
  };
  render() { 
    return (
      <div className="App"  >
        <div class = "center">
      <hr />
      <form onSubmit={this.onSubmit}> 
      <h2 class = "task">Task Publishing Platform</h2> 
      <div>
      <label>
      <hr />
      
      <h4>Get Job Details (ID ranging from 1 to total number of jobs)</h4>
      Total number of jobs are {this.state.number_of_jobs}
      <br></br>
      </label>
      <br></br>
      <input 
      placeholder="Enter the job ID number"
      value={this.state.bvalue}
      onChange={event => this.setState({bvalue: event.target.value})}/>
      </div>
      <br></br>
      <button>Enter</button>
      </form>
      <hr />
      <h2>{this.state.message}</h2>
      <h4>Task Name:{this.state.details[0]}</h4>
      <h4>Task Cost:{this.state.ether}</h4>
      <h4>IPFS Link:{this.state.details[3]}</h4>
      <hr />
      <h4> Add Job Details - Type in the Job Details to be assigned</h4>
      <form onSubmit = {this.onSubmit1}>
      <br></br>
      <input
      placeholder="IPFS Link"
      ipfs_link={this.state.ipfs_link} 
      onChange={event => this.setState({ipfs_link: event.target.value})}/>
      <br></br>
      <br></br>
      <input
      placeholder="Name of the task"
      name_of_task={this.state.name_of_task} 
      onChange={event => this.setState({name_of_task: event.target.value})}/>
      <br></br>
      <br></br>
      <input 
      placeholder="Cost of the job"
      cost_of_job={this.state.cost_of_job} 
      onChange={event => this.setState({cost_of_job: event.target.value})}/>
      <br></br>
      <br></br>
      <button>Enter</button>
      </form>
      <hr />
      <h4>Assign rating and complete payment</h4>
      <form onSubmit = {this.onSubmit2}>
      <br></br>
      <input
      placeholder="Please enter the job ID"
      job_id={this.state.job_id} 
      onChange={event => this.setState({job_id: event.target.value})}/>
      <br></br>
      <br></br>
      <input
      placeholder="Please enter the rating"
      job_rating={this.state.job_rating} 
      onChange={event => this.setState({job_rating: event.target.value})}/>
      <br></br>
      <br></br>
      <button>Enter</button>
      </form>
      <hr />
      <h4>Return payment if job is not completed</h4>
      <form onSubmit = {this.onSubmit3}>
      <br></br>
      <input
      placeholder="Please enter the job ID"
      job_id1={this.state.job_id1} 
      onChange={event => this.setState({job_id1: event.target.value})}/>
      <br></br>
      <br></br>
      <button>Enter</button>
      <br></br>
      <br></br>
      <hr />
      </form>
      <h4>Add Assignee Details</h4>
      <form onSubmit = {this.onSubmit4}>
      <br></br>
      <input
      placeholder="Please enter the job ID"
      job_id2={this.state.job_id2} 
      onChange={event => this.setState({job_id2: event.target.value})}/>
      <br></br>
      <br></br>
      <input
      placeholder="Assignee address"
      assignee_address={this.state.assignee_address} 
      onChange={event => this.setState({assignee_address: event.target.value})}/>
      <br></br>
      <br></br>
      <button>Enter</button>
      <br></br>
      <br></br>
      <hr />
      </form>
      <h4>Get Rating</h4>
      <form onSubmit = {this.onSubmit5}>
      <br></br>
      <input
      placeholder="Enter address"
      assignee_address={this.state.assignee_address1} 
      onChange={event => this.setState({assignee_address1: event.target.value})}/>
      <br></br>
      <br></br>
      <button>Enter</button>
      <br></br>
      <br></br>
      <h4>Rating:{this.state.rating}</h4>
      <hr />
      </form>
      <h4>Get number of completed jobs</h4>
      <form onSubmit = {this.onSubmit6}>
      <br></br>
      <input
      placeholder="Assignee address"
      assignee_address2={this.state.assignee_address2} 
      onChange={event => this.setState({assignee_address2: event.target.value})}/>
      <br></br>
      <br></br>
      <button>Enter</button>
      <br></br>
      <br></br>
      <h4>Jobs Completed:{this.state.number_of_finished_jobs}</h4>
      <hr />
      </form>  
      </div>
      </div>
    );
  }
}
export default App;






// import logo from './logo.svg';
// import './App.css';
// import { render } from '@testing-library/react';
// import web3 from './web3';

// function App() {
//   render();{
//     console.log(web3.version);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
//   } 
// }
// export default App;




// import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';
// //import Web3 from './web3';
// import web3 from 'web3.js';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }
// export default App;