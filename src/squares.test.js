import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import Squares from "./squares";

describe("<Squares/>", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(
            <Squares>
            </Squares>, 
        div);
    })
    it('renders right and left when specified ', () => {
        const wrapper = shallow(
            <Squares isLeft={false} isShow={false}>
                <div>
                    <div>
                        <div></div>
                    </div>
                </div>
                <div>
                    <div></div>
                </div>
                <div></div>
                <div></div>
            </Squares>

        );
        expect(wrapper.find(".squares--left").length).toBe(0);
        expect(wrapper.find(".squares--right").length).toBe(1);

        const wrapper2 = shallow(
            <Squares isLeft={true} isShow={false}>
                <div>
                    <div>
                        <div></div>
                    </div>
                </div>
                <div>
                    <div></div>
                </div>
                <div></div>
                <div></div>
            </Squares>

        );
        expect(wrapper2.find(".squares--left").length).toBe(1);
        expect(wrapper2.find(".squares--right").length).toBe(0);
    });

    it('shows when isShow true ', () => {
        const wrapper = shallow(
            <Squares isLeft={false} isShow={true}>
                <div>
                    <div>
                        <div></div>
                    </div>
                </div>
                <div>
                    <div></div>
                </div>
                <div></div>
                <div></div>
            </Squares>

        );
        expect(wrapper.find(".squares--left").length).toBe(0);
        expect(wrapper.find(".squares--right").length).toBe(0);
       // expect(wrapper.find(".square").length).toBe(4);
    });

});