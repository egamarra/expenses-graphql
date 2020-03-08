const {ApolloServer, PubSub} = require('apollo-server-express');
const {MongoClient} = require('mongodb');
 
require('dotenv').config();


//express
const express = require('express');
const app = express(); 
app.use("/", express.static(__dirname + '/client/expenses-vue/')); 
//0.- Configs
if(!process.env.PORT){
    throw new Error('Set value for process.env.PORT');
}
if(!process.env.MONGODB_URI){
    throw new Error('Set value for process.env.MONGODB_URI');
}
if(!process.env.MONGODB_DB){
    throw new Error('Set value for process.env.MONGODB_DB');
}
if(!process.env.MONGODB_COLLECTION){
    throw new Error('Set value for process.env.MONGODB_COLLECTION');
}

// 1.- Schema
const typeDefs = require('./schema');

// 2.- Resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Suscription');
const pubsub = new PubSub();

const resolvers = {
    Query,
    Mutation,
    Subscription
}

// 3.- MongoDB
MongoClient.connect( process.env.MONGODB_URI ,
    {   useNewUrlParser:true,
        useUnifiedTopology: true
    },
     function(err,client){
    if(err){
         console.log('err mongo --> ',err)
        throw err;
    }
         
    console.log(`Connected sucessfully to MongoDB `);
 
    const db = client.db(process.env.MONGODB_DB);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        tracing: true,
        cacheControl: true,
        context: {Expenses: db.collection(process.env.MONGODB_COLLECTION),
        pubsub}
    });

    server.applyMiddleware({ app });

    // server.applyMiddleware({
    //     path: '/mis-gastos', // you should change this to whatever you want
    //     app,
    //   });

    // server.listen({ port: process.env.PORT}).then((server)=>{
    //     console.log(`Good, 🚀 Server ready at ${JSON.stringify(server, null, 1)}` );        
    // });
    app.listen({ port: process.env.PORT }, () => {
        console.log(`🚀  Server ready at port ${process.env.PORT} ok`);
        console.log('dirname',__dirname);
      });
        
});