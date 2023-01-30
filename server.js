require('dotenv').config()
const express = require("express");
const app = express();
const path = require('path');
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const  mongoose = require('mongoose')
const { logger, logEvent } = require('./middleware/logger')
const PORT = process.env.PORT || 3500;
const morgan = require("morgan");
const chalk = require("Chalk");

console.log(process.env.NODE_ENV)

connectDB()


// ! log file
app.use(logger)
// ! cors 
// ! People use API for URL fetch(http://localhost:3500) is Public cors()
// ! now we use corsOptions setup cors for setup URL ที่ Allow accept
app.use(cors(corsOptions))
app.use(morgan("dev"));


app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.all('*',(req, res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({message: "404 Not Found"})
    }else{
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () =>{
    console.log('Connected to MongoDB')
    app.listen(PORT, () =>
      console.log(`Server is running on Port ${chalk.blue(PORT)}`)
    );
})

mongoose.connection.on('err', err=>{
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrlog.log");
})
