import React from 'react';
import ReactDOM from 'react-dom';
import {
  MemoryRouter as Router,
} from 'react-router-dom'
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import Account from './account';

describe("<Account/>", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Account/>, div);
    })
    it("it mounts with user information", ()=>{
        const wrapper = mount(<Router><Account auth={{userProfile:"test"}}/></Router>);
        expect(wrapper.find(".account__welcome").length).toBe(1);
    })
    it("it mounts without user information", ()=>{
        const wrapper = mount(<Router><Account/></Router>);
        expect(wrapper.find(".account__welcome").length).toBe(0);
    })
});