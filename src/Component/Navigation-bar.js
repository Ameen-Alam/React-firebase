import React, { Component } from 'react';
import '../App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom';
import fire from 'firebase'

// const style = {
//     color : '#fff',
//     div : {backgroundColor : '#080800'},
//     li : {display : 'inline', margin : '10px 50px 10px 50px'  }
// }

class NavigationBar extends Component{
    logout(){
        fire.auth().signOut().then(function() {
            // Sign-out successful.
            localStorage.clear();
            window.location = '/'
          }, function(error) {
            alert(error)
          });
    }
    bar(){
        var otherWindow = window.open();
        otherWindow.location = "https://www.linkedin.com/in/ameen-alam-375390134/";
    }
    bar1(){
        var otherWindow = window.open();
        otherWindow.location = "https://www.facebook.com/profile.php?id=100008199347637";
    }
    render(){
        return(<div>
            <MuiThemeProvider>
                <div className="container-fluid man-navigation-bar">
                    <div className="">
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 left"  onClick={()=> this.bar()}>About us</div>
                            <div className="col-xs-12 col-sm-4 center">SHEIKH AMEEN</div>
                            <div className="col-xs-12 col-sm-4 right"  onClick={()=> this.bar1()}>Contact</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 text-align-center">
                                <ul className="nav-ul">
                                <Link className={"li " + this.props.active1} to="/createpost">CREATE POST</Link>
                                <Link className={'li ' + this.props.active2} to="/allpost">ALL POST</Link>
                                <Link className={'li ' + this.props.active3} to="/mypost">MY POST</Link>
                                <li className={'li ' + this.props.active}  onClick={this.logout.bind(this)}  >SIGN OUT</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>

        </div>)
    }}
export default NavigationBar;