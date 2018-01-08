import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import fire from 'firebase'

import Navigationbar from './Navigation-bar';
// import index from 'material-ui/TimePicker';

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
  };
  

class MyPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            crimeArray : [] ,
            missingArray : [] ,
            complainArray : [] ,

            // isCrimeEditing : true
        }
    }

    componentWillMount(){
        let user = localStorage.getItem('user')
        let convertUser = JSON.parse(user);
        let that = this
        fire.database().ref('crime/' + convertUser.userID).on('child_added' , function(snap){
            let obj = snap.val();
            obj.id = snap.key;
            console.log(obj)
            let array = that.state.crimeArray
            array.push({
                crimeName : obj.crimeName,
                crimeDate : obj.crimeDate,
                crimeTime : obj.crimeTime,
                crimeDescription : obj.crimeDescription,
                made1 : obj.name,
                isCrimeEditing : true
            })
            that.setState({
                crimeArray : array
            })
        })
        fire.database().ref('missing/' + convertUser.userID).on('child_added' , function(snapshout){
            let obj = snapshout.val();
            obj.id = snapshout.key;
            console.log(obj)
            let array = that.state.missingArray
            array.push({
                missingContact : obj.missingContact,
                missingDescription : obj.missingDescription,
                missingName : obj.missingName,
                made2 : obj.name,
                isMissingEditing : true
            })
            that.setState({
                missingArray : array
            })
        })
        fire.database().ref('complain/' + convertUser.userID).on('child_added' , function(snap){
            let obj = snap.val();
            obj.id = snap.key;
            console.log(obj)
            let array = that.state.complainArray
            array.push({
                complainCategory : obj.complainCategory,
                complainName : obj.complainName,
                complainTime : obj.complainTime,
                complainDescription : obj.complainDescription,
                made3 : obj.name,
                isComplainEditing : true
            })
            that.setState({
                complainArray : array
            })
        })
    }
    //mega set crime ---
        crimeEditTask(index , newValue){
            let crime = this.state.crimeArray;
            let task = crime[index]
            task['isCrimeEditing'] = false;
            console.log(task)
            this.setState({
                    crimeArray : crime
            })
            
            // let task = tasks[index];
            // task['name'] = newValue;
            // this.setState({
            //     crimeArray : tasks
            // })
        }

    crimeCancel(index , newValue){
        let crime = this.state.crimeArray;
        let task = crime[index]
        task['isCrimeEditing'] = true;
        this.setState({
            crimeArray : crime
        })
    }
    crimeUpdatTask(index , newValue){
        let crime = this.state.crimeArray;
        let task = crime[index]
        task['isCrimeEditing'] = true;
        this.setState({
            crimeArray : crime,
        })
    }

    crimeOnChange(index, property , event){
        let array = this.state.crimeArray;
        // array[property] = event.target.value
        let task = array[index]
        task[property] = event.target.value;
        this.setState({
            crimeArray : array
        })
    }

    crimeDelete(index){
        // let user = localStorage.getItem('user')
        // let convertUser = JSON.parse(user);
        // console.log(index)
        let  tasks = this.state.crimeArray;
        tasks.splice(index,1);
        // let database = fire.database().ref('/')
        // database.child('crime/' + convertUser.userID ).remove()
        // database.child('crime/' + convertUser.userID).on('child_remove' , function(data){
        //     let deleted = index.data.id
        //     deleted.remove();
        //     alert('deleted')
        // })
        // fire.database().child('crime/' + convertUser.userID + '/').remove();
        // fire.database().child('crime/'  + convertUser.userID).on("child_remove" , function(data){
        //     let deleted = data.id
        //     deleted.remove();
        //     alert('deleted')
        // })

        this.setState({
            crimeArray : tasks 
        })
    }

    // Missing Mega Set ---
    //mega set Missing ---
    missingEditTask(index , newValue){
        let missing = this.state.missingArray;
        let task = missing[index]
        task['isMissingEditing'] = false;
        console.log(task)
        this.setState({
                missingArray : missing
        })
        
        // let task = tasks[index];
        // task['name'] = newValue;
        // this.setState({
        //     missingArray : tasks
        // })
    }

    missingCancel(index , newValue){
        let missing = this.state.missingArray;
        let task = missing[index]
        task['isMissingEditing'] = true;
        this.setState({
            missingArray : missing
        })
    }
    missingUpdatTask(index , newValue){
        let missing = this.state.missingArray;
        let task = missing[index]
        task['isMissingEditing'] = true;
        this.setState({
            missingArray : missing,
        })
    }

    missingOnChange(index, property , event){
        let array = this.state.missingArray;
        // array[property] = event.target.value
        let task = array[index]
        task[property] = event.target.value;
        this.setState({
            missingArray : array
        })
    }

    missingDelete(index){
        console.log(index)
        let  tasks = this.state.missingArray;
        tasks.splice(index,1);
        this.setState({
            missingArray : tasks 
        })
    }

    // Complain Mega Set ---
    //mega set Complain ---
    complainEditTask(index , newValue){
        let complain = this.state.complainArray;
        let task = complain[index]
        task['isComplainEditing'] = false;
        console.log(task)
        this.setState({
                complainArray : complain
        })
        
        // let task = tasks[index];
        // task['name'] = newValue;
        // this.setState({
        //     complainArray : tasks
        // })
    }

    complainCancel(index , newValue){
        let complain = this.state.complainArray;
        let task = complain[index]
        task['isComplainEditing'] = true;
        this.setState({
            complainArray : complain
        })
    }
    complainUpdatTask(index , newValue){
        let complain = this.state.complainArray;
        let task = complain[index]
        task['isComplainEditing'] = true;
        this.setState({
            complainArray : complain,
        })
    }

    complainOnChange(index, property , event){
        let array = this.state.complainArray;
        // array[property] = event.target.value
        let task = array[index]
        task[property] = event.target.value;
        this.setState({
            complainArray : array
        })
    }
    
    complainDelete(index){
        console.log(index)
        let  tasks = this.state.complainArray;
        tasks.splice(index,1);
        this.setState({
            complainArray : tasks 
        })
    }

    crimeAllDelete(){
        let user = localStorage.getItem('user')
        let convertUser = JSON.parse(user);
        console.log()
        this.setState({
            crimeArray : []
        })
        alert("Opps All Crime Report are Deleted ")
        let database = fire.database().ref('/')
        database.child('crime/' + convertUser.userID ).remove()
    }
    missingAllDelete(){
        let user = localStorage.getItem('user')
        let convertUser = JSON.parse(user);
        this.setState({
            missingArray : []
        })
        alert("Opps All Missing Report are Deleted ")
        let database = fire.database().ref('/')
        database.child('missing/' + convertUser.userID ).remove()
    }
    complainAllDelete(index){
        let user = localStorage.getItem('user')
        let convertUser = JSON.parse(user);
        this.setState({ complainArray : [] })
        alert("Opps All Complain Report are Deleted ")
        let database = fire.database().ref('/')
        database.child('complain/' + convertUser.userID ).remove()
    }
    render(){
        let user = localStorage.getItem("user")
        let convertUser = JSON.parse(user)
        return(
            <div className="center">
            <Navigationbar active3="active3" />
            {(convertUser === null)? <div>404 Error Your Page is Sign out</div> : <div>
                
            <MuiThemeProvider>
                    <Tabs>
                        <Tab label="Crime Report" >
                            <div className="center">
                                <h2 className="font-weight-bold" style={styles.headline}>Crime Report</h2>
                                    <div>
                                    {this.state.crimeArray.map( (task , index) => {
                                        return <div className="database-bg" key={index} index={index} detail={task}>
                                            <div> 
                                                {(task.isCrimeEditing) ? 
                                                <div>
                                                    <h1>{task.crimeName}</h1>
                                                    <p>{task.crimeDate}</p>
                                                    <p>{task.crimeTime}</p>
                                                    <p>{task.crimeDescription}</p>
                                                    <p>{task.made1}</p>
                                                    <button onClick={this.crimeDelete.bind(this , index)} className="px-3 mx-2 btn btn-outline-danger ">DELETE</button>
                                                    <button onClick={this.crimeEditTask.bind(this , index)} className="px-4 mx-2 btn btn-success ">EDIT</button>
                                                </div> 
                                                : 
                                                <div>
                                                    Crime Name : <input onChange={this.crimeOnChange.bind(this , index , 'crimeName')} className="d-inline-block input-field" type='text' value={task.crimeName}  /> <br /><br />
                                                    Crime Date : <input onChange={this.crimeOnChange.bind(this , index , 'crimeDate')}  className="d-inline-block input-field" type='text' value={task.crimeDate} /> <br /><br />
                                                    Crime Time : <input onChange={this.crimeOnChange.bind(this , index , 'crimeTime')}  className="d-inline-block input-field" type='text' value={task.crimeTime} /> <br /><br />
                                                    Crime Description : <input onChange={this.crimeOnChange.bind(this , index , 'crimeDescription')}  className="d-inline-block input-field" type='text' value={task.crimeDescription} /><br /><br /> 
                                                    <button onClick={this.crimeCancel.bind(this , index)} className="px-3 mx-2 btn btn-outline-dark ">CANCEL</button>
                                                    <button onClick={this.crimeUpdatTask.bind(this , index)} className="px-4 mx-2 btn btn-info ">UPDATE</button>
                                                </div>
                                                }
                                            </div>
                                            {/* : 
                                            <div>
                                            hello
                                            </div>
                                        } */}
                                        </div>
                                    } )}
                                    <RaisedButton label="ALL DELETE" onClick={this.crimeAllDelete.bind(this)} primary={true} fullWidth={true} /><br /><br />
                                    </div>
                                <Slider name="slider0" defaultValue={0.2} />
                            </div>
                        </Tab>
                        <Tab label="Missing Person" >
                            <div className="center">
                                <h2 className="font-weight-bold" style={styles.headline}>Missing Person</h2>
                                <div>
                                {this.state.missingArray.map( (task , index) => {
                                    return <div className="database-bg" key={index} index={index} detail={task}>
                                        {(task.isMissingEditing) ? 
                                        <div>
                                            <h1>{task.missingName}</h1>
                                            <p>{task.missingDescription}</p>
                                            <p>{task.missingContact}</p>
                                            <p>{task.made2}</p>
                                            <button onClick={this.missingDelete.bind(this , index)} className="px-3 mx-2 btn btn-outline-danger ">DELETE</button>
                                            <button onClick={this.missingEditTask.bind(this , index)} className="px-4 mx-2 btn btn-success ">EDIT</button>
                                        </div> 
                                        : 
                                        <div>
                                            Missing Name : <input onChange={this.missingOnChange.bind(this , index , 'missingName')} className="d-inline-block input-field" type='text' value={task.missingName}  /> <br /><br />
                                            Missing Date : <input onChange={this.missingOnChange.bind(this , index , 'missingDescription')}  className="d-inline-block input-field" type='text' value={task.missingDescription} /> <br /><br />
                                            Missing Time : <input onChange={this.missingOnChange.bind(this , index , 'missingContact')}  className="d-inline-block input-field" type='text' value={task.missingContact} /> <br /><br />
                                            <button onClick={this.missingCancel.bind(this , index)} className="px-3 mx-2 btn btn-outline-dark ">CANCEL</button>
                                            <button onClick={this.missingUpdatTask.bind(this , index)} className="px-4 mx-2 btn btn-info ">UPDATE</button>
                                        </div>
                                        }
                                </div>
                                } )}
                                <RaisedButton primary={true} label="ALL DELETE" onClick={this.missingAllDelete.bind(this)}  fullWidth={true} /><br /><br />
                                </div>
                                <Slider name="slider0" defaultValue={0.5} />
                            </div>
                        </Tab>
                        <Tab label="Complain">
                            <div className="center">
                                <h2 className="font-weight-bold" style={styles.headline}>Complain</h2>
                                <div>
                                {this.state.complainArray.map( (task , index) => {
                                    return <div className="database-bg" key={index} index={index} detail={task} >{(task.isComplainEditing) ? 
                                        <div>
                                            <h1>{task.complainCategory}</h1>
                                            <p>{task.complainName}</p>
                                            <p>{task.complainTime}</p>
                                            <p>{task.complainDescription}</p>
                                            <p>{task.made3}</p>
                                            <button onClick={this.complainDelete.bind(this , index)} className="px-3 mx-2 btn btn-outline-danger ">DELETE</button>
                                            <button onClick={this.complainEditTask.bind(this , index)} className="px-4 mx-2 btn btn-success ">EDIT</button>
                                        </div> 
                                        : 
                                        <div>
                                            Complain Category : <input onChange={this.complainOnChange.bind(this , index , 'complainCategory')} className="d-inline-block input-field" type='text' value={task.complainCategory}  /> <br /><br />
                                            Complain Name : <input onChange={this.complainOnChange.bind(this , index , 'complainName')}  className="d-inline-block input-field" type='text' value={task.complainName} /> <br /><br />
                                            Complain Time : <input onChange={this.complainOnChange.bind(this , index , 'complainTime')}  className="d-inline-block input-field" type='text' value={task.complainTime} /> <br /><br />
                                            Complain Description : <input onChange={this.complainOnChange.bind(this , index , 'complainDescription')}  className="d-inline-block input-field" type='text' value={task.complainDescription} /> <br /><br />
                                            <button onClick={this.complainCancel.bind(this , index)} className="px-3 mx-2 btn btn-outline-dark ">CANCEL</button>
                                            <button onClick={this.complainUpdatTask.bind(this , index)} className="px-4 mx-2 btn btn-info ">UPDATE</button>
                                        </div>
                                        }
                                    </div> 
                                } )}
                                <RaisedButton label="ALL DELETE" onClick={this.complainAllDelete.bind(this)} primary={true} fullWidth={true} /><br /><br />
                                </div>
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
        )
    }
}

export default MyPost;