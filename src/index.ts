import express from 'express';
import handleDateCalculator from './controller/dateController.js';

const app = express();
const PORT = process.env.PORT || 3050;

app.get("/calculate-date", handleDateCalculator);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})