const express = require("express");

const app = express();
app.use(express.json());

const Log = require("./logging_middleware/log");

app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Home API called");

  try {
    await Log("backend", "debug", "controller", "Processing request");

    res.send("Server working");

    await Log("backend", "info", "controller", "Response sent");
  } catch (err) {
    await Log("backend", "error", "controller", "Error in home route");
    res.status(500).send("Error");
  }
});

app.get("/test", async (req, res) => {
  await Log("backend", "info", "route", "Test API called");

  res.json({ message: "Test successful" });
});

app.get("/error", async (req, res) => {
  await Log("backend", "error", "controller", "Fake error triggered");

  res.status(500).send("Error route");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});