import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import FadeBackground from "./fadeBackground"; 
import Squares from "./squares";
import Clouds from "./clouds";
import sinon from 'sinon';
import Home from './Home';


describe("<Home/>", ()=>{
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Home />, div);
    });
    it('renders correct number of components', () => {
        const wrapper = shallow(
            <Home/>
        );
        expect(wrapper.find(FadeBackground).length).toBe(1);
        expect(wrapper.find(Squares).length).toBe(3);
        expect(wrapper.find(Clouds).length).toBe(1);
    });
    it('correctly sets isShow to 0 before component did mount', () => {
        const wrapper = mount(<Home/>);
        expect(wrapper.state("isShow").length).toBe(0);
    });
    it('calls componentDidMount() lifecycle method', () => {
        const componentDidMountSpy = sinon.spy(Home.prototype, 'componentDidMount');
        const wrapper = mount(<Home />);

        expect(Home.prototype.componentDidMount.calledOnce).toBe(true);

        componentDidMountSpy.restore();
    });
});