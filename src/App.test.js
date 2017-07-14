import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import FadeBackground from "./fadeBackground"; 
import Squares from "./squares";
import Clouds from "./clouds";
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
	    expect(wrapper.find(FadeBackground).length).toBe(1);
	    expect(wrapper.find(Squares).length).toBe(3);
	    expect(wrapper.find(Clouds).length).toBe(1);
    });
    it('correctly sets isShow to 0 before component did mount', () => {
        const wrapper = mount(<App/>);
        expect(wrapper.state("isShow").length).toBe(0);
    });
    it('calls componentDidMount() lifecycle method', () => {
        const componentDidMountSpy = sinon.spy(App.prototype, 'componentDidMount');
        const wrapper = mount(<App />);

        expect(App.prototype.componentDidMount.calledOnce).toBe(true);

        componentDidMountSpy.restore();
    });
});
