import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
const app =express()
import startServer from './services/Server.js';
import runMiddleware from './middleware/index.js';
runMiddleware(app)// all middleware functions
startServer(app); // Databse connection and server start

