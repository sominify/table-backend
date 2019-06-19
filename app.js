const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(__dirname + "/../table-order-frontend/build"));
app.use('/api/table', require('./api/table'));
app.use('/api/order', require('./api/order'));
app.use('/api/menu', require('./api/menu'));

app.all('*', (req, res) => {
    res.send('404');
})

app.listen(4000, () => {
    console.log('Server Start!');
    require('./database/sync').sync();
})