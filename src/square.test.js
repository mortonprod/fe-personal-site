import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import Square,{forwardsThreeOrMore,forwardsTwo,defaultModifier} from "./square";

describe("<Square/>", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(
            <Square>
            </Square>, 
        div);
    });
    it("default modifer output correct", ()=>{
        let testMod1 = ["square__layer--zIndex2","square__layer--zIndex1","","",""]
        let testMod2 = ["square__layer--zIndex2","square__layer--zIndex1",""]
        let modifiers1 = defaultModifier(["test","test","test","test"]);
        let modifiers2 = defaultModifier(["test","test"]);
        expect(modifiers1).toEqual(testMod1);
        expect(modifiers2).toEqual(testMod2);
    });
    it("forwardsTwo output correct", ()=>{
        let modifiers = defaultModifier(["test"]);
        let obj = forwardsTwo(0,modifiers);
        expect(obj.initial).toEqual(["square__layer--zIndex2 square__layer--moveUp","square__layer--zIndex1"]);
        expect(obj.final).toEqual(["","square__layer--zIndex2"]);
        ///Use new modifer final so we are on the last element
        let obj1 = forwardsTwo(1,obj.final);
        expect(obj1.initial).toEqual(["" , "square__layer--zIndex2 square__layer--moveUp"]);
        expect(obj1.final).toEqual(["square__layer--zIndex2",""]);
    });
    it("forwardsThreeOrMore output correct with three layers", ()=>{
        let modifiers = defaultModifier(["test","test","test"]);
        let obj = forwardsThreeOrMore(0,modifiers);
        expect(obj.initial).toEqual(["square__layer--zIndex2 square__layer--moveUp","square__layer--zIndex1","",""]);
        expect(obj.final).toEqual(["","square__layer--zIndex2","square__layer--zIndex1",""]);
        let obj1 = forwardsThreeOrMore(1,obj.final);
        expect(obj1.initial).toEqual(["","square__layer--zIndex2 square__layer--moveUp","square__layer--zIndex1",""]);
        expect(obj1.final).toEqual(["","","square__layer--zIndex2","square__layer--zIndex1"]);
        let obj2 = forwardsThreeOrMore(2,obj1.final);
        expect(obj2.initial).toEqual(["","","square__layer--zIndex2 square__layer--moveUp","square__layer--zIndex1"]);
        expect(obj2.final).toEqual(["square__layer--zIndex1","","","square__layer--zIndex2"]);
        let obj3 = forwardsThreeOrMore(3,obj2.final);
        expect(obj3.initial).toEqual(["square__layer--zIndex1","","","square__layer--zIndex2 square__layer--moveUp"]);
        expect(obj3.final).toEqual(["square__layer--zIndex2","square__layer--zIndex1","",""]);
        expect(obj3.final).toEqual(modifiers);

    });
});