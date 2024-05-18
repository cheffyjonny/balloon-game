# Introduction

Welcome to the Balloon Game!

- Choose your difficulty level: easy, medium, hard, or custom.
- Customize the theme color.
- Save and continue your game progress using Firebase.

# Structure

```
App
├── DarkModeSwitch
└── MainPage
    ├── Grid
    └── GameOption
        ├── TextField
        └── Option
```

# Logic

## App.tsx

- `react-toggle-dark-mode`: It's a package implemented with Context API

## Grid.tsx

- Ability to save and continue the game.
- `react-toastify`: A package for game notifications.
- `createGame`: Generates a game grid, balloons, and connected sequences using a DFS algorithm to find the connected sequences.
- `handleSaveGame`: Uses Firebase to save the game.

## GameOption.tsx

- `isCustom`: customize the game grid.

  <br>
  <br>
  <br>

# Set up instruction

To install the package and run the project: `npm install && npm run dev` <br>
