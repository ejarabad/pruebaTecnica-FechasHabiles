import express from 'express';
import { handleDateCalculator } from './controller/dateController';
import ServerlessHttp from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3050;

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Service is up and running",
        timeStamp: new Date().toISOString()
    })
})

app.get("/calculate-date", handleDateCalculator);


export const handler = ServerlessHttp(app);