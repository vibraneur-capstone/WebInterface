import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Icon from './Icon.jsx';


configure({adapter: new Adapter() });

describe('Testing Icon Render', () => {
    it ('should render correctly', () => {
        const component = shallow(<Icon/>);
        expect(component).toMatchSnapshot();
    })
})