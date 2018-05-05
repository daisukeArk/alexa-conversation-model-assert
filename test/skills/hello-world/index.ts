import * as Alexa from 'ask-sdk-core';
import * as AlexaModel from 'ask-sdk-model';

const skillBuilder = Alexa.SkillBuilders.custom();

export const handler = skillBuilder
  .addRequestHandlers()
  .addErrorHandlers()
  .lambda();
