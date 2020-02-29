import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FindBearing from '../Tools/FindBearing.jsx';


configure({adapter: new Adapter() });

let colours = {

}

describe('Testing Icon Render', () => {
    it ('should render correctly', () => {
        const component = shallow(<FindBearing colours={colours} organization={'Husky'}/>);
        expect(component).toMatchSnapshot();
    })
})