import React from "react";
import "../styles/User.scss";

import Dashboard from "../Dashboard/Dashboard";
import Toolbar from "../Toolbar/Toolbar.jsx";
import UserSettings from './UserSetting.jsx';
import Search from '../Toolbar/Search.jsx';

export default class User extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: 'Richard Walmsley',
      settings: false,
      dashBoardWidth: '100%',
      colours: {
        primary: '#246e89',
        secondary: '#e0e0e0',
        warning: 'rgb(215, 38, 61)',
      },
      organization: 'Husky'
    }

    this.modifyUserSetting = this.modifyUserSetting.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  modifyUserSetting(setting, value) {
    this.setState({
      [setting]: value,
    })
  }

  toggleSettings() {
    console.warn("TOGGLING SETTINGS")
    if (!this.state.settings) {
      this.setState({
        dashBoardWidth: '70%'
      })
    } else {
      this.setState({
        dashBoardWidth: '100%'
      })
    }
    this.setState({
      settings: !this.state.settings
    })
  }

  render () {
    
    let dashboardStyle = {
      width: this.state.dashBoardWidth,
      height: 'calc(100% - 57px)',
      float: 'right',
      display: 'contents',
    }

    let settingsStyle = {
      width: '375px',
      height: 'calc(100% - 57px)',
      'background-color': '#607b7d',
      'border-right': '5px solid #246e89',
      float: 'left',
      overflow: 'scroll',
      padding: '15px'
    }
    
    let settings = undefined;

    if (this.state.settings) {
      settings = <UserSettings 
        modifyUserSetting={this.modifyUserSetting}
        style={settingsStyle}
        colours={this.state.colours}
      ></UserSettings>
    }

    return (

      <div style={{'background-color': this.state.colours.secondary}} className="User">
        
        <Toolbar
          colours={this.state.colours}
          user={this.state.name}
          organization={this.state.organization}
          toggleSettings={this.toggleSettings}
        ></Toolbar>
        <Search
          colours={this.state.colours}
          organization={this.state.organization}
        >
        </Search>
        {settings}
        <Dashboard
          colours={this.state.colours}
          modifyUserSetting={this.modifyUserSetting}
          style={dashboardStyle}
          organization={this.state.organization}
          /*config={{panels: [{ type: 'Single Bearing', size: {height: '300px', width: '700px'}, position: {x: 100, y: 100}, maximized: false, draggable: true}]}}*/
        ></Dashboard>
      
      </div>
    );
  }
  
}