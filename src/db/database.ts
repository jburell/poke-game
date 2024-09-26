import mongoose from "mongoose";
import dataset from "../data/pokemons.json";
import { Pokemon, PokemonModel } from "./models/pokemon";

export const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://mongodb:27017/pokemon_db";
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
};

export const insertPokemons = async () => {
  await PokemonModel.deleteMany({});
  const pokemonData = dataset.pokemon;
  await PokemonModel.insertMany(pokemonData);
  console.log("Pokemon data inserted");
};
export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const pokemon = await PokemonModel.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });
  if (!pokemon) throw new Error(`Pokemon with name ${name} does not exist`);
  return pokemon;
};
