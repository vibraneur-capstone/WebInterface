import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Search from './Search.jsx';


configure({adapter: new Adapter() });

describe('Testing Component Render', () => {
    it ('should render correctly', () => {
        const component = shallow(<Search/>);
        expect(component).toMatchSnapshot();
    })
})