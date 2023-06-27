// Utilize Deno's new NPM compatibility, since opine has been deprecated
import express from "npm:express";
import mongoose from "npm:mongoose@^6.7";
import Highscore from "./db.ts";

await mongoose.connect("mongodb://localhost/highscores");

const app = express();
const api = express.Router();
const PORT = 3000;

// Get all highscores
api.get("/highscores", (req, res) => {
  Highscore.find(function (err, response) {
    res.json(response);
  });
});

// Get highscore of specific ID
api.get("/highscores/:id", function (req, res) {
  Highscore.findOne({ id: req.params.id }, function (err, response) {
    res.json(response);
  });
});

// Delete highscore by ID
api.delete("/highscores/:id", (req, res) => {
  Highscore.findOneAndRemove({ id: req.params.id }, function (err, response) {
    if (err)
        res.json({
          message: "Error in deleting ID " + req.params.id,
        });
    res.sendStatus(200);
  });
});

// Add new player
api.post("/highscores", (req, res) => {
  try {
    const score = new Highscore({
      id: req.body.id, // required
      name: req.body.name, // required
      team: req.body.team,
      score: req.body.score,
    });
    score.save();
    res.sendStatus(201);
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

// Update highscore
api.put("/highscores/score", (req, res) => {
  Highscore.findOneAndUpdate(
    { id: req.params.id },
    { highscore: req.params.highscore },
    function (err, response) {
      if (err)
        res.json({
          message: "Error in updating highscore of ID " + req.params.id,
        });
      res.sendStatus(200);
    }
  );
});

app.use("/api/v1", express.json(), api);
app.listen(PORT, () => console.log(`REST API active on port ${PORT}`));
