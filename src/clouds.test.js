import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import Clouds from "./clouds";
import Cloud from "./cloud";


describe("<Clouds/>", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(
	        <Clouds>
                <div className={""} style={{width:'1000px',height:"1000px"}}></div>
	        </Clouds>, 
        div);
    });
    it('renders three clouds when passed via props', () => {
        let clouds = [
            {top:"10%",left:"0",width:"10%",period:1000,delay:1000,isRight:true,isSlow:false},
            {top:"10%",left:"0",width:"10%",period:1000,delay:1000,isRight:false,isSlow:true},
            {top:"10%",left:"0",width:"10%",period:1000,delay:1000,isRight:true,isSlow:true}
        ]
        const wrapper = shallow(
            <Clouds clouds={clouds}>
                <div className={""} style={{width:'1000px',height:"1000px"}}></div>
            </Clouds>

        );
        expect(wrapper.find(Cloud).length).toBe(3);
        expect(wrapper.find(".clouds__cloud--right").length).toBe(1);
        expect(wrapper.find(".clouds__cloud--leftSlow").length).toBe(1);
        expect(wrapper.find(".clouds__cloud--rightSlow").length).toBe(1);
    });


    it('renders 10 random clouds when no clouds passed', () => {
        const wrapper = shallow(
            <Clouds>
                <div className={""} style={{width:'1000px',height:"1000px"}}></div>
            </Clouds>

        );
        expect(wrapper.find(Cloud).length).toBe(10);
    });



    it('creates the child component', () => {
        let clouds = [
            {top:"10%",left:"0",width:"10%",period:1000,delay:1000,isRight:true,isSlow:true},
            {top:"10%",left:"0",width:"10%",period:1000,delay:1000,isRight:false,isSlow:false},
            {top:"10%",left:"0",width:"10%",period:1000,delay:1000,isRight:true,isSlow:true}
        ]
        const wrapper = shallow(
            <Clouds clouds={clouds}>
                <div className={"testChild"} style={{width:'1000px',height:"1000px"}}></div>
            </Clouds>

        );
        expect(wrapper.find(".testChild").length).toBe(1);
    });
});