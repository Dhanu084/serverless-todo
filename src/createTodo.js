'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createTodo = (event,context,callback)=>{
  console.log(event)
  const dateTime = new Date().toISOString();
  const data = JSON.parse(event.body);

  if(typeof data.task !== "string"){
    console.error('Task is not a string');
    const response = {
      statusCode:400,
      body: JSON.stringify({
        'message': 'Task is not a string'
      })
    };
    callback(null, response);
  }

  const params = {
    TableName:'todos',
    Item : {
      id: uuid.v1(),
      task: data.task,
      done: false,
      createdAt: dateTime,
      updatedAt: dateTime
    }
  }
  
  dynamoDb.put(params,(error, data)=>{
    if(error){
      console.error(error);
      callback(null, {
        statusCode: error.responseCode || 501,
        body: 'some error' || 'Internal Server Error'
      })
    }

    console.log(data);
    const response = {
      statusCode:201,
      body: JSON.stringify(data.Items)
    }
    callback(null, response);
  });
  
}