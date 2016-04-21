import PromiseMock from 'promise-mock-test';

let dispatcher = {
    dispatch(action) {
        console.log(action);
    }
};

let api = {
    getFoo() {
        return Promise.resolve({ id: 1 });
    },

    getBar() {
        return Promise.resolve({ id: 2 });
    },

    getDuck() {
        return Promise.resolve({ id: 3 });
    }
};

let action = {
    init() {
        let promise1 = api.getFoo(),
            promise2 = api.getBar(),
            promise3 = api.getDuck();

        return Promise.all([
            promise1,
            promise2,
            promise3
        ]).then(([foo, bar, duck]) => {
            dispatcher.dispatch({
                type: 'success',
                foo,
                bar,
                duck
            });
        }).catch((error) => {
            dispatcher.dispatch({
                type: 'error',
                error
            });
        });
    }
};

describe('MockingFunction', function () {
    let spyFoo = sinon.stub(api, 'getFoo'),
        spyBar = sinon.stub(api, 'getBar'),
        spyDuck = sinon.stub(api, 'getDuck');

    before(() => {
        sinon.stub(dispatcher, 'dispatch');
    });
     
    beforeEach(() => {
        PromiseMock.install();
        
        dispatcher.dispatch.reset();
    });

    afterEach(function () {
        PromiseMock.uninstall();
    });

    describe.only('Promise All', () => { //spy a function but call fake
        it('should handle success', () => {
            spyFoo.returns(Promise.resolve({}));
            spyBar.returns(Promise.resolve({}));
            spyDuck.returns(Promise.resolve({}));

            PromiseMock.getResult(action.init());

            expect(dispatcher.dispatch).to.have.been.calledWith({
                type: 'success',
                foo: {},
                bar: {},
                duck: {}
            });
            //return Promise.resolve({ foo: 'bar' }).should.eventually.equal('foo');
            //expect(Promise.resolve({ foo: 'bar' })).to.eventually.have.property('foo').notify(done);
        });

        it('should handle error', () => {
            spyFoo.returns(Promise.resolve({}));
            spyBar.returns(Promise.reject({}));
            spyDuck.returns(Promise.resolve({}));
            
            PromiseMock.getResult(action.init());

            expect(dispatcher.dispatch).to.have.been.calledWith({
                type: 'error',
                error: {}
            });
            //return Promise.resolve({ foo: 'bar' }).should.eventually.equal('foo');
            //expect(Promise.resolve({ foo: 'bar' })).to.eventually.have.property('foo').notify(done);
        });
    });
});