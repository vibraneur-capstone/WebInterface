import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RULDisplay from './DSPProducts.jsx';

configure({adapter: new Adapter() });

describe('Testing RULDisplay Render', () => {
    it ('should render correctly', () => {
        const component = shallow(<RULDisplay/>);
        expect(component).toMatchSnapshot();
    })
})