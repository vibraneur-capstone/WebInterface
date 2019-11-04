import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Dashboard from './Dashboard';


configure({adapter: new Adapter() });

describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<Dashboard/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Testing Change Focus', () => {
    it ('should change this.state.panelFocus to the arg value', () => {
        const component = shallow(<Dashboard></Dashboard>);
        const instance = component.instance();
        instance.changeFocus(undefined, 10)
        expect(component.state('panelFocus')).toBe(10)
    })
})