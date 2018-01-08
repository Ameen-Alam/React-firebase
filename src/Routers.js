import React, { Component } from 'react';
import App from './App';
import CreatePost from './Component/CreatePost';
import AllPost from './Component/AllPost';
import MyPost from './Component/MyPost';
import {
    Router,
    Route
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
const customHistory = createBrowserHistory();

class Routers extends Component {
    render(){
        return(
            <Router history={customHistory}>
                <div>
                    
                    <Route exact path="/" component= {App} />
                    <Route  path="/createpost" component= {CreatePost} />
                    <Route  path="/allpost" component= {AllPost} />
                    <Route  path="/mypost" component= {MyPost} />
                </div>
            </Router>
        )
    }
}

export default Routers;