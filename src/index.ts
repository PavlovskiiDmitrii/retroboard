import express from 'express';
import 'dotenv/config'

const app = express();

app.get('/', (req, res) => {
    res.send('Well doddne!');
})

console.log(process.env.PORT)

app.listen(3000, () => {
    console.log(`On port localhost:${process.env.PORT}`);
})