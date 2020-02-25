import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UnhealthyBearings from '../DashBoardPanels/UnhealthyBearings.jsx';


configure({adapter: new Adapter() });
let func = function () {};

describe('Testing Component Render', () => {
    it ('Should Render New Panel', () => {
        const component = shallow(<UnhealthyBearings setTitle={func}/>);
        expect(component).toMatchSnapshot();
    })

    let config = {};

    it ('Should Render with empty config', () => {
        const component = shallow(<UnhealthyBearings setTitle={func} config={config}/>);
        expect(component).toMatchSnapshot();
    })
})