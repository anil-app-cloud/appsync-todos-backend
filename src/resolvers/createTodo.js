
import {util} from '@aws-appsync/utils'
export function request(ctx) {
    console.log("request from createUser", ctx)
    const { name, priority,status } = ctx.arguments.user_input;
    const id = util.autoId();
  
    return {
      operation: 'PutItem',
      key: {
        'id': { 'S': id }
      },
      attributeValues: {
        'name': { 'S': name },
        'priority': {'S': priority },
        'status': {BOOL: status }
      }
    };
}

export function response(ctx) {
    return ctx.result;
}