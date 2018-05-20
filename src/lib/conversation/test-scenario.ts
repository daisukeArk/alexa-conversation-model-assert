import * as AskModel from 'ask-sdk-model';

export interface ITestScenario {
  intentName: string;
  asserts: ((scenario: ITestScenario) => void)[];
  envelope?: AskModel.ResponseEnvelope;
}
