import * as AskModel from 'ask-sdk-model';
import { assert } from 'chai';
import * as Colors from 'colors/safe';
import * as Util from 'util';
import { IConversationCondition } from '../conditions/conversation-condition';
import { IRequestIntentCondition } from '../conditions/request-intent-condition';
import { AssertTypes } from '../enums/assert-types';
import { IOutputSpeech } from '../models/output-speech';
import { RequestFactory } from '../request/request-factory';
import * as Logger from '../util/logger';
import * as AssertHelper from './assert-helper';
import { IConversationBuilder } from './conversation-builder';
import * as RunHandler from './run-handler';
import * as TestExecuter from './test-executer';
import { ITestScenario } from './test-scenario';

export class ConversationFactory {
  private constructor() { }

  public static init(condition: IConversationCondition): IConversationBuilder {
    const scenarios: ITestScenario[] = [];
    let requestIntentIndex: number = -1;
    const requestBuilder = RequestFactory.init(condition);
    let promises = Promise.resolve<AskModel.ResponseEnvelope>({ version: '1.0', response: {} });

    return {
      requestIntent(intentName: string, conditionRequest?: IRequestIntentCondition): IConversationBuilder {
        requestIntentIndex++;
        scenarios[requestIntentIndex] = scenarios[requestIntentIndex] || { asserts: [] };

        const currentIndex = requestIntentIndex;

        promises = promises
          .then(async (previousEnvelope: AskModel.ResponseEnvelope): Promise<AskModel.ResponseEnvelope> => {
            if (condition.isEnabledTrace) {
              Logger.trace(`\npreviousEnvelope:\n${Util.inspect(previousEnvelope, { depth: null })}`);
            }

            const request = requestBuilder.build(intentName, conditionRequest, previousEnvelope);

            if (condition.isEnabledTrace) {
              Logger.trace(`\nrequest:\n${Util.inspect(request, { depth: null })}`);
            }

            const envelope = await RunHandler.runAsync(condition.handler, request);

            if (condition.isEnabledTrace) {
              Logger.trace(`\nenvelope: \n${Util.inspect(envelope, { depth: null })}`);
            }

            Object.assign(scenarios[currentIndex], { intentName, envelope });
            return envelope;
          });

        return this;
      },
      equalPlain(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.Equal, scenario, true, expected);
        });
        return this;
      },
      equalSsml(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.Equal, scenario, false, expected);
        });
        return this;
      },
      notEqualPlain(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.NotEqual, scenario, true, expected);
        });
        return this;
      },
      notEqualSsml(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.NotEqual, scenario, false, expected);
        });
        return this;
      },
      containsPlain(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.Contains, scenario, true, expected);
        });
        return this;
      },
      containsSsml(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.Contains, scenario, false, expected);
        });
        return this;
      },
      matchesPlain(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.Matches, scenario, true, expected);
        });
        return this;
      },
      matchesSsml(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.Matches, scenario, false, expected);
        });
        return this;
      },
      doesNotMatchPlain(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.DoesNotMatch, scenario, true, expected);
        });
        return this;
      },
      doesNotMatchSsml(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.DoesNotMatch, scenario, false, expected);
        });
        return this;
      },
      startsWithPlain(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.StartsWith, scenario, true, expected);
        });
        return this;
      },
      startsWithSsml(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.StartsWith, scenario, false, expected);
        });
        return this;
      },
      endsWithPlain(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.EndsWith, scenario, true, expected);
        });
        return this;
      },
      endsWithSsml(expected: IOutputSpeech): IConversationBuilder {
        scenarios[requestIntentIndex].asserts.push((scenario: ITestScenario): void => {
          AssertHelper.assertSpeech(AssertTypes.EndsWith, scenario, false, expected);
        });
        return this;
      },
      end(): void {
        describe(`Description: ${condition.testDescription}`, () => {
          it('executed', async () => {
            try {
              await promises;
            } catch (error) {
              Logger.error(error);
              return;
            }

            TestExecuter.execute(condition.testDescription, scenarios);
          });
        });
      }
    };
  }
}
