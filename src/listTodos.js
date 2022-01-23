'use strict'
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.listTodos = (event,context,callback)=>{
    const params = {
        TableName:'todos'
    }

    dynamoDb.scan(params,(error,data)=>{
        if(error){
            console.log(error);
            callback(null, {
              statusCode: error.responseCode || 501,
              body: 'some error' || 'Internal Server Error'
            })
        }
        console.log(data)
        const response = {
            statusCode:200,
            body: JSON.stringify(data.Items)
        };

        callback(null, response);
    })
}