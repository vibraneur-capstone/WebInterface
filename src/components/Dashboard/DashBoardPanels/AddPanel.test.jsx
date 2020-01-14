import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AddPanel from './AddPanel.jsx';


configure({adapter: new Adapter() });

describe('Testing AddPanel Render', () => {
    it ('should render correctly', () => {
        const component = shallow(<AddPanel/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Testing displaying Panel Types', () => {
    it ('should toggle showing the panel types on and off', () => {
        const component = shallow(<AddPanel/>);
        const instance = component.instance();
        let initialState = instance.state('display');
        expect(initialState).toBe(false);
        instance.display();
        let newState = instance.state('display');
        expect(newState).toBe(true);
        instance.display();
        let finalState = instance.state('display');
        expect(finalState).toBe(false);
    })
})