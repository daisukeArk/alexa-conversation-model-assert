import * as AskModel from 'ask-sdk-model';
import { IConversationCondition } from '../conditions/conversation-condition';
import { IRequestIntentCondition } from '../conditions/request-intent-condition';
import * as Logger from '../util/logger';
import { IRequestBuilder } from './request-builder';

export class RequestFactory {
  private constructor() { }

  public static init(condition: IConversationCondition): IRequestBuilder {

    function buildRequest(intentName: string, conditionRequest?: IRequestIntentCondition): AskModel.Request {
      let model: AskModel.Request;

      switch (intentName) {
        case 'LaunchRequest':
          model = {
            type: 'LaunchRequest',
            requestId: (
              conditionRequest &&
              conditionRequest.request &&
              conditionRequest.request.requestId
            ) ? conditionRequest.request.requestId : '',
            timestamp: (new Date()).toISOString(),
            locale: (condition.request !== undefined && condition.request.locale) ? condition.request.locale : 'en-US'
          };
          break;
        case 'SessionEndedRequest':
          model = {
            type: 'SessionEndedRequest',
            requestId: (
              conditionRequest &&
              conditionRequest.request &&
              conditionRequest.request.requestId
            ) ? conditionRequest.request.requestId : '',
            timestamp: (new Date()).toISOString(),
            locale: (condition.request !== undefined && condition.request.locale) ? condition.request.locale : 'en-US',
            reason: 'USER_INITIATED'
          };
          break;
        default:
          model = {
            type: 'IntentRequest',
            requestId: (
              conditionRequest &&
              conditionRequest.request &&
              conditionRequest.request.requestId
            ) ? conditionRequest.request.requestId : '',
            timestamp: (new Date()).toISOString(),
            locale: (condition.request !== undefined && condition.request.locale) ? condition.request.locale : 'en-US',
            dialogState: (conditionRequest && conditionRequest.request && conditionRequest.request.dialogState) ?
              conditionRequest.request.dialogState : 'COMPLETED',
            intent: {
              name: intentName,
              confirmationStatus: (
                conditionRequest &&
                conditionRequest.request &&
                conditionRequest.request.intent &&
                conditionRequest.request.intent.confirmationStatus
              ) ? conditionRequest.request.intent.confirmationStatus : 'CONFIRMED'
            }
          };

          if (
            conditionRequest &&
            conditionRequest.slots
          ) {
            Logger.warn('Deprecated: slots will remove in a future version. Please use "intent.slots".');
            model.intent.slots = conditionRequest.slots;
          }

          if (
            conditionRequest &&
            conditionRequest.request &&
            conditionRequest.request.intent &&
            conditionRequest.request.intent.slots
          ) {
            model.intent.slots = conditionRequest.request.intent.slots;
          }

          break;
      }

      return model;
    }

    return {
      build(
        intentName: string,
        conditionRequest?: IRequestIntentCondition,
        previousEnvelope?: AskModel.ResponseEnvelope
      ): AskModel.RequestEnvelope {
        const request = buildRequest(intentName, conditionRequest);

        return {
          version: '1.0',
          session: {
            new: (
              conditionRequest &&
              conditionRequest.session &&
              conditionRequest.session.newSession
            ) ? conditionRequest.session.newSession : true,
            sessionId: (
              conditionRequest &&
              conditionRequest.session &&
              conditionRequest.session.sessionId
            ) ? conditionRequest.session.sessionId : '',
            application: {
              applicationId: (
                condition &&
                condition.skillId
              ) ? condition.skillId : ''
            },
            attributes: previousEnvelope ? previousEnvelope.sessionAttributes : {},
            user: (
              conditionRequest &&
              conditionRequest.session &&
              conditionRequest.session.user
            ) ? conditionRequest.session.user : { userId: '' }
          },
          context: {
            System: {
              application: {
                applicationId: (
                  condition &&
                  condition.skillId
                ) ? condition.skillId : ''
              },
              user: (
                conditionRequest &&
                conditionRequest.context &&
                conditionRequest.context.System &&
                conditionRequest.context.System.user
              ) ? conditionRequest.context.System.user : { userId: '' },
              device: (
                conditionRequest &&
                conditionRequest.context &&
                conditionRequest.context.System &&
                conditionRequest.context.System.device
              ) ? conditionRequest.context.System.device : { deviceId: '', supportedInterfaces: {} },
              apiEndpoint: 'https://api.fe.amazonalexa.com'
            }
          },
          request: request
        };
      }
    };
  }
}
