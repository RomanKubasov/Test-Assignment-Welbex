const express = require('express');
require('dotenv').config();

const app = express();

const postsRouter = require('./routes/postsRouter');

const PORT = process.env.PORT ?? 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});
