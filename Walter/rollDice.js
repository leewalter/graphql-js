/* based https://graphql.github.io/graphql-js/passing-arguments/
*/

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  rollDice: function ({numDice, numSides}) {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

/*
D:\github\walter-repo\graphql.org\graphql-js>node rollDice.js
Running a GraphQL API server at localhost:4000/graphql-js

>curl -X POST -H "Content-Type: application/json" -d "{\"query\": \"{ rollDice(numDice: 4, numSides:6)}\"}" http://localhost:4000/graphql
{"data":{"rollDice":[5,5,4,5]}}

>curl -X POST -H "Content-Type: application/json" -d "{\"query\": \"{ rollDice(numDice: 3, numSides:10)}\"}" http://localhost:4000/graphql
{"data":{"rollDice":[4,10,1]}}

*/
