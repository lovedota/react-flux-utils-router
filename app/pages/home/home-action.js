import { dispatch } from 'dispatcher';

let HomeAction = {
    increment() {
        dispatch({ type: 'home/increment' });
    },

    decrement() {
        dispatch({ type: 'home/decrement' });
    }
};

export default HomeAction;