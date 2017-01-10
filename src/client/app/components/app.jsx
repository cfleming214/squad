import React, { Component } from 'react';
import Login from './login.jsx';
import Signup from './signup.jsx';
import styles from './../../style.css';
import Dashboard from './dashboard/dashboard.jsx';
import axios from 'axios';
import Chat from './chat/chat.jsx';
import AddProj from './dashboard/addProj.jsx';
import Project from './projects/viewProject.jsx';

class App extends Component {

 constructor(props) {
    super(props);
    this.state = {
      page: 0,
      name: '',
      username: '',
      password: '',
      message: '',
      newProject: '',
      newProjectSummary: '',
      allProjects: [],
      activeProject: {
        title: null,
        summary: null,
        id: null,
        team: 'Anto, Chris, Jimmy'
      }
    }
    this.newRegistration = this.newRegistration.bind(this);
    this.signUpPost = this.signUpPost.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.userVerify = this.userVerify.bind(this);
    this.changeView = this.changeView.bind(this);
    this.projChange = this.projChange.bind(this);
    this.projSummaryChange = this.projSummaryChange.bind(this);
    this.createProject = this.createProject.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.getProjects();
  }

//setState to change Login page to SignUp page
  newRegistration() {
    if (this.state.page === 0) {
      this.setState({page: 1});
    } else {
      this.setState({page: 0});
    }
  }

//register new user on signup page, create new user in database, send client to login page
  signUpPost() {
    axios.post('/signup', {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
    }).then((res) => {
      this.setState({
        page: res.data.view,
        message: res.data.message
      });
    }).catch(function(error) {
      console.log(error);
    })
  }

//verify user, send user to database
  userVerify() {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
      }).then((res) => {
        this.setState({page: res.data.view, message: res.data.message})

        axios.get('/projects')
        .then((response) =>{
          let newArray = [];
          for(let i=0; i<response.data.length; i++) {
            newArray.push({title: response.data[i].title, summary: response.data[i].summary, id: response.data[i].id })
          }
          this.setState({allProjects: newArray});
        })
        .catch(function (error) {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
    })
  }

//create new project in database, send client to dashboard
  createProject() {
    axios.post('/createProject', {
      title: this.state.newProject,
      summary: this.state.newProjectSummary
    }).then((res) => {
      this.setState({page: res.data.view, message: res.data.message});
      this.getProjects();
    }).catch((error) => {
      console.log(error);
    })
  }

  getProjects() {
    axios.get('/projects')
    .then((response) =>{
      let newArray = [];
      for(let i=0; i<response.data.length; i++) {
        newArray.push({title: response.data[i].title, summary: response.data[i].summary})
      }
      this.setState({allProjects: newArray});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

//changes to appropriate view based on passed in variable
  changeView(num) {
    this.setState({page: num})
  }

//wraps username input and sends username value to state
  usernameChange(e) {
    const state = {};
    state.username = e.target.value;
    this.setState(state);
  }

//wraps name input and sends name value to state
  nameChange(e) {
    const state = {};
    state.name = e.target.value;
    this.setState(state);
  }

//wraps password input and sends password value to state
  passwordChange(e) {
    const state = {};
    state.password= e.target.value;
    this.setState(state);
  }

//wraps project title input and sends project title value to state
  projChange(e) {
    const state = {};
    state.newProject = e.target.value;
    this.setState(state);
  }

  projSummaryChange(e) {
    this.setState({newProjectSummary: e.target.value})
  }

  // SET ACTIVE PROJECT SO WE CAN VIEW PROJECT WITH APPROPRIATE data

  setActiveProject(data) {
    const state = {};
    state.activeProject = data;
    this.setState(state);
  }

//conditional rendering for components based on 'page' property in state
  render() {
    if (this.state.page === 0) {
      return (

        <div>
          <Login
            newRegistration = {this.newRegistration}
            page={this.state.page}
            userVerify = {this.userVerify}
            usernameChange = {this.usernameChange}
            passwordChange = {this.passwordChange}
            message = {this.state.message}
            />
            <Chat username={this.state.username} />
        </div>
      )
    };

    if (this.state.page === 1) {
      return (
        <Signup
          newRegistration = {this.newRegistration}
          usernameChange = {this.usernameChange}
          nameChange = {this.nameChange}
          passwordChange = {this.passwordChange}
          username = {this.state.username}
          password = {this.state.password}
          name = {this.state.name}
          signUpPost = {this.signUpPost}
          message = {this.state.message}
        />
      )
    }

    if (this.state.page === 2) {
      return (
      <div>
        <Dashboard
          changeView={this.changeView}
          allProjects={this.state.allProjects}
          setActiveProject={this.setActiveProject}
        />
      </div>
      )
    }

    if (this.state.page === 3) {
      return (
        <AddProj
          projChange = {this.projChange}
          projSummaryChange = {this.projSummaryChange}
          createProject = {this.createProject}
          changeView = {this.changeView}
        />
      )
    }

    if (this.state.page === 4) {
      return (
        <Project changeView={this.changeView} projectData={this.state.activeProject}/>
      )
    }
  }
}

export default App;
