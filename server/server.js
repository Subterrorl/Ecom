//step 1 Import
const express = require('express');
const app = express();
const morgan = require('morgan');

const {readdirSync} = require('fs');
//const authRouter = require('./routes/auth');
//const categoryRouter = require('./routes/category');

const cors = require('cors');


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));
//app.use('/api/auth', authRouter);
//app.use('/api/auth', categoryRouter);
    
//step 3 Router
app.get('/api', (req, res) => {
    const {username , password} = req.body;
    console.log(username, password);
    res.json({ message: 'Hello from the server!' });
});



// step 2 Start Server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
}); 