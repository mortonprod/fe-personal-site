import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import Share from './share';

describe("<Share/>", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Share/>, div);
    })
    it("render props correctly", ()=>{
        const wrapper = mount(<Share title="test"/>);
        expect(wrapper.props().title).toBe('test');
        expect(wrapper.props().description).toBe('A web developer based in Glasgow Scotland');

    });

});