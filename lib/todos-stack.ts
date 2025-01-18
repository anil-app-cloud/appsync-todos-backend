import * as cdk from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync'
import * as dynamoDb from "aws-cdk-lib/aws-dynamodb";
import { AppSync } from 'aws-cdk-lib/aws-events-targets';
import { Construct } from 'constructs';
import * as path from "path"


export class TodosStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "todo-apis", {
      name: "todos-api",
      schema: appsync.SchemaFile.fromAsset(path.join(__dirname, "../src/schemas/schema.graphql"))
    })

    const db = new dynamoDb.Table(this, "todos-table", {
      partitionKey: {
        name: 'id',
        type: dynamoDb.AttributeType.STRING
      },
      tableName: "todos-table",
      removalPolicy: cdk.RemovalPolicy.DESTROY,

    })

    const dbSourse = api.addDynamoDbDataSource("todos", db)

    new appsync.Resolver(this, "createTodoResolver", {
      api,
      typeName: "Mutation",
      fieldName: "createTodo",
      dataSource: dbSourse,
      code: appsync.Code.fromAsset(path.join(__dirname, "../src/resolvers/createTodo.js")),
      runtime: appsync.FunctionRuntime.JS_1_0_0,

    })

    new appsync.Resolver(this, "getAllTodosResolver", {
      api,
      typeName: "Query",
      fieldName: "getTodos",
      dataSource: dbSourse,
      code: appsync.Code.fromAsset(path.join(__dirname, "../src/resolvers/getAllTodos.js")),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    })

    new appsync.Resolver(this, "updatedTodoResolver", {
      api,
      typeName: "Mutation",
      fieldName: "updateTodo",
      dataSource: dbSourse,
      code: appsync.Code.fromAsset(path.join(__dirname, "../src/resolvers/updateTodo.js")),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    })

    new appsync.Resolver(this, "deleteTodoResolver", {
      api,
      typeName: "Mutation",
      fieldName: "deleteTodo",
      dataSource: dbSourse,
      code: appsync.Code.fromAsset(path.join(__dirname, "../src/resolvers/deleteTodo.js")),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    })

      new appsync.Resolver(this, "getTodoById", {
        api,
        typeName: "Query",
        fieldName: "getTodo",
        dataSource: dbSourse,
        code: appsync.Code.fromAsset(path.join(__dirname, "../src/resolvers/getTodo.js")),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
      }) 
    

  }
}
