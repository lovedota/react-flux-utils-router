import React, {Component} from 'react';
import Spinner from './spinner';

class BootLoader extends Component {
    constructor(props) {
        super(props);

        this.props.bundle(file => {
            this.setState({ComponentModule: file.default});
        });

        this.state = {ComponentModule: null};
    }

    render() {
        const {ComponentModule} = this.state;

        if (ComponentModule) {
            return <ComponentModule {...this.props} />
        }

        return <Spinner />
    }
}

export default BootLoader;
