import React from 'react';
import Login from './Login';
import UserContainer from './UserContainer';

export default class Main extends React.Component {

    constructor (props) {
       super(props);

       this.state = {

       }
    }

    render () {

        let login = <Login></Login>
        login = undefined;
        return (
            <div className='main'>
                <UserContainer></UserContainer>
            </div>
        )
    }

}