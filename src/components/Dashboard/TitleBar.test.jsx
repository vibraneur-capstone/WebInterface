import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TitleBar from './TitleBar.jsx';


test('testing jest', () => {
    expect(0).toBe(0);
})

configure({adapter: new Adapter() });


describe('Testing TitleBar', () => {
    it ('should render correctly', () => {
        const component = shallow(<TitleBar/>);
        expect(component).toMatchSnapshot();
    })
})