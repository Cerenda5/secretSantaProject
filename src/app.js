const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const hostname = '0.0.0.0';
const port = 3000;

const mongoose = require('mongoose');

const mongooseParams = {
  useUnifiedTopology : true,
  useNewUrlParser: true,
  useCreateIndex: true
}
mongoose.connect('mongodb://mongo/secretSantaProject', mongooseParams); // docker (mongo = nom du container)
//mongoose.connect('mongodb://localhost:27017/api_node_last', mongooseParams); // windows sans docker

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json())

const postRoute = require('./api/routes/postRoute');
const commentRoute = require('./api/routes/commentRoute');
const userRoute = require('./api/routes/userRoute');
const groupRoute = require('./api/routes/groupRoute');
postRoute(app);
commentRoute(app);
userRoute(app);
groupRoute(app);

app.listen(port, hostname);
