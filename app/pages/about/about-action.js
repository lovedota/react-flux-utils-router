import { dispatch } from 'dispatcher';

let AboutAction = {
    open() {
        dispatch({ type: 'about/modal/open' });
    },

    cancel() {
        dispatch({ type: 'about/modal/cancel' });
    }
};

export default AboutAction;