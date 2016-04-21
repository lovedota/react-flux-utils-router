import React from 'react';
import { shallow, mount } from 'enzyme';
import MainComponent from './rewire-component/main-component';

import SingleTonUtils from './rewire-component/singleton-utils';

describe('Rewire', () => {
    describe('ReactComponent', () => {
        it('should test it', () => {
            expect(<MainComponent/>).to.be.jsx;
            expect('<MainComponent/>').not.to.be.jsx;
        });

        it('should rewire child component', () => {
            MainComponent.__Rewire__('ChildComponent', React.createClass({
                render() {
                    return <p>Rewire</p>;
                }
            }));

            let component = mount(<MainComponent />);

            expect(component.html()).to.equal('<div class="main"><h1>Hello</h1><p>Rewire</p></div>');

            MainComponent.__ResetDependency__('ChildComponent');

            component = mount(<MainComponent />);

            expect(component.html()).to.equal('<div class="main"><h1>Hello</h1><p>Children</p></div>');
        });

        it('should use jsx expect', () => {
            let ChildComponent = () => {
                return <p>Rewire</p>;
            },
                component;

            MainComponent.__Rewire__('ChildComponent', ChildComponent);

            component = shallow(<MainComponent />);

            expect(component.node).to.deep.equal(
                <div className="main">
                    <h1>Hello</h1>
                    <ChildComponent />
                </div>
            );
        });
    });

    describe('SingleTonObject', () => {
        beforeEach(() => {
            SingleTonUtils.__set__('count');    
        });
        
        it('Could increase value', () => {
            SingleTonUtils.increase();
            expect(SingleTonUtils.count).to.equal(2);
        });

        it('Could decrease value', () => {
            SingleTonUtils.decrease();
            expect(SingleTonUtils.count).to.equal(0);
        });
    });
});