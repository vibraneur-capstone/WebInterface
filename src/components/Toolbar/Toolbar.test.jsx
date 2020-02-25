import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toolbar from './Toolbar.jsx';


configure({adapter: new Adapter() });

describe('Testing Login', () => {

    let colours = {
        primary: '#246e89',
        secondary: '#e0e0e0',
        warning: 'rgb(215, 38, 61)',
    }
    
    it ('should render correctly', () => {
        const component = shallow(<Toolbar colours={colours}/>);
        expect(component).toMatchSnapshot();
    })
})