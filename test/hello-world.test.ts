import * as Conversation from '../src/index';
import { handler } from './skills/hello-world';

const condition: Conversation.IConversationCondition = {
  handler: handler,
  request: {
    locale: 'ja-JP'
  },
  testDescription: 'hello-world'
};

const scenario = Conversation.init(condition);

scenario
  .requestIntent('LanuchRequest')
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
