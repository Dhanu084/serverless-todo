'use strict'
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getTodoById = (event, context, callback)=>{
    console.log(event);
    const params = {
        TableName:"todos",
        Key:{
            id: event.pathParameters.id
        }
    }

    dynamoDb.get(params,(error,data)=>{
        if(error){
            console.log(error);
            callback(null, {
              statusCode: error.responseCode || 501,
              body: 'some error' || 'Internal Server Error'
            })
          }
      
        console.log(data);
        const response = {
          statusCode:data.Item?200:404,
          body: JSON.stringify(data.Item?data.Item:"Task not found")
        }
        callback(null, response);
    });
}