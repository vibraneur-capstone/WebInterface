import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BearingGraph from './BearingGraph.jsx';

configure({adapter: new Adapter() });

describe('Testing BearingGraph render', () => {
    it ('should render correctly', () => {
        const component = shallow(<BearingGraph/>);
        expect(component).toMatchSnapshot();
    })
})