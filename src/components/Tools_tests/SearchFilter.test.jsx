import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchFilter from '../Tools/SearchFilter.jsx';


configure({adapter: new Adapter() });

describe('Testing Icon Render', () => {
    it ('should render correctly', () => {
        const component = shallow(<SearchFilter/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Testing Component Mount', () => {
    let test_data = {bearingList: [ { id: 1 }, { id: 2 } ]}
    const component = shallow(<SearchFilter data={test_data}></SearchFilter>);
    
    it('Should store the provided data in its state', () => {
        expect(component.state('data')).toBe(test_data);
    })
})

describe('Testing updateSensors()', () => {
    
    const component = shallow(<SearchFilter></SearchFilter>);
    const instance = component.instance();
    
    let test_data = {bearingList: [ { id: 1 }, { id: 2 } ]}

    it('Should store the provided sensors in state', () => {
        instance.updateSensors('sensors', test_data)
        expect(component.state('data')).toBe(test_data)
    })
})