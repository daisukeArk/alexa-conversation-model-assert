import * as AskModel from 'ask-sdk-model';

export interface ITestScenario {
  intentName: string;
  asserts: any[];
  envelope?: AskModel.ResponseEnvelope;
}
