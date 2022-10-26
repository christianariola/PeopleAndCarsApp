import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

const startApolloServer = async () => {
    const app = express();
    
    const httpServer = http.createServer(app);
    
    const server = new ApolloServer({
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();

    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

startApolloServer();
