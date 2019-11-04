import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Taskbar from './Taskbar';



test('testing jest', () => {
    expect(0).toBe(0);
})

configure({adapter: new Adapter() });


describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<Taskbar/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Testing Change Focus', () => {
    it ('should change this.state.panelFocus to the arg value', () => {
        const component = shallow(<Taskbar></Taskbar>);
        const instance = component.instance();
    })
})