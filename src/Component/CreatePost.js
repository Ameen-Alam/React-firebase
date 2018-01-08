import React, { Component } from 'react' ;
// import {Link} from 'react-router-dom' ;
import {Tabs, Tab} from 'material-ui/Tabs' ;
import Slider from 'material-ui/Slider' ;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider' ;
import TextField from 'material-ui/TextField' ;
import TimePicker from 'material-ui/TimePicker' ;
import RaisedButton from 'material-ui/RaisedButton' ;
import fire from 'firebase';
// import PropTypes from 'proptype' ;

import Navigationbar from './Navigation-bar';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


class CreatePost extends Component {
    
    constructor(props){
        super(props)
        // this.eventHandeler = this.eventHandeler.bind(this)
        this.state = {text:{
            crimeName : '',
            crimeDate : '',
            crimeTime : '',
            crimeDescription : '',

            missingName : '',
            missingDescription : '',
            missingContact : '',

            complainCategory : '',
            complainName : '',
            complainTime : '',
            complainDescription : '',
        },java :''}
    }
    // checkPropTypes(){
    //     console.log(this.prop)
    // }
    submitPostCrime(event){
        event.preventDefault();
        let user = localStorage.getItem("user")
        let convertUser = JSON.parse(user)
        let state = this.state.text
        let that = this
        let objectCrime = {
            userID : convertUser.userID,
            crimeName : state.crimeName,
            crimeDate : state.crimeDate,
            crimeTime : state.crimeTime,
            crimeDescription : state.crimeDescription,
            name : " name : " +  convertUser.name + " email : " + convertUser.email,
        }
        if(objectCrime.crimeName === "" ){alert('Name is Null')} if(objectCrime.crimeDescription === ''){alert('Description')}else{
            fire.database().ref('/').child('crime/' + objectCrime.userID ).push(objectCrime) ;
            console.log(objectCrime)
            setTimeout(() => {
                that.setState({ text : {crimeName: '' , crimeDate : '' , crimeTime : '' , crimeDescription : '' } })
            }, 200);
        }
    }
    submitPostMissing(){
        let user = localStorage.getItem("user")
        let convertUser = JSON.parse(user)
        let state = this.state.text
        let that = this
        let objectMissing = {
            userID : convertUser.userID,
            missingName : state.missingName,
            missingContact : state.missingContact,
            missingDescription : state.missingDescription,
            name : " name : " +  convertUser.name + " email : " + convertUser.email
        }
        if(objectMissing.missingName === "" ){alert('Name is Null')} if(objectMissing.missingDescription === ''){alert('Description is empty')}else{
            fire.database().ref('/').child('missing/' + objectMissing.userID ).push(objectMissing);
            console.log(objectMissing)
            setTimeout(() => {
                that.setState({ text : {missingName: '' , missingContact : '' , missingDescription : '' } })
            }, 200);
        }
    }
    submitPostComplain(){
        let user = localStorage.getItem("user")
        let convertUser = JSON.parse(user)
        let state = this.state.text
        let that = this
        let objectComplain = {
            userID : convertUser.userID,
            complainCategory : state.complainCategory,
            complainName : state.complainName,
            complainTime : state.complainTime,
            complainDescription : state.complainDescription,
            name : " name : " +  convertUser.name + " email : " + convertUser.email
        }
        if(objectComplain.complainName === "" ){alert('Name is Null')} if(objectComplain.complainDescription===''){alert('Description is Empty')} else {
            fire.database().ref('/').child('complain/' + objectComplain.userID ).push(objectComplain);
            console.log(objectComplain)
            setTimeout(() => {
                that.setState({ text : {complainName: '' , complainCategory : '' , complainTime : '' , complainDescription : '' } })
            }, 200);
        }
    }

    handleChange(property, event) {
        event.stopPropagation();
        let text = this.state.text;
        text[property] = event.target.value;
        this.setState({
            [event.target.name]: event.target.value,
            text
        });
    }
    
