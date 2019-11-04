import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import User from './User';



test('testing jest', () => {
    expect(0).toBe(0);
})

configure({adapter: new Adapter() });


describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<User/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Testing Change Focus', () => {
    it ('should change this.state.panelFocus to the arg value', () => {
        const component = shallow(<User></User>);
        const instance = component.instance();
        instance.modifyUserSetting('name', 'Noah Gallant')
        expect(component.state('name')).toBe('Noah Gallant')
    })
})