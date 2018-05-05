import * as AskModel from 'ask-sdk-model';
import { ITestScenario } from '../conversation/test-scenario';
import { IOutputSpeech } from '../models/output-speech';
import * as ConversationHelper from '../util/conversation-helper';

export function getOutputSpeech(
  scenario: ITestScenario,
  isPlain: boolean
): IOutputSpeech {
  const result: IOutputSpeech = {};

  if (
    scenario.envelope === undefined ||
    scenario.envelope.response.outputSpeech === undefined
  ) {
    return result;
  }

  result.speech = ConversationHelper.convertConversation(
    (<AskModel.ui.SsmlOutputSpeech>scenario.envelope.response.outputSpeech).ssml,
    isPlain
  );

  if (
    scenario.envelope.response.reprompt &&
    scenario.envelope.response.reprompt.outputSpeech
  ) {
    result.reprompt = ConversationHelper.convertConversation(
      (<AskModel.ui.SsmlOutputSpeech>scenario.envelope.response.reprompt.outputSpeech).ssml,
      isPlain
    );
  }

  return result;
}
