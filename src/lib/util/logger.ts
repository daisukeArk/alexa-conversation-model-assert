import colors = require('colors/safe');

export function fatal(reason: any) {
  console.log(colors.red(`[FATAL]: ${reason}`));
}

export function error(reason: any) {
  console.log(colors.red(`[ERROR]: ${reason}`));
}

export function info(reason: any) {
  console.log(colors.green(`[INFO]: ${reason}`));
}

export function trace(reason: any) {
  console.log(colors.blue(`[TRACE]: ${reason}`));
}
