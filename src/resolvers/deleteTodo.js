

export function request(ctx){
    return {
        operation: "DeleteItem",
        key: {
            'id': {'S': ctx.arguments.id},

        },
        condition: {
            expression: 'attribute_exists(id)',
        },
    }
}

export function response(ctx){
    return ctx.result
}