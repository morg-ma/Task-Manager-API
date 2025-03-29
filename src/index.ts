import express from "express";
import 'dotenv/config';
import authRouter from './routes/auth.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(authRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

console.log(process.env.BASE_URL);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});