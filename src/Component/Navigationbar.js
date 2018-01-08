import React, { Component } from 'react';
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

// function handleClick() {
//   alert('onClick triggered on the title component');
// }

const styles = {
  title: {
    cursor: 'pointer',
  },
};

class Navigationbar extends Component {
  render() {
    return (
    <MuiThemeProvider>
      <div>
          <AppBar
            title={<span style={styles.title}>Title</span>}
            // onTitleClick={handleClick}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={<FlatButton label="Save" />}
            />
      </div>
    </MuiThemeProvider>
      
    );
  }
}

export default Navigationbar;
