import { IRequestIntentCondition } from '../conditions/request-intent-condition';
import { IOutputSpeech } from '../models/output-speech';

export interface IConversationBuilder {
  requestIntent(intentName: string, condition?: IRequestIntentCondition): this;
  equalPlain(expected: IOutputSpeech): this;
  equalSsml(expected: IOutputSpeech): this;
  notEqualPlain(expected: IOutputSpeech): this;
  notEqualSsml(expected: IOutputSpeech): this;
  containsPlain(expected: IOutputSpeech): this;
  containsSsml(expected: IOutputSpeech): this;
  matchesPlain(expected: IOutputSpeech): this;
  matchesSsml(expected: IOutputSpeech): this;
  doesNotMatchPlain(expected: IOutputSpeech): this;
  doesNotMatchSsml(expected: IOutputSpeech): this;
  startsWithPlain(expected: IOutputSpeech): this;
  startsWithSsml(expected: IOutputSpeech): this;
  endsWithPlain(expected: IOutputSpeech): this;
  endsWithSsml(expected: IOutputSpeech): this;
  end(): void;
}