    eventHandeler(property , event){
        let text = this.state.text;
        let dada1= new Date().getDate(event)
        let dada2= new Date().getMonth(event)
        let dada3= new Date().getFullYear(event)
        let dada4= new Date().getHours(event)
        let dada5= new Date().getMinutes(event)
        let dada = "Date: " + dada1 +"-"+ dada2 +1 +"-"+ dada3 +" --- Time: "+ dada4 +":"+dada5
        text[property] = dada.toLocaleString();
        this.setState({text});
    }

    render(){
        let user = localStorage.getItem("user")
        let convertUser = JSON.parse(user)
        return(
            <div className="">
                <div className="center">
                <Navigationbar active1="active1" />
                {(convertUser === null)? <div>404 Error Your Page is Sign out</div> : 
                    <div>

                        {/* <NavigationBar/> */}
                <MuiThemeProvider>
                    <Tabs>
                        <Tab label="Crime Report" >
                            <div className="center ">
                                <h2 className="font-weight-bold" style={styles.headline}>Crime Report</h2>
                                <TextField value = { this.state.text.crimeName } onChange={ this.handleChange.bind(this,'crimeName') } name="crimeName"   hintText="Crime Name" floatingLabelText="Crime Name" floatingLabelFixed={true }/><br />
                                <TextField value = { this.state.text.crimeDate } onChange= { this.handleChange.bind(this , 'crimeDate') } name="crimeDate" hintText="Place" /><br />
                                <TimePicker  onChange={ this.eventHandeler.bind(this , 'crimeTime' ) } name="crimeTime" hintText="12hr Format with auto ok" autoOk={true} />
                                <TextField value = { this.state.text.crimeDescription } name="crimeDescription" onChange={ this.handleChange.bind(this , 'crimeDescription')} hintText="Description"/><br /><br />
                                <RaisedButton label="SUBMIT post" onClick={this.submitPostCrime.bind(this)} primary={true} fullWidth={true} /><br /><br />
                                <Slider name="slider0" defaultValue={0.2} />
                            </div>
                        </Tab>
                        <Tab label="Missing Person" >
                            <div className="center">
                                <h2 className="font-weight-bold" style={styles.headline}>Missing Person</h2>
                                <TextField value = {this.state.text.missingName} onChange={this.handleChange.bind(this, 'missingName')} name="missingName" hintText="Person Name" floatingLabelText="Person Name"floatingLabelFixed={true}/><br />
                                <TextField value ={ this.state.text.missingDescription} onChange={this.handleChange.bind(this, 'missingDescription')} name="missingDescription" hintText="Description"/><br />
                                <TextField value = {this.state.text.missingContact} onChange={this.handleChange.bind(this, 'missingContact')} name="missingContact"  hintText="Contact" /><br /><br />
                                <RaisedButton label="SUBMIT post" onClick={this.submitPostMissing.bind(this)} primary={true} fullWidth={true} /><br /><br /><br /><br /><br />
                                <Slider name="slider0" defaultValue={0.5} />
                            </div>
                        </Tab>
                        <Tab label="Complain">
                            <div className="center">
                                <h2 className="font-weight-bold" style={styles.headline}>Complain</h2>
                                <TextField value={this.state.text.complainCategory} onChange={this.handleChange.bind(this ,'complainCategory')} name="complainCategory" hintText="Complain Category" floatingLabelText="Crime Name"floatingLabelFixed={true}/><br />
                                <TextField value={this.state.text.complainName} onChange={this.handleChange.bind(this , 'complainName')} name="complainName" hintText="Person Name" /><br />
                                <TimePicker  onChange={this.eventHandeler.bind(this , 'complainTime')} name="complainTime" hintText="12hr Format with auto ok" autoOk={true} />
                                <TextField value={this.state.text.complainDescription} onChange={this.handleChange.bind(this , 'complainDescription')} name="complainDescription" hintText="Description"/><br /><br />
                                <RaisedButton label="SUBMIT post" onClick={this.submitPostComplain.bind(this)} primary={true} fullWidth={true} /><br /><br />
                                <Slider name="slider0" defaultValue={0.8} />
                            </div>
                        </Tab>
                    </Tabs>
                </MuiThemeProvider>
                        <div className="back">
                            <span> Hello {convertUser.name} </span>
                            <span> login with : {convertUser.email} </span>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}
// CreatePost.propTypes = {
//     crimeTime: PropTypes
//   };

export default CreatePost;