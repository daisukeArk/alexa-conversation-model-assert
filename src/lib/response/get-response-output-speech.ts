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
    (scenario.envelope.response.outputSpeech.type === 'SSML') ?
      scenario.envelope.response.outputSpeech.ssml :
      scenario.envelope.response.outputSpeech.text,
    isPlain
  );

  if (
    scenario.envelope.response.reprompt &&
    scenario.envelope.response.reprompt.outputSpeech
  ) {
    result.reprompt = ConversationHelper.convertConversation(
      (scenario.envelope.response.reprompt.outputSpeech.type === 'SSML') ?
      scenario.envelope.response.reprompt.outputSpeech.ssml :
      scenario.envelope.response.reprompt.outputSpeech.text,
      isPlain
    );
  }

  return result;
}
