import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import App from './App';


describe("<App/>", ()=>{
	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	});
    it('renders correct number of components', () => {
	    const wrapper = shallow(
            <App/>
	    );
	    expect(wrapper.find(Switch).length).toBe(1);
        expect(wrapper.find(Router).length).toBe(1);
    });
    it('calls componentDidMount() lifecycle method', () => {
        const componentDidMountSpy = sinon.spy(App.prototype, 'componentDidMount');
        const wrapper = mount(<App />);

        expect(App.prototype.componentDidMount.calledOnce).toBe(true);

        componentDidMountSpy.restore();
    });
});
