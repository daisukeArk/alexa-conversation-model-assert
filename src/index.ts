import { IConversationCondition } from './lib/conditions/conversation-condition';
import { IRequestIntentCondition } from './lib/conditions/request-intent-condition';
import { ConversationFactory } from './lib/conversation/conversation-factory';

export {
  IConversationCondition,
  IRequestIntentCondition
};

export const init = ConversationFactory.init;
