import express from "express";
import { connectDB, insertPokemons } from "./db/database";
import { battle } from "./services/battleService";
import { getPokemons } from "./services/pokemonService";
import { validateTeams } from "./utils/validation";

const app = express();
app.use(express.json());

const PORT = process.env.APP_PORT || 3000;

connectDB()
  .then(async () => {
    await insertPokemons();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });

interface BattleRequestBody {
  team1: string[];
  team2: string[];
}

app.post("/battle", async (req, res) => {
  const { team1, team2 }: BattleRequestBody = req.body;

  try {
    validateTeams(team1, team2);
    const { pokemons1, pokemons2 } = await getPokemons(team1, team2);
    const battleLog = battle(pokemons1, pokemons2);

    return res.json(battleLog);
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default app;
