import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Taskbar from './Taskbar';
import SelectPanelType from './SelectPanelType';



test('testing jest', () => {
    expect(0).toBe(0);
})

configure({adapter: new Adapter() });


describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<SelectPanelType/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Testing Change Focus', () => {
    it ('should change this.state.panelFocus to the arg value', () => {
        const component = shallow(<SelectPanelType></SelectPanelType>);
        const instance = component.instance();
    })
})