import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import * as AskModel from 'ask-sdk-model';

export function runAsync(
  handler: LambdaHandler,
  event: AskModel.RequestEnvelope
): Promise<AskModel.ResponseEnvelope> {
  return new Promise((resolve: any, reject: any) => {
    handler(event, {}, (err: Error, result?: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
