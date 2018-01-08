import React, { Component } from 'react';
import './App.css';
import Navigationbar from './Component/Navigationbar'
import Fotter from './Component/Fotter'
// import {Link} from 'react-router-dom'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import firebase from './firebase'
let database = firebase.database().ref('/')
let auth = firebase.auth()

class App extends Component {
  constructor(props){
    super(props)
    // this.signUpEvent = this.signUpEvent.bind(this)
    this.loginEvent = this.loginEvent.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.deHandleClick = this.deHandleClick.bind(this)
    
    this.state = {
      name : '',
      email : '',
      password : '',
      logEmail: '',
      logPassword : '',

      prof : true
    }
  }

  // Sing up
  signUpEvent(){
    let customState = this.state
    let user = localStorage.getItem("user")
    let convertUser = JSON.parse(user)
    let object = {
      name : customState.name,
      email : customState.email,
      password : customState.password,
    }
    let that = this
    if(object.name === '' ){alert('Name is Null')} else if(convertUser !== null){alert('lisent Sing Out Your Account ' + convertUser.email)} else{
      auth.createUserWithEmailAndPassword(object.email , object.password).then(function(res){
        object.userID = res.uid;
        database.child('user/' + res.uid).set(object)
        // .then(function(){
          alert('good Job');
          that.setState({
            name:'',
            email:'',
            password:'',
            prof : false
          })
        // })
      }).catch(function(error){
        let message = error.message
          console.log(message)}
        )
      }
  }
      
  
  //  Login
  loginEvent(){
    let customState = this.state
    let user = localStorage.getItem("user")
    let convertUser = JSON.parse(user)
    let isobject = {
      email : customState.logEmail,
      password : customState.logPassword,
    }
      let nana = () => { alert('You are already Login with email ' + convertUser.name) ; window.location = '/CreatePost'}
      if(convertUser !== null ){nana() }else{
        auth.signInWithEmailAndPassword(isobject.email,isobject.password)
        .then(function(success){
          database.child('user/'+ success.uid).once('value' , function(snapshout){
            console.log(snapshout.val());
            localStorage.setItem('user' , JSON.stringify(snapshout.val()))
          console.log('Good job Login Success Full') 
             setTimeout(function(){
              window.location = '/CreatePost'
             },1000)
            })
          })
        .catch(function(error){
          alert(error)
        })
      }
    }

    changeHandler(property , event){
      let text = this.state
      text[property] = event.target.value
      this.setState({text})
    }


    handleClick(){
      this.setState({
        prof : true
      })
    }
    deHandleClick(){
      this.setState({
        prof : false
      })
    }


  render() {
    return (
      <div className="App">
        <Navigationbar />
          <MuiThemeProvider>
            <div className="from-submit-div">
              <div className="from-submit">
                <h4>Google</h4>
                { (this.state.prof === true) ?
                      <div>
                        <TextField
                          value={this.state.name}
                          name="name"
                          onChange={this.changeHandler.bind(this , 'name')}
                          hintText="Enter Your Name"
                          floatingLabelText="User-Name"
                          type="text"
                        />
                        <br />
                        <TextField
                          value={this.state.email}
                          name="name"
                          onChange={this.changeHandler.bind(this , 'email')}
                          hintText="Type Your Email"
                          floatingLabelText="Email"
                          type="email"
                        />
                        <br />
                        <TextField
                        value={this.state.password}
                        name="name"
                        onChange={this.changeHandler.bind(this , 'password')}
                          hintText="Password Field"
                          floatingLabelText="Password"
                          type="password"
                        />
                        <br />
                        <RaisedButton
                          className="width"
                          onClick={this.signUpEvent.bind(this)}
                          label="Signup"
                          secondary={true}
                        />
                        <br />
                        <RaisedButton
                          className="width"
                          onClick={() =>this.deHandleClick()}
                          label="Login"
                          primary={true}
                        />
                      </div>
                      : 
                      <div>
                        <TextField
                        value={this.state.logEmail}
                        name="name"
                        onChange={this.changeHandler.bind(this , 'logEmail')}
                          hintText="Type Your Email"
                          floatingLabelText="Email"
                          type="email"
                        />
                        <br />
                        <TextField
                        value={this.state.logPassword}
                        name="name"
                        onChange={this.changeHandler.bind(this , 'logPassword')}
                          hintText="Password Field"
                          floatingLabelText="Password"
                          type="password"
                        />
                        <br />
                        <RaisedButton
                          className="width"
                          onClick={this.loginEvent}
                          label="Login"
                          primary={true}
                        />
                        <br />
                        <RaisedButton
                          className="width"
                          onClick={() => this.handleClick()}
                          label="Signup"
                          secondary={true}
                        />
                      </div>
                      }
              </div>
            </div>
          </MuiThemeProvider>
          {/* <Link to="CreatePost">CreatePost </Link><br />
          <Link to="allpost">AllPost </Link><br />
          <Link to="mypost">MyPost </Link><br /><br /> */}
        <Fotter />
      </div>
    );
  }
}

export default App;