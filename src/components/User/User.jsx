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
        background: '#e0e0e0',
        warning: 'rgb(215, 38, 61)',
      },
      organization: 'Husky',
      config: {panels: [{ type: 'Single Bearing', size: {height: '300px', width: '700px'}, position: {x: 100, y: 100}, maximized: false, draggable: true}]}
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
      'backgroundColor': this.state.colours.background,
      'borderRight': '5px solid ' + this.state.colours.primary,
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

      <div style={{'backgroundColor': this.state.colours.background}} className="User">
        
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
          config={this.state.config}
        ></Dashboard>
      
      </div>
    );
  }
  
}