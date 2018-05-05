import * as AskModel from 'ask-sdk-model';
import { IRequestIntentCondition } from '../conditions/request-intent-condition';

export interface IRequestBuilder {
  build(
    intentName: string,
    conditionRequest?: IRequestIntentCondition,
    previousEnvelope?: AskModel.ResponseEnvelope
  ): AskModel.RequestEnvelope;
}
