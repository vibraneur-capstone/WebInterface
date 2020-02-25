import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TitleBar from './TitleBar.jsx';


configure({adapter: new Adapter() });

var colours = {
    primary: '#246e89',
    secondary: '#e0e0e0',
    warning: 'rgb(215, 38, 61)',
}

describe('Testing TitleBar', () => {
    it ('should render correctly', () => {
        const component = shallow(<TitleBar colours={colours}/>);
        expect(component).toMatchSnapshot();
    })
})