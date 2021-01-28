const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');

const cron = require('node-cron');

const users = require("./routes/api/users");
const scrapper = require("./routes/api/scrapper");
const sellers = require("./scrapper/sellers");
const products = require("./scrapper/products");

const app = express();

app.use('*', function(req, res, next) {
	//replace localhost:8080 to the ip address:port of your server
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Credentials', true);
	next(); 
});
	
//enable pre-flight
app.options('*', cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect( db, { useNewUrlParser: true }).then( () => { 
    console.log("MongoDB successfully connected");
}).catch( err => { 
    console.log(err) 
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/scrapper", scrapper);

const task = async()=>{
	/* await sellers() */
	products()
}
/* task() */
//cron
cron.schedule('*/50 * * * *', async () => {
	/* await sellers()
	await products() */
});


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));