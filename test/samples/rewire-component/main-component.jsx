import ChildComponent from './child-component';

import React, {Component} from 'react';

class MainComponent extends Component {
    render() {
        return (
            <div className="main">
                <h1>Hello</h1>
                <ChildComponent />
            </div>
        );
    }
};

export default MainComponent;