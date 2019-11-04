import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UnhealthyBearings from './UnhealthyBearings';


configure({adapter: new Adapter() });

describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<UnhealthyBearings/>);
        expect(component).toMatchSnapshot();
    })
})