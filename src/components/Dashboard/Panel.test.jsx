import React from 'react';

import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Panel from './Panel';


configure({adapter: new Adapter() });
var testConfig = {
    type: 'Single Bearing'
}

var colours = {
    primary: '#246e89',
    secondary: '#e0e0e0',
    warning: 'rgb(215, 38, 61)',
  };

const mockChangeFocusFunction = (e, id) => {

};

describe('Testing Login', () => {
    let testConfig = {
        type: 'Single Bearing'
    }
    it ('should render correctly', () => {
        const component = shallow(<Panel colours={colours} config={testConfig} changeFocus={mockChangeFocusFunction}/>);
        expect(component).toMatchSnapshot();
    })
})

describe('Test setTitle()', () => {
    let testConfig = {
        type: 'Single Bearing'
    }
    const component = shallow(<Panel colours={colours} config={testConfig} changeFocus={mockChangeFocusFunction}/>)

    expect(component.state('panelTitle')).toBe(undefined);
    let instance = component.instance();
    instance.setTitle('Coverage');
    expect(component.state('panelTitle')).toBe('Coverage');
})

describe('Test removePanel()', () => {
    let removePanel = function () {return true};

    it ('should unmount the component', () => {
        const component = shallow(<Panel colours={colours} config={testConfig} removePanel={removePanel} changeFocus={mockChangeFocusFunction}/>)
        const instance = component.instance();
        instance.removePanel();
    })
})

describe('Test toggleMaximize()', () => {
    it ('should ', () => {
        const component = shallow(<Panel colours={colours} config={testConfig} changeFocus={mockChangeFocusFunction}/>)
        const instance = component.instance();

        instance.toggleMaximize();
    })
})

describe('Test toggleDraggable()', () => {
    it ('should ', () => {
        const component = shallow(<Panel colours={colours} config={testConfig} changeFocus={mockChangeFocusFunction}/>)
        const instance = component.instance();

        instance.toggleDraggable();
    })
})

describe('Test saveState()', () => {
    it ('should ', () => {
        const component = shallow(<Panel colours={colours} config={testConfig} changeFocus={mockChangeFocusFunction}/>)
        const instance = component.instance();

        //instance.saveState();
    })
})

