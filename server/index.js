const express = require("express");
const cors = require("cors");

const server_port = process.env.server_port || 4000;

const app = express();
app.use(cors());

app.listen(server_port, () => {
  console.log(`listening to port ${server_port}`);
});
