import { IConversationCondition } from './lib/conditions/conversation-condition';
import { ConversationFactory } from './lib/conversation/conversation-factory';

export {
  IConversationCondition
};

export const init = ConversationFactory.init;
