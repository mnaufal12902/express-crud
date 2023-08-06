require('dotenv').config()

const express = require('express')
const useRouter = require('./src/routes/users.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
app.use('/', useRouter);

app.listen(port, () => {
    console.log(`Server sedang berjalan di port ${port}`)
})
