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

  if (
    scenario.envelope.response.card
  ) {
    switch (scenario.envelope.response.card.type) {
      case 'Simple':
        if (scenario.envelope.response.card.title !== undefined) {
          result.cardTitle = scenario.envelope.response.card.title;
        }
        if (scenario.envelope.response.card.content !== undefined) {
          result.cardContent = scenario.envelope.response.card.content;
        }
        break;
      case 'Standard':
        if (scenario.envelope.response.card.title !== undefined) {
          result.cardTitle = scenario.envelope.response.card.title;
        }
        if (scenario.envelope.response.card.text !== undefined) {
          result.cardContent = scenario.envelope.response.card.text;
        }
        if (
          scenario.envelope.response.card.image !== undefined &&
          scenario.envelope.response.card.image.smallImageUrl !== undefined
        ) {
          result.cardSmallImageUrl = scenario.envelope.response.card.image.smallImageUrl;
        }
        if (
          scenario.envelope.response.card.image !== undefined &&
          scenario.envelope.response.card.image.largeImageUrl !== undefined
        ) {
          result.cardLargeImageUrl = scenario.envelope.response.card.image.largeImageUrl;
        }
        break;
      default:
        break;
    }
  }

  return result;
}
