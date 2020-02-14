import React from "react";
import "../styles/User.scss";

import Dashboard from "../Dashboard/Dashboard";
import Toolbar from "../Toolbar/Toolbar.jsx";
import UserSettings from './UserSetting.jsx';
export default class User extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: 'Richard Walmsley',
      settings: false,
      dashBoardWidth: '100%'
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
      float: 'right'
    }

    let settingsStyle = {
      width: '30%',
      height: 'calc(100% - 57px)',
      'background-color': '#f8f9fa',
      'border-right': '5px solid black',
      float: 'left',
    }
    
    let settings = undefined;

    if (this.state.settings) {
      settings = <UserSettings modifyUserSetting={this.modifyUserSetting} style={settingsStyle}></UserSettings>
    }

    return (

      <div className="User">
        
        <Toolbar
          user={this.state.name}
          toggleSettings={this.toggleSettings}
        ></Toolbar>
        {settings}
        <Dashboard
          modifyUserSetting={this.modifyUserSetting}
          style={dashboardStyle}
          /*config={{panels: [{ type: 'Single Bearing', size: {height: '300px', width: '700px'}, position: {x: 100, y: 100}, maximized: false, draggable: true}]}}*/
        ></Dashboard>
      
      </div>
    );
  }
  
}