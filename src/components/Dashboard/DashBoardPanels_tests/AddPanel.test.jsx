import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AddPanel from '../DashBoardPanels/AddPanel.jsx';


configure({ adapter: new Adapter() });

let colours = {
    primary: '#246e89',
    secondary: '#e0e0e0',
    warning: 'rgb(215, 38, 61)',
}

describe('Testing AddPanel Render', () => {
    it('should render correctly', () => {
        const component = shallow(<AddPanel colours={colours}/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Testing displaying Panel Types', () => {
    it('should toggle showing the panel types on and off', () => {
        const component = shallow(<AddPanel colours={colours}/>);
        const instance = component.instance();
        let initialState = component.state('display');
        expect(initialState).toBe(false);
        instance.display();
        let newState = component.state('display');
        expect(newState).toBe(true);
        instance.display();
        let finalState = component.state('display');
        expect(finalState).toBe(false);
    })
})