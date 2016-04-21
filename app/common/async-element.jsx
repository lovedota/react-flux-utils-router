import React, {Component} from 'react';
import Spinner from './spinner';

class AsyncElement extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            component: null
        };
    }

    componentDidMount() {
        if (!this.state.component) {
            this.bundle((bundle) => {
                this.setState({component: bundle.default});
            });
        }
    }

    render() {
        const Component = this.state.component;

        if (Component) {
            return <Component {...this.props} data={this.state.data}/>;
        }

        return <Spinner />;
    }
}


export default AsyncElement;
