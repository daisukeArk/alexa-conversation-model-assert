import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';

export interface IConversationCondition {
  handler: LambdaHandler;
  request?: {
    locale?: string;
  };
  skillId?: string;
  testDescription: string;
  isEnabledTrace?: boolean;
}
