import { model, Schema } from "npm:mongoose@^6.7";

const DBSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  team: String,
  score: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Validations
DBSchema.path("id").required(true, " ID cannot be blank.");
DBSchema.path("name").required(true, " Name cannot be blank.");

// Export model.
export default model("Highscore", DBSchema);
