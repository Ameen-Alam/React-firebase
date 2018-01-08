import React, { Component } from 'react';
import '../App.css';



class Fotter extends Component {
  constructor(props){
    super(props)
    this.state = {
      text0 : "My Name is Ameen Alam. I'm Fron End Web Developer.",
      text1 : "I design & build user interfaces.",
      text2 : "I design & build corporate websites.",
      text3 : "I design & build web applications.",
      text4 : "I design & buildlanding pages.",
      activela : 0
    }
  }
    bar(){
        var otherWindow = window.open();
        // otherWindow.opener = null;
        otherWindow.location = "https://www.linkedin.com/in/ameen-alam-375390134/";
        // window.opener.location=
    }
  render() {
    return (
      <div className="container-fluid">
        <div className="bg-default">
          <a  onClick={()=> this.bar()}> 
          <p>{this.state.text0}</p>
          <p>{this.state.text1}
            {this.state.text2}
            {this.state.text3}
            {this.state.text4}
          </p>
          <span className="click font-weight-bold"> Click </span></a>
        </div>
      </div>
    );
  }
}

export default Fotter;
/* 

Hi, I'm Ameen Alam. I design & build
user interfaces.

Hi, I'm Ameen Alam. I design & build
corporate websites.

Hi, I'm Ameen Alam. I design & build
web applications.

Hi, I'm Ameen Alam. I design & build
landing pages.

*/