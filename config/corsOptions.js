const allowOrigins = require('./allowOrigins');

// ! 3rd-party middleware 
// ? setup rules
const corsOptions = {
    // ? callback function
    origin: (origin, callback)=>{
        // ! allowOrigins.indexOf(origin) ถ้าURL ที่ Fetch use APIมาเช็คดูใน Array allowOrigins และ return เป็นเลข index และให้ !== -1 เพราะมันต้องมีข้อมูล
        // ? !origin ให้ Postman or Application or Software สามารถเข้า if ได้(rest API)
        if(allowOrigins.indexOf(origin) !== -1 || !origin){
            //  TODO: ให้ first arguments = null เพราะว่าตัวนี้จะเป็น error Objเลยให้= null เพราะมันไม่ได้ error อะไร
            //  TODO: second is allow Boolean
            callback(null, true)
        }else{
            // ! use interface เป็น Lib ใน node_modules
            callback(new Error('Not allowed by CORS'))
        }
    },
    // ? some other options
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions