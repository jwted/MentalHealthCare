const express = require("express");
const cors = require('cors')
//DOT.ENV
require("dotenv").config();

const app = express();

//PARSE BODY TO JAVASCRIPT OBJECTS
app.use(cors())
app.use(express.json());

app.use("/", require("./Routes/Auth"));
app.use("/posts", require("./Routes/post.routes"));
app.use("/objectives",require("./Routes/objectives.routes.js"));
app.use("/activities",require("./Routes/activites.routes.js"));
app.use("/categories", require("./Routes/categories.routes.js"));
app.use("/badges", require("./Routes/badges.routes.js"));
app.use("/users", require("./Routes/Users"));
app.use("/resources", require("./Routes/resources.routes.js"));
app.use("/calendar", require("./Routes/calendar.routes.js"));
app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.port}/`)
);
