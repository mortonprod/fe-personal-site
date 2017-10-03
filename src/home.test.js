import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme'; 
import Squares from "./squares";
import Clouds from "./clouds";
import sinon from 'sinon';
import Home from './Home';


describe("<Home/>", ()=>{
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Home />, div);
    });
    it('correctly sets isShow to 1 after component did mount', () => {
        const wrapper = mount(<Home/>);
        expect(wrapper.state("isShow").length).toBe(1);
    });
    it('calls componentDidMount() lifecycle method', () => {
        const componentDidMountSpy = sinon.spy(Home.prototype, 'componentDidMount');
        const wrapper = mount(<Home />);

        expect(Home.prototype.componentDidMount.calledOnce).toBe(true);

        componentDidMountSpy.restore();
    });
});