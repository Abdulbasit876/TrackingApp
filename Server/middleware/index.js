import router from '../routes/index.js';
import express from 'express'

const runMiddleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', router);
};
export default runMiddleware;