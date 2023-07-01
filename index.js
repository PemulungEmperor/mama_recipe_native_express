/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser'); // ISI DATA DARI POSTMAN
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');

//path
const path = require('path');
// port
const port = process.env.PORT || 5000;

// router
const userRouter = require('./src/router/user.router');
const productRouter = require('./src/router/product.router');

const app = express();
// app.use(express.static(path.join(__dirname, './thefrontend/build')))
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(cors())
app.use(cors({credentials: true}));
app.use(morgan('combined'));

//CSP
app.use(helmet());
app.use(xss());

app.use(userRouter);
app.use(productRouter);

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "./thefrontend/build", "index.html"));
// });

app.listen(port, () => {
  console.log(`SERVER LISTEN ON PORT ${port}`);
});

module.exports = app;
