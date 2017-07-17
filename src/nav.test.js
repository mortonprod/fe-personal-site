import React from 'react';
import ReactDOM from 'react-dom';
import {
  MemoryRouter as Router,
} from 'react-router-dom'
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import Nav from './nav';

describe("<Nav/>", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Router><Nav/></Router>, div);
    })
    it("it mounts with header", ()=>{
        const wrapper = mount(<Router><Nav/></Router>);
        expect(wrapper.find(".nav__header").length).toBe(1);
    })
    it("props set correctly", ()=>{
        const wrapper = mount(<Router><Nav links={[{name:"Home",location:"/"}]}/></Router>);
        expect(wrapper.props().children.props.links[0].name).toBe("Home");
        expect(wrapper.props().children.props.links[0].location).toBe("/");
    })
});