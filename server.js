const { ApolloServer } = require('apollo-server');
const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./schema');
const app = express();
const path= require('path');
require('dotenv').config()
const cors = require('cors');
app.use(cors());
require('os').tmpdir();

const server = new ApolloServer({
  
    cors:true,
    schema: Schema,
    playground: true,
    introspection: true
});
server.listen().then(({ url }) => {
   
    console.log(`🚀  Server ready at ${url}`);
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, (res, err) => {

        console.log('Connected to MongoDB');
    })
});






