const express = require("express");
//DOT.ENV
require("dotenv").config();

const app = express();

//PARSE BODY TO JAVASCRIPT OBJECTS
app.use(express.json());

/* 
app.use("/Allergen", require("./Routes/Allergens"));
app.use("/Keyword", require("./Routes/Keywords"));
app.use("/Post", require("./Routes/Posts"));
app.use("/Product", require("./Routes/Products"));
app.use("/Badge", require("./Routes/Badges"));
app.use("/Category", require("./Routes/Categories"));
app.use("/Tips", require("./Routes/Tips"));
 */

app.use("/", require("./Routes/Auth"));
app.use("/posts", require("./Routes/post.routes"));
app.use("/objectives",require("./Routes/objectives.routes.js"));
//app.use("/categories", require("./Routes/categories.routes"));
app.use("/users", require("./Routes/Users"));
app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.port}/`)
);
