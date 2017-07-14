import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import FadeBackground from "./fadeBackground";

describe("<FadeBackground/>", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(
            <FadeBackground>
                <div className={""} style={{width:'1000px',height:"1000px"}}></div>
            </FadeBackground>, 
        div);
    });
    it('calls componentDidMount', () => {
        sinon.spy(FadeBackground.prototype, 'componentDidMount');
        const wrapper = mount(            
            <FadeBackground>
                <div className={""} style={{width:'1000px',height:"1000px"}}></div>
            </FadeBackground>
        );
        expect(FadeBackground.prototype.componentDidMount.calledOnce).toBe(true);
    });
});