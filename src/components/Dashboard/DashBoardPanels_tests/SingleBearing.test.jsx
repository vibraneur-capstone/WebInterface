import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SingleBearing from '../DashBoardPanels/SingleBearing.jsx';


configure({adapter: new Adapter() });
let func = function () {};

describe('Testing Component Render', () => {
    it ('Should Render New Panel', () => {
        const component = shallow(<SingleBearing setTitle={func}/>);
        expect(component).toMatchSnapshot();
    })

    let config = {};

    it ('Should Render Config Panel', () => {
        const component = shallow(<SingleBearing setTitle={func} config={config}/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Test changeBearing()', () => {
    
    it('id should be empty', () => {
        const component = shallow(<SingleBearing setTitle={func}/>);
        expect(component.state('id')).toBe(undefined);
        expect(component.state('search')).toBe(true);
    })

    it ('Should change the current bearing', () => {
        const component = shallow(<SingleBearing setTitle={func}/>);
        const instance = component.instance();

        instance.changeBearing('test');
        expect(component.state('id')).toBe('test')
        expect(component.state('search')).toBe(false);
    })
})