# Pokemon Battle Simulator
Evinova codetest

Hours spent: ~5

Did all of the "nice to have". Haven't used swagger before, so I took the opportunity to try it.
If I had more time to spend on this, I would have added:
* Better test coverage
* A more complex and balanced battle algorithm
* A simple React GUI to make it more interactive

## Requirements

- Docker
- Docker Compose
- Node.js & npm

## Starting the server

```bash
sudo docker compose up
```

## API

- **GET** `/swagger`

- **POST** `/battle`  
  Example body:
  ```json
  {
    "team1": ["Pikachu", "Charmander", "Bulbasaur"],
    "team2": ["Squirtle", "Eevee", "Snorlax"]
  }

## Tests
Only a very simple unit test for some validation functionality

```bash
  npm install
  npm test
```