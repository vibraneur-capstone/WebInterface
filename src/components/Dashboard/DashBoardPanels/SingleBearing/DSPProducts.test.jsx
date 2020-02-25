import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DSPProducts from './DSPProducts';

configure({adapter: new Adapter() });

describe('Testing DSPProducts Render', () => {
    it ('should render correctly', () => {
        const component = shallow(<DSPProducts/>);
        expect(component).toMatchSnapshot();
    })
})