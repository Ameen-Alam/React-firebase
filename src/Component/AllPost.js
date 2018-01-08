import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import  fire from 'firebase'
// import RaisedButton from 'material-ui/RaisedButton';

import NavigationBar from './Navigation-bar';

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
  };
  
class AllPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            crimeArray : [],
            missingArray : [],
            complainArray : [],
            array : [] ,
        }
    }

    crimeLikeButton(index , newValue){
            let crime = this.state.crimeArray;
            let task = crime[index]
            task['crimeLike'] = task['crimeLike'] +1;
            this.setState({
                crimeArray : crime
            })
    }
    missingLikeButton(index , newValue){
            let missing = this.state.missingArray;
            let task = missing[index]
            task['missingLike'] = task['missingLike'] +1;
            this.setState({
                missingArray : missing
            })
    }
    complainLikeButton(index , newValue){
            let complain = this.state.complainArray;
            let task = complain[index]
            task['complainLike'] = task['complainLike'] +1;
            this.setState({
                complainArray : complain
            })
    }
    

    componentWillMount(){
        // let user = localStorage.getItem('user')
        // let convertUser = JSON.parse(user);
        let that = this
        fire.database().ref('user/').on('child_added' , function(snap){
            let obj = snap.val();
            obj.id = snap.key;
            console.log(obj.userID)
            let id =  obj.userID

            fire.database().ref('crime/' + id).on('child_added' , function(snap){
                let obj = snap.val();
                obj.id = snap.key;
                console.log(obj)
                let array = that.state.crimeArray
                array.push(
                    {
                        crimeName : obj.crimeName,
                        crimeDate : obj.crimeDate,
                        crimeTime : obj.crimeTime,
                        crimeDescription : obj.crimeDescription,
                        made1 : obj.name,
                        crimeLike : 11

                    },
                    )
                    that.setState({
                        crimeArray : array,
                    })
                })
            fire.database().ref('missing/' + id).on('child_added' , function(snapshout){
                let obj = snapshout.val();
                obj.id = snapshout.key;
                console.log(obj)
                let array = that.state.missingArray;
            array.push({
                missingContact : obj.missingContact,
                missingDescription : obj.missingDescription,
                missingName : obj.missingName,
                made2 : obj.name,
                missingLike : 18 ,
            })
            that.setState({
                missingArray : array,
                
            })
            })
            fire.database().ref('complain/' + id).on('child_added' , function(snap){
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
                    complainLike : 6 ,
                })
                that.setState({
                    complainArray : array,
                })
            })
        })
    }

    render(){
        let user = localStorage.getItem("user")
        let convertUser = JSON.parse(user)
    
        return(
            <div className="center">
            {this.state.obj}
                <NavigationBar active2="active2" />
                    {(convertUser === null)? <div>404 Error Your Page is Sign out</div> : <div>
                <MuiThemeProvider>
                    <Tabs>
                        <Tab label="Crime Report" >
                            <div className="center ">
                                <h2 className="font-weight-bold" style={styles.headline}>Crime Report</h2>
                                <div>
                                        {
                                            this.state.crimeArray.map( (task , index) => {
                                                return <div key={index} index={index} detail={task} className="database-bg">
                                                 <h1>{task.crimeName} </h1>
                                                 <p>{task.crimeDate} </p>
                                                 <p>{task.crimeTime} </p>
                                                 <p>{task.crimeDescription} </p>
                                                 <p>{task.made1} </p>
                                                 <button onClick={this.crimeLikeButton.bind(this , index)} className="btn btn-info px-5 mx-3"> {task.crimeLike}   Like </button>
                                                 </div>
                                            } )
                                        }
                                </div>
                                <Slider name="slider0" defaultValue={0.2} />
                            </div>
                        </Tab>
                        <Tab label="Missing Person" >
                            <div className="center">
                                <h2 className="font-weight-bold" style={styles.headline}>Missing Person</h2>
                                <div>
                                {this.state.missingArray.map( (task , index) => {
                                    return <div key={index} index={index} detail={task} className="database-bg">
                                        <h1>{task.missingName}</h1>
                                        <p>{task.missingDescription}</p> 
                                        <p>{task.missingContact}</p>
                                        <p>{task.made2}</p>
                                        <button onClick={this.missingLikeButton.bind(this , index)} className="btn btn-info px-5 mx-3"> {task.missingLike}   Like </button>
                                    </div>
                                } )}
                                </div>
                                <Slider name="slider0" defaultValue={0.5} />
                            </div>
                        </Tab>
                        <Tab label="Complain">
                            <div className="center">
                                <h2 className="font-weight-bold" style={styles.headline}>Complain</h2>
                                <div>
                                {this.state.complainArray.map( (task , index ) => {
                                    return <div key={index} index={index} detail={task} className="database-bg">
                                        <h1>{task.complainCategory}</h1>
                                        <p>{task.complainName}</p>
                                        <p>{task.complainTime}</p>
                                        <p>{task.complainDescription}</p>
                                        <p>{task.made3}aa</p>
                                        <button onClick={this.complainLikeButton.bind(this , index)} className="btn btn-info px-5 mx-3"> {task.complainLike}  Like </button>
                                    </div>
                                }
                                )}
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

export default AllPost;