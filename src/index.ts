import express from "express";
import 'dotenv/config';
import authRouter from './routes/auth.route';
import routes from "./routes/index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(authRouter);
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});