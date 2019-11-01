import React from 'react';
import Login from './Login';
import UserContainer from './UserContainer';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

export default class Main extends React.Component {

    constructor (props) {
       super(props);

       this.state = {
        redirect: false
       }

       this.login = this.login.bind(this);
    }

    login() {
        this.setState({
            redirect: true
        })
    }

    render () {

        let redirect = undefined

        if (this.state.redirect) {
            redirect = <Redirect to='/login'></Redirect>
        }
        return (
            <div className='main' background="./static/background.png">
                <Button onClick={this.login}>Login</Button>
                {redirect}
            </div>  
        )
    }

}