import { assert } from 'chai';
import * as _ from 'underscore';
import { AssertTypes } from '../enums/assert-types';
import { IOutputSpeech } from '../models/output-speech';
import { getOutputSpeech } from '../response/get-response-output-speech';
import { ITestScenario } from './test-scenario';

export function assertSpeech(assertType: AssertTypes, scenario: ITestScenario, isPlain: boolean, expected: IOutputSpeech) {
  const actual = getOutputSpeech(scenario, isPlain);
  const typeName = assertType.toString();

  if (!_.isEmpty(expected.speech)) {
    it(`speech ${typeName}: ${expected.speech}`, () => {
      assertByType(assertType, String(actual.speech), String(expected.speech));
    });
  }

  if (!_.isEmpty(expected.reprompt)) {
    it(`reprompt ${typeName}: ${expected.reprompt}`, () => {
      assertByType(assertType, String(actual.reprompt), String(expected.reprompt));
    });
  }
}

function assertByType(assertType: AssertTypes, actual: string, expected: string) {
  switch (assertType) {
    case AssertTypes.Equal:
      assert.equal(actual, expected);
      break;
    case AssertTypes.NotEqual:
      assert.notEqual(actual, expected);
      break;
    case AssertTypes.Contains:
      assert.include(actual, expected);
      break;
    case AssertTypes.Matches:
      assert.match(actual, new RegExp(expected));
      break;
    case AssertTypes.DoesNotMatch:
      assert.notMatch(actual, new RegExp(expected));
      break;
    case AssertTypes.StartsWith:
      assert.match(actual, new RegExp(`^${expected.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')}`));
      break;
    case AssertTypes.EndsWith:
      assert.match(actual, new RegExp(`${expected.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')}$`));
      break;
    default:
      break;
  }
}
