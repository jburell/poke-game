import { getPokemonByName } from "../db/database";
import { Pokemon } from "../db/models/pokemon";

export const getPokemons = async (
  names1: string[],
  names2: string[]
): Promise<{ pokemons1: Pokemon[]; pokemons2: Pokemon[] }> => {
  const pokemons1 = await Promise.all(names1.map(getPokemonByName));
  const pokemons2 = await Promise.all(names2.map(getPokemonByName));

  return {
    pokemons1,
    pokemons2,
  };
};
