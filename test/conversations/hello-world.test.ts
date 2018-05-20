const { handler } = require('../../../samples/hello-world');
import * as Conversation from '../../src/index';

const condition: Conversation.IConversationCondition = {
  handler: handler,
  request: {
    locale: 'en-US'
  },
  testDescription: 'hello-world'
};

Conversation.init(condition)
  .requestIntent('LaunchRequest')
  .equalPlain({
    speech: 'Welcome to the Alexa Skills Kit, you can say hello!',
    reprompt: 'Welcome to the Alexa Skills Kit, you can say hello!'
  })
  .requestIntent('AMAZON.HelpIntent')
  .equalPlain({
    speech: 'You can say hello to me!',
    reprompt: 'You can say hello to me!'
  })
  .requestIntent('AMAZON.StopIntent')
  .equalPlain({
    speech: 'Goodbye!'
  })
  .equalSsml({
    speech: '<speak>Goodbye!</speak>'
  })
  .end();

Conversation.init(condition)
  .requestIntent('LaunchRequest')
  .requestIntent('HelloWorldIntent')
  .equalPlain({
    speech: 'Hello World!',
    cardTitle: 'Hello World',
    cardContent: 'Hello World!'
  })
  .end();
