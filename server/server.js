const app = require("./src/app");
const dotnv = require("dotenv");
const connectDB = require("./src/config/db");
const  cookieParser = require('cookie-parser')
dotnv.config();  
app.use(cookieParser());   




app.listen(process.env.PORT, () => {
    
connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
}   );




