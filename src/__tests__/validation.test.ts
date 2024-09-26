import { validateTeams } from "../utils/validation";

describe("validateTeams", () => {
  it("should throw an error if both teams are empty", () => {
    expect(() => validateTeams([], [])).toThrow(
      "Invalid: Two teams must be provided"
    );
  });

  it("should throw an error if team size is less than 1", () => {
    expect(() => validateTeams([], ["Pikachu"])).toThrow(
      "Invalid: Two teams must be provided"
    );
  });

  it("should throw an error if team size is greater than 6", () => {
    expect(() =>
      validateTeams(
        [
          "Pikachu",
          "Bulbasaur",
          "Charmander",
          "Squirtle",
          "Jigglypuff",
          "Meowth",
          "Psyduck",
        ],
        ["Pikachu"]
      )
    ).toThrow("Invalid: Team size must be between 1 and 6.");
  });

  it("should throw an error if team has duplicate Pokemons", () => {
    expect(() => validateTeams(["Pikachu", "Pikachu"], ["Bulbasaur"])).toThrow(
      "Invalid: Duplicate Pokemons"
    );
  });

  it("should pass validation for a valid team", () => {
    expect(() =>
      validateTeams(["Pikachu", "Bulbasaur"], ["Charmander", "Squirtle"])
    ).not.toThrow();
  });
});
