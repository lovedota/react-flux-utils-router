import Immutable from 'immutable';
import { MapStore } from 'flux-utils';
import dispatcher from 'dispatcher';

class AboutStore extends MapStore {
    getInitialState() {
        return Immutable.Map({
            recentlyCancelDate: null,
            recentlyOpenDate: null
        });
    }

    reduce(state, action) {
        switch (action.type) {
            case 'about/modal/cancel':
                return state.set('recentlyCancelDate', new Date());
                
            case 'about/modal/open':
                return state.set('recentlyOpenDate', new Date());

            default:
                return state;
        }
    }
}

export default new AboutStore(dispatcher);