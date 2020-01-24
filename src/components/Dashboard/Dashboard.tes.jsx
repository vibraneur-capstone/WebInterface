import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.unmock('react-plotly.js');
import Dashboard from './Dashboard.jsx';


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

describe('Test Panel Add and Remove',() => {

    const component = shallow(<Dashboard/>)
    const instance = component.instance();


    it ('should add a panel', () => {
        let nextID = component.state('nextID') + 1;
        instance.addPanel('Single Bearing');
        expect(component.state('nextID')).toBe(nextID);
        let panels = component.state('panels')
        expect(Object.keys(panels).length).toBe(1);
    })

    it ('should add a panel and then successfully remove it', () => {
        instance.removePanel(2);
        let panels = component.state('panels');
        expect(Object.keys(panels).length).toBe(0);
    })

})