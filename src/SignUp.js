import React, { Component } from "react";

export class SignUp extends Component {
    constructor(prop){
        super()
        this.state = {
            name : prop.name,
            email : prop.email,
            password : prop.password,
            logEmail : prop.logEmail,
            logPassword : prop.logPassword,
        }
    }
    
    // let state = this.state
    render(){
        return(
            <div>
                {this.state.name}<br />
                {this.state.email}<br />
                {this.state.password}<br />
                {this.state.logEmail}<br />
                {this.state.logPassword}<br />
                <br />
                
                SignUp check
                
            </div>
        )
    }
}