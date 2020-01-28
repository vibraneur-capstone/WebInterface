
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BearingDatabase from './BearingDatabase';


configure({adapter: new Adapter() });

describe('Testing Login', () => {
    it ('should render correctly', () => {
        const component = shallow(<BearingDatabase/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Testing updateSensors()', () => {
    it ('Should store the the provided sensors in state', () => {
        const component = shallow(<BearingDatabase></BearingDatabase>);
        const instance = component.instance();
        let test = {
            "sensorList": [
                {
                    "id": 'b14567',
                    "status": 'ONLINE'
                },
                {
                    "id": 'b14568',
                    "status": 'OFFLINE'
                },
                {
                    "id": 'b14569',
                    "status": 'DECOMMISSIONED'
                },
                {
                    "id": 'b14570',
                    "status": 'ONLINE'
                },
                {
                    "id": 'b14571',
                    "status": 'ONLINE'
                },
            ],
            "count": 5
        }
        instance.updateSensors('sensors', test)
        expect(component.state('sensors')).toBe(test)
    })
})