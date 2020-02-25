import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BearingStats from './BearingStats.jsx';

configure({adapter: new Adapter() });

describe('Testing BearingStats Render', () => {
    it ('should render correctly', () => {
        const component = shallow(<BearingStats/>);
        expect(component).toMatchSnapshot();
    })
})