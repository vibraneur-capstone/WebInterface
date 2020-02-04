import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SingleBearing from '../DashBoardPanels/SingleBearing.jsx';


configure({adapter: new Adapter() });
let func = function () {};

describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<SingleBearing setTitle={func}/>);
        expect(component).toMatchSnapshot();
    })
})