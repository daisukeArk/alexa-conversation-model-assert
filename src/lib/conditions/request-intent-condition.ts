import * as AskModel from 'ask-sdk-model';

export interface IRequestIntentCondition {
  context?: {
    System?: {
      application?: AskModel.Application,
      device?: AskModel.Device,
      user?: AskModel.User;
      apiAccessToken?: string;
    }
  };
  request?: {
    dialogState?: AskModel.DialogState;
    intent?: {
      confirmationStatus?: AskModel.IntentConfirmationStatus
      slots?: {
        [key: string]: AskModel.Slot
      }
    },
    requestId?: string
  };
  session?: {
    newSession?: boolean,
    sessionId?: string,
    application?: AskModel.Application,
    user?: AskModel.User
  };
  slots?: {
    [key: string]: AskModel.Slot
  };
}
