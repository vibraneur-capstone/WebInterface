import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SingleBearing from '../DashBoardPanels/SingleBearing.jsx';


configure({adapter: new Adapter() });
let func = function () {};

var colours = {
    primary: '#246e89',
    secondary: '#e0e0e0',
    warning: 'rgb(215, 38, 61)',
  }
describe('Testing Component Render', () => {
    it ('Should Render New Panel', () => {
        const component = shallow(<SingleBearing colours={colours} setTitle={func}/>);
        expect(component).toMatchSnapshot();
    })

    let config = {};

    it ('Should Render Config Panel', () => {
        const component = shallow(<SingleBearing setTitle={func} colours={colours} config={config}/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Test changeBearing()', () => {
    
    it('id should be empty', () => {
        const component = shallow(<SingleBearing setTitle={func} colours={colours}/>);
        expect(component.state('id')).toBe(undefined);
        expect(component.state('search')).toBe(true);
    })

    it ('Should change the current bearing', () => {
        const component = shallow(<SingleBearing setTitle={func} colours={colours}/>);
        const instance = component.instance();

        instance.changeBearing('test');
        expect(component.state('id')).toBe('test')
        expect(component.state('search')).toBe(false);
    })
})