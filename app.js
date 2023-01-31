const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const studentrouter = require("./routes/student_list");
const Attendencerouter = require("./routes/attendence");
const Authrouter = require("./routes/user");

// dbcoonection
mongoose
  .connect(process.env.MONGODB_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log("db is connected "))
  .catch((err) => console.log("db is not connected", err));

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// my routesnp
app.use("/api", studentrouter);
app.use("/api", Attendencerouter);
app.use("/api", Authrouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
