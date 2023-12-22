// requirement:
// 1.show at most 8 results
// 2.results should be ordered alphabetically
// 3.the user’s input should be case insensitive

import express from "express";
import cors from "cors";
import states from "./states.js";

const server_port = process.env.server_port || 4000;
const maxResult = 8;

const app = express();
app.use(cors());

app.get("/states", (req, res) => {
  const query = req.query.search.toLowerCase();
  const result = states
    .filter((state) => state.toLowerCase().includes(query))
    .sort()
    .slice(0, maxResult);
  res.status(200).json(result);
});

app.listen(server_port, () => {
  console.log(`listening to port ${server_port}`);
});
