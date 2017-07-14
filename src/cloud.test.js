import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import Cloud, { removeHide, removeAllHide } from './cloud';




let hide =[ "cloud__layer--hide","cloud__layer--hide","cloud__layer--hide","cloud__layer--hide" ]; 
let startState = { hide:hide };
describe("<Cloud/>", ()=>{
	it("renders without crashing", ()=>{
	    const div = document.createElement('div');
	    ReactDOM.render(<Cloud period={1000} delay={1000}/>, div);
	})


	it("removes hide class ",()=>{
	    expect(removeHide(0,startState)).toEqual({hide: [ "","cloud__layer--hide","cloud__layer--hide","cloud__layer--hide" ]});
	    expect(removeHide(1,startState)).toEqual({hide: [ "cloud__layer--hide","","cloud__layer--hide","cloud__layer--hide" ]});
	});


	it("exposes four layers",()=>{
        jest.useFakeTimers();
        var cb = jest.fn();
	    removeAllHide(100,100,startState,cb);
	    expect(setTimeout.mock.calls.length).toBe(3);
        expect(cb).not.toBeCalled();
        jest.runAllTimers();
        expect(cb.mock.calls.length).toBe(3);
	});
    

	it('starts with layer and hide class on all images', () => {
	    const wrapper = shallow(<Cloud period={1000} delay={1000} />);
	    expect(wrapper.find(".cloud__layer").length).toBe(4);
	    expect(wrapper.find(".cloud__layer--hide").length).toBe(4);
	});

	it('calls componentDidMount', (done) => {
        //jest.useFakeTimers();
		sinon.spy(Cloud.prototype, 'componentDidMount');
		const wrapper = mount(<Cloud period={100} delay={100} />);
		expect(Cloud.prototype.componentDidMount.calledOnce).toBe(true);
        setTimeout(()=>{
            wrapper.update();
            expect(wrapper.find(".cloud__layer--hide").length).toBe(0);
            done();
        },1000);
        jest.runAllTimers();
	});
});