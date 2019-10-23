import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toolbar from './Toolbar.jsx';

test('testing jest', () => {
    expect(0).toBe(0);
})

configure({adapter: new Adapter() });

describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<Toolbar/>);
        expect(component).toMatchSnapshot();
    })
})