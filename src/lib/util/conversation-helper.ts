
import * as striptags from 'striptags';

export function convertConversation(conversation: string, isPlain: boolean) {
  const regex = /(^[ ]{1,})|([ ]{1,}$)/g;

  const result: string = isPlain ? striptags(conversation) : conversation;

  return result.replace(regex, '');
}
