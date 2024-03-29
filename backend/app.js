const express = require("express");
//DOT.ENV
require("dotenv").config();

const app = express();


//PARSE BODY TO JAVASCRIPT OBJECTS
app.use(express.json());


/* 
app.use("/users", require("./Routes/Users"));
app.use("/Allergen", require("./Routes/Allergens"));
app.use("/Keyword", require("./Routes/Keywords"));
app.use("/Post", require("./Routes/Posts"));
app.use("/Product", require("./Routes/Products"));
app.use("/Badge", require("./Routes/Badges"));
app.use("/Category", require("./Routes/Categories"));
app.use("/Tips", require("./Routes/Tips"));
 */

app.use("/", require("./Routes/Auth"));
app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`)
);
