import jsxChai from 'jsx-chai';
import chaiAsPromised from 'chai-as-promised';
import 'jquery';

chai.use(jsxChai);
chai.use(chaiAsPromised);

var testsContext = require.context('.', true, /__test$/);
testsContext.keys().forEach(testsContext);
