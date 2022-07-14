const express = require('express');
require('dotenv').config();

const app = express();

const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')

const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is started on port: ${PORT}`);
});
