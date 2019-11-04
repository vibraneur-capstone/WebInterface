import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PanelType from './PanelType';



test('testing jest', () => {
    expect(0).toBe(0);
})

configure({adapter: new Adapter() });


describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<PanelType/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Testing Change Focus', () => {
    it ('should change this.state.panelFocus to the arg value', () => {
        const component = shallow(<PanelType></PanelType>);
        const instance = component.instance();
    })
})