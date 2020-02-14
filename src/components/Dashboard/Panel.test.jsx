import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Panel from './Panel';


configure({adapter: new Adapter() });
var testConfig = {
    type: 'Single Bearing'
}

describe('Testing Login', () => {
    let testConfig = {
        type: 'Single Bearing'
    }
    it ('should render correctly', () => {
        const component = shallow(<Panel config={testConfig}/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Test setTitle()', () => {
    let testConfig = {
        type: 'Single Bearing'
    }
    const component = shallow(<Panel config={testConfig}/>)

    expect(component.state('panelTitle')).toBe(undefined);
    let instance = component.instance();
    instance.setTitle('Coverage');
    expect(component.state('panelTitle')).toBe('Coverage');
})

describe('Test removePanel()', () => {
    let removePanel = function () {return true};

    it ('should unmount the component', () => {
        const component = shallow(<Panel config={testConfig} removePanel={removePanel}/>)
        const instance = component.instance();
        instance.removePanel();
    })
})

describe('Test toggleMaximize()', () => {
    it ('should ', () => {
        const component = shallow(<Panel config={testConfig}/>)
        const instance = component.instance();

        instance.toggleMaximize();
    })
})

describe('Test toggleDraggable()', () => {
    it ('should ', () => {
        const component = shallow(<Panel config={testConfig}/>)
        const instance = component.instance();

        instance.toggleDraggable();
    })
})

describe('Test saveState()', () => {
    it ('should ', () => {
        const component = shallow(<Panel config={testConfig}/>)
        const instance = component.instance();

        //instance.saveState();
    })
})

