const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteTodo = (event,context,callback)=>{
    const id = event.pathParameters.id;
    const params = {
        TableName:'todos',
        Key:{
            id
        }
    }

    dynamoDb.delete(params, (error, data)=>{
        if(error){
            console.log(error);
            callback(null, {
              statusCode: error.responseCode || 501,
              body: 'some error' || 'Internal Server Error'
            })
        }

        console.log(data);
        const response = {
            statusCode:200,
            body: JSON.stringify({"message": "Todo deleted successfully"})
        }
        callback(null, response);
    });
}