import { Pokemon } from "../db/models/pokemon";

interface BattlePokemon {
  id: number;
  name: string;
  type: string[];
  weaknesses: string[];
  height: string;
  weight: string;
  hp: number;
}

const calculateHP = (height: string, weight: string): number => {
  const heightInMeters = parseFloat(height);
  const weightInKg = parseFloat(weight);
  return Math.round(heightInMeters * 100 + weightInKg * 10);
};

const getBattlePokemons = (pokemons: Pokemon[]): BattlePokemon[] => {
  return pokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    type: pokemon.type,
    weaknesses: pokemon.weaknesses,
    height: pokemon.height,
    weight: pokemon.weight,
    hp: calculateHP(pokemon.height, pokemon.weight),
  }));
};

const defenderIsWeakToAttacker = (
  attacker: BattlePokemon,
  defender: BattlePokemon
): boolean => {
  return attacker.type.some((type) =>
    defender.weaknesses
      .map((weakness) => weakness.toLowerCase())
      .includes(type.toLowerCase())
  );
};

export const battle = (team1: Pokemon[], team2: Pokemon[]): string[] => {
  const battleLog: string[] = [];

  const alivePokemons1: BattlePokemon[] = getBattlePokemons(team1);
  const alivePokemons2: BattlePokemon[] = getBattlePokemons(team2);

  const baseDamage = 20;
  let round = 1;

  while (alivePokemons1.length > 0 && alivePokemons2.length > 0) {
    const attackingTeam: 1 | 2 = round % 2 == 0 ? 2 : 1;

    const [attacker] = attackingTeam == 1 ? alivePokemons1 : alivePokemons2;
    const [defender] = attackingTeam == 1 ? alivePokemons2 : alivePokemons1;

    const typeAdvantage = defenderIsWeakToAttacker(attacker, defender);
    const damage = typeAdvantage ? baseDamage * 2 : baseDamage;

    battleLog.push(
      `${attacker.name} attacks ${defender.name}. ${
        typeAdvantage ? "It was super effective!" : ""
      }`
    );
    battleLog.push(`Damage dealt: ${damage}`);

    defender.hp -= damage;

    if (defender.hp <= 0) {
      battleLog.push(`${defender.name} has fainted!`);
      attackingTeam == 1 ? alivePokemons2.shift() : alivePokemons1.shift();
    } else {
      battleLog.push(`${defender.name} has ${defender.hp} HP left.`);
    }

    round++;
  }

  const winningTeam =
    alivePokemons1.length > 0
      ? { name: "Team 1", alivePokemons: alivePokemons1 }
      : { name: "Team 2", alivePokemons: alivePokemons2 };

  battleLog.push(
    `${winningTeam.name} wins! Pokemons left: ${winningTeam.alivePokemons
      .map((pokemon) => pokemon.name)
      .join(", ")}`
  );

  return battleLog;
};
