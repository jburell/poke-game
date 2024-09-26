const validateTeam = (team: string[]) => {
  if (team.length < 1 || team.length > 6) {
    throw new Error("Invalid: Team size must be between 1 and 6.");
  }

  if (new Set(team.map((name) => name.toLowerCase())).size !== team.length) {
    throw new Error(`Invalid: Duplicate Pokemons`);
  }
};

export const validateTeams = (team1: string[], team2: string[]) => {
  if (!team1?.length || !team2?.length) {
    throw new Error("Invalid: Two teams must be provided");
  }

  validateTeam(team1);
  validateTeam(team2);
};
