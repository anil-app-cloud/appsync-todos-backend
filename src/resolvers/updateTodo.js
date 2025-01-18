export function request(ctx) {
    console.log("request ctx =========> ", ctx);
    const { user_input } = ctx.arguments;
    const updateExpression = [];
    const expressionNames = {};
    const expressionValues = {};

    if (user_input.name !== undefined && user_input.name !== null) {
        updateExpression.push('#name = :name');
        expressionNames['#name'] = 'name';
        expressionValues[':name'] = { 'S': user_input.name };
    }

    if (user_input.priority !== undefined && user_input.priority !== null) {
        updateExpression.push('#priority = :priority');
        expressionNames['#priority'] = 'priority';
        expressionValues[':priority'] = { 'S': user_input.priority };
    }

    if (typeof user_input.status === 'boolean') {
        updateExpression.push('#status = :status');
        expressionNames['#status'] = 'status';
        expressionValues[':status'] = { BOOL: user_input.status };
    }

 
    return {
        operation: 'UpdateItem',
        key: {
            'id': { 'S': user_input.id },
        },
        update: {
            expression: 'SET ' + updateExpression.join(', '),
            expressionNames: expressionNames,
            expressionValues: expressionValues,
        },
        condition: {
            expression: 'attribute_exists(id)',
        },
    };
}

export function response(ctx) {
    return ctx.result;
}
