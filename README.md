# Test framework for Amazon Alexa Skills Kit SDK v2 for Node.js

ASK SDK for Node.jsの Version 2 のテストフレームワークです。

## Install

```bash
npm install --save-dev alexa-conversation-model-assert
```

## Samples

```typescript
import * as Conversation from 'alexa-conversation-model-assert';
import { handler } from './skills/hello-world/index';

const condition: Conversation.IConversationCondition = {
  handler: handler,
  request: {
    locale: 'en-US'
  },
  testDescription: 'hello-world'
};

Conversation.init(condition)
  // インテントリクエスト
  .requestIntent('LaunchRequest')
  // インテントリクエスト結果のプレーンテキスト完全一致
  .equalPlain({
    speech: 'Welcome to the Alexa Skills Kit, you can say hello!',
    reprompt: 'Welcome to the Alexa Skills Kit, you can say hello!'
  })
  .requestIntent('AMAZON.HelpIntent')
  .equalPlain({
    speech: 'You can say hello to me!',
    reprompt: 'You can say hello to me!'
  })
  .requestIntent('AMAZON.StopIntent')
  .equalPlain({
    speech: 'Goodbye!'
  })
  // 停止インテントリクエストのSSMLテキスト完全一致
  .equalSsml({
    speech: '<speak>Goodbye!</speak>'
  })
  .end();

Conversation.init(condition)
  // インテントリクエスト
  .requestIntent('LaunchRequest')
  .requestIntent('HelloWorldIntent')
  // HelloWorldIntent speech, cardTitle, cardContentの検証
  .equalPlain({
    speech: 'Hello World!',
    cardTitle: 'Hello World',
    cardContent: 'Hello World!'
  })
  .end();

Conversation.init(condition)
  .requestIntent('LaunchRequest')
  // インテント呼出時のスロット値定義
  .requestIntent('RecipeIntent', {
    request: {
      intent: {
        slots: {
          Item: {
            name: 'Item',
            value: 'slot value',
            confirmationStatus: 'CONFIRMED'
          }
        }
      }
    }
  })
  .end();
```

## Conversation Assert

種類 | 概要 |
:-- | :-- |
equalPlain(expected: IOutputSpeech) | プレーンテキストが完全一致することを検証します。
equalSsml(expected: IOutputSpeech) | SSMLが完全一致することを検証します。
notEqualPlain(expected: IOutputSpeech) | プレーンテキストが完全一致しないことを検証します。
notEqualSsml(expected: IOutputSpeech) | SSMLが完全一致しないことを検証します。
containsPlain(expected: IOutputSpeech) | プレーンテキストが部分一致することを検証します。
containsSsml(expected: IOutputSpeech) | SSMLが部分一致することを検証します。
matchesPlain(expected: IOutputSpeech) | プレーンテキストが正規表現と一致することを検証します。
matchesSsml(expected: IOutputSpeech) | SSMLが正規表現と一致することを検証します。
doesNotMatchPlain(expected: IOutputSpeech) | プレーンテキストが正規表現と一致しないことを検証します。
doesNotMatchSsml(expected: IOutputSpeech) | SSMLが正規表現と一致しないことを検証します。
startsWithPlain(expected: IOutputSpeech) | プレーンテキストが前方一致することを検証します。
startsWithSsml(expected: IOutputSpeech) | SSMLが前方一致することを検証します。
endsWithPlain(expected: IOutputSpeech) | プレーンテキストが後方一致することを検証します。
endsWithSsml(expected: IOutputSpeech) | SSMLが後方一致することを検証します。
