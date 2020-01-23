import React from "react";
import "../styles/User.scss";

import Dashboard from "../Dashboard/Dashboard";
import Toolbar from "../Toolbar/Toolbar";

export default class User extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name: 'Richard Walmsley'
    }

    this.modifyUserSetting = this.modifyUserSetting.bind(this);
  }

  modifyUserSetting(setting, value) {
    this.setState({
      [setting]: value,
    })
  }

  render () {
    
    let dashboardStyle = {
      width: '100%',
      height: 'calc(100% - 57px)'
    }
    
    return (

      <div className="User">
        
        <Toolbar
          user={this.state.name}
        ></Toolbar>

        <Dashboard
          modifyUserSetting={this.modifyUserSetting}
          style={dashboardStyle}
        ></Dashboard>
      
      </div>
    );
  }
  
}