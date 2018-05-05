import * as Colors from 'colors/safe';
import { ITestScenario } from './test-scenario';

export function execute(description: string, tasks: ITestScenario[]) {
  describe('Executing:', () => {
    tasks.forEach(executeStep);
  });
}

function executeStep(scenario: ITestScenario) {
  describe(`RequestIntent: ${Colors.cyan(scenario.intentName)}`, () => {
    if (scenario.asserts) {
      scenario.asserts.forEach((assert) => {
        assert(scenario);
      });
    }
  });
}
