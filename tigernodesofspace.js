const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('common'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// const mongoose = require('mongoose');

//*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
    //'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
      // header: res.header // to try later
  }
  next();
});
//*/

/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});
//*/

/*
mongoose.connect(
    'mongodb+srv://tigeradmin:'
      + process.env.MONGO_ATLAS_PW
      + '@tigernodesandreact-4kfsd.mongodb.net/', {
        dbName: 'tigernodesandreact',
        useNewUrlParser: true
    }
);
mongoose.Promise = global.Promise;
//*/

app.get('/', (req, res) => {
    res.json({
        'msg': 'tigernodesofspace backend1'
    });
    console.log('tigernodesofspace backend');
})

app.get('/api/customers', (req, res) => {

    const customers = [
        { id: 1, firstname: 'john', lastname: 'doe', email: 'email@example.com' },
        { id: 2, firstname: 'jon2', lastname: 'do2', email: 'emai2@example.com' }
    ];

    res.json(customers);

});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
  
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = 5000;
app.set('port', process.env.PORT || port);

app.listen(app.get('port'), () => console.log(
  `Server on port ${port}`
));
