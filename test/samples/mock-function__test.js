//import Rectangle from '@utils/rectangle';

function hello(name, cb) {
    cb('hello ' + name);
}

//let rectangle = new Rectangle(1, 2);
//https://github.com/sinonjs/sinon/pull/692
class TestClass {
    get foo() {
        return 'foo';
    }

    bar() {
        return 'bar';
    }

    doTimeout(timeout) {
        setTimeout(() => console.log('hello timer'), timeout);
    }
}

let obj,
    clock;

describe('MockingFunction', function() {
    beforeEach(() => {
        obj = new TestClass();
    });

    before(() => {
        clock = sinon.useFakeTimers();
    });

    after(() => {
        clock.restore();
    });

    describe('Stubing', () => { //spy a function but call fake
        it('should mock getter', () => {
            let stubGetter = sinon.stub(obj, 'foo', {
                get: () => {
                    return 'foo stubbed';
                }
            });

            expect(obj.foo).to.equal('foo stubbed');

            stubGetter.restore();

            expect(obj.foo).to.equal('foo');
        });

        it('should mock function', () => {
            let stubFunction = sinon.stub(obj, 'bar', () => 'bar stubbed');

            expect(obj.bar()).to.equal('bar stubbed');

            stubFunction.restore();

            expect(obj.bar()).to.equal('bar');
        });
    });

    describe('Spying', () => { //spy a function but call through
        it('should create an empty spy', function() {
            var cb = sinon.spy();

            hello('foo', cb);

            expect(cb).to.have.been.calledWith('hello foo');
        });

        it('should create spy on existing function', function() {
            var spy = sinon.spy(console, 'log'),
                timeout = 5000;

            obj.doTimeout(timeout);

            clock.tick(timeout);

            expect(spy).to.have.been.calledWith('hello timer');
        });
    });
});