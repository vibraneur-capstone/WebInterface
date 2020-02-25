import React from 'react';
import ReactDOM from 'react-dom';
jest.unmock('react-plotly.js');

import App from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter() });

it('renders without crashing', () => {
  const component = shallow(<App/>);
  expect(component).toMatchSnapshot();
});
