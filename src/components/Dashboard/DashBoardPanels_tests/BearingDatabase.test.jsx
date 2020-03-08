
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BearingDatabase from '../DashBoardPanels/BearingDatabase.jsx';


configure({ adapter: new Adapter() });
let func = function () { };

describe('Testing Login', () => {
    it('should render correctly', () => {
        const component = shallow(<BearingDatabase setTitle={func} />);
        expect(component).toMatchSnapshot();
    })
})

/*
describe('Testing updateSensors()', () => {
    const component = shallow(<BearingDatabase setTitle={func}></BearingDatabase>);
    const instance = component.instance();
    let test = {
        "bearingList": [
            {
                "id": 'b14567',
                "status": 'ONLINE',
                "tags": {
                    id: 'test'
                }
            },
            {
                "id": 'b14568',
                "status": 'OFFLINE',
                "tags": {
                    id: 'test'
                }
            },
            {
                "id": 'b14569',
                "status": 'DECOMMISSIONED',
                "tags": {
                    id: 'test'
                }
            },
            {
                "id": 'b14570',
                "status": 'ONLINE',
                "tags": {
                    id: 'test'
                }
            },
            {
                "id": 'b14571',
                "status": 'ONLINE',
                "tags": {
                    id: 'test'
                }
            },
        ]
    }

    it('Should store the the provided sensors in state', () => {
        instance.updateSensors('sensors', test)
        expect(component.state('sensors')).toBe(test)
    })
})*/