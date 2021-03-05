import express from "express";
import { ApolloServer } from 'apollo-server-express';
import { schema } from "./schema"

const app = express();

const server = new ApolloServer({
    schema,
    playground: true
});
server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 7000 }, () => {
    console.log("apollo server is running on https://localhost:7000/graphql");
});