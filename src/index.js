const {ApolloServer, PubSub} = require('apollo-server');
const {MongoClient} = require('mongodb');
require('dotenv').config();

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
MongoClient.connect( process.env.MONGODB_URI ,{useNewUrlParser:true,useUnifiedTopology: true}, function(err,client){
    if(err){
         
        throw err;
    }
         
    console.log(`Connected sucessfully to MongoDB `);
 
    const db = client.db(process.env.MONGODB_DB);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: {Expenses: db.collection(process.env.MONGODB_COLLECTION),
        pubsub}
    });

    server.listen({ port: process.env.PORT}).then((server)=>{
        console.log(`Good, 🚀 Server ready at ${JSON.stringify(server, null, 1)}` );        
    });
        
});