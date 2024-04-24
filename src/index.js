import express from 'express';
import bodyParser from 'body-parser';
import webhookRoutes from './routes/webhookRoutes.js'

const app = express();

const PORT = process.env.PORT || 3032;

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Welcome"));

app.use("/webhook", webhookRoutes);

app.listen(PORT, () => console.log("App listining at port: ", PORT));