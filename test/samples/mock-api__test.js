
let action = {
    init() {
        return $.getJSON('mock-api.json')
            .done(json => {
                console.log(json);
            })
            .fail((error) => {
                console.error(error.responseJSON);
            });
    },

    interval() {
        setTimeout(() => {
            $.getJSON('mock-api.json')
                .done(json => {
                    console.log(json);
                })
                .fail((error) => {
                    console.error(error.responseJSON);
                })
                .always(action.interval);
        }, 5000);
    }
},
    fixture = require('@fixtures/sample-mock.json'),
    server,
    spy,
    clock;

describe('MockApiRequest', function() {
    before(() => {
        server = sinon.fakeServer.create();
        spy = sinon.stub(console);
    });

    after(() => {
        server.restore();
        spy.log.restore();
        spy.error.restore();
    });

    before(() => {
        clock = sinon.useFakeTimers();
    });

    after(() => {
        clock.restore();
    });

    it('should mock success calling api', () => {
        server.respondWith('GET', 'mock-api.json', JSON.stringify(fixture));
        action.init();
        server.respond();

        expect(spy.log).to.have.been.calledWith(fixture);
    });

    it('should mock fail calling api', () => {
        let error = {
            code: 400,
            message: 'Invalid Data'
        };

        server.respondWith('GET', 'mock-api.json', [400, { 'Content-Type': 'application/json' }, JSON.stringify(error)]);
        action.init();
        server.respond();

        expect(spy.error).to.have.been.calledWith(error);
    });

    it('should mock with timer and recursive call after server responded', () => {
        let response = {
            id: 1,
            name: 'name'    
        },
        spyInterval = sinon.spy(action, 'interval');
        
        server.respondWith('GET', 'mock-api.json', JSON.stringify(response));
        
        //1. call action
        action.interval();
        //2. simulate timeout
        clock.tick(5000);
        //3. simulate server responded
        server.respond();
        
        expect(spy.log).to.have.been.calledWith(response);
        expect(spyInterval).to.have.been.calledTwice;
    });
});