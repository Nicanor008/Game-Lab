# 2048 Game

A modern implementation of the classic 2048 sliding tile puzzle game, built with HTML, CSS, and JavaScript in a single `index.html` file. Slide tiles to combine matching numbers and reach the target tile (256 for 3x3, 2048 for 4x4, 8192 for 5x5) while aiming for the highest score possible!

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Features](#features)
- [How to Play](#how-to-play)
- [Algorithms and Solutions](#algorithms-and-solutions)
- [Customization](#customization)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
- [License](#license)

## Overview

2048 is a single-player sliding tile puzzle game where the goal is to combine tiles with the same number by sliding them in different directions (up, down, left, right). When two tiles with the same number collide, they merge into one tile with double the value. The game ends when no moves are possible, but you win when you reach the target tile for your chosen board size.

This implementation includes a responsive design, interactive features, and modern enhancements like high score tracking and undo moves, all wrapped in a clean and intuitive UI.

## Setup

1. **Download**: Save the `index.html` file from this repository to your local machine.
2. **Run**: Open `index.html` in a modern web browser (e.g., Chrome, Firefox, Edge).
   - No additional setup or dependencies are required since everything is contained in one file.
3. **Play**: Use arrow keys or mouse clicks to start playing immediately!

## Features

- **Dynamic Board Sizes**: Choose between 3x3, 4x4, or 5x5 grids with adjusted win targets (256, 2048, 8192).
- **Responsive Design**: Adapts to different screen sizes, from mobile to desktop.
- **High Score Tracking**: Persists your best score across sessions using `localStorage`.
- **Undo Move**: Revert your last move with a single button click.
- **Win Animations**: Celebrate reaching the target tile with a pulsing effect and victory overlay.
- **Invalid Move Feedback**: Displays "Invalid Move" when no tiles can move in the chosen direction.
- **Mouse Support**: Click grid edges to slide tiles (top for up, bottom for down, left for left, right for right).
- **Tips & Instructions**: Interactive hints and clear gameplay guidance, with animations for engagement.
- **SEO & Social Sharing**: Includes meta tags for search engines and social media platforms.

## How to Play

1. **Start**: Open `index.html` in a browser; the game initializes with two random tiles (2 or 4).
2. **Move Tiles**:
   - **Arrow Keys**: Press `↑`, `↓`, `←`, or `→` to slide tiles in that direction.
   - **Mouse Clicks**: Click near the grid’s edges (top, bottom, left, right) to slide tiles.
3. **Combine**: When two tiles with the same number touch, they merge into one tile with double the value.
4. **Win**: Reach the target tile for your board size:
   - 3x3: 256
   - 4x4: 2048
   - 5x5: 8192
   - A "You Won!" message appears; choose to restart or continue for a higher score.
5. **Game Over**: The game ends when no moves are possible; restart to try again.
6. **Undo**: Click the "Undo" button to revert your last move.
7. **Tips**: Click "Tips to Win" for strategies to improve your game.

> **Note**: If a move isn’t possible, "Invalid Move" flashes briefly on the grid.

## Algorithms and Solutions

This section explains the core algorithms and logic powering the 2048 game.

### 1. Game Initialization
- **Solution**: The game starts by creating a 2D array (`board`) based on the selected size (3x3, 4x4, or 5x5). Two random tiles (2 or 4) are added using `addNewTile()`.
- **Algorithm**:
  1. Create an empty `size × size` array filled with zeros.
  2. Identify all empty cells (value = 0).
  3. Randomly select an empty cell and assign it a value (90% chance of 2, 10% chance of 4).
  4. Repeat step 3 to add a second tile.
  5. Render the board visually by updating DOM elements.

### 2. Tile Movement
- **Solution**: The `move(direction)` function shifts all tiles in the specified direction (up, down, left, right), merging where possible.
- **Algorithm**:
  1. Create a copy of the current board (`newBoard`).
  2. For each row (left/right) or column (up/down):
     - Extract the row/column as a 1D array.
     - Apply `mergeTiles()` to shift and combine tiles.
     - Update `newBoard` with the merged result.
  3. Compare `newBoard` with the original; if different, a move occurred.
  4. If moved, replace the original board, add a new tile, and update the UI.

### 3. Tile Merging
- **Solution**: The `mergeTiles(line, forward)` function handles shifting and combining tiles in a single direction.
- **Algorithm**:
  1. Filter out zeros from the line (e.g., `[0, 2, 0, 2]` → `[2, 2]`).
  2. If `forward` is false (e.g., down or right), reverse the line.
  3. Iterate through the line:
     - If two adjacent tiles match, double the first tile’s value, remove the second, and add to the score.
  4. Pad the line with zeros to maintain length `size`.
  5. Reverse the line back if not `forward`.
  6. Return the merged line.

### 4. Game Over Detection
- **Solution**: `isGameOver()` checks if no moves are possible.
- **Algorithm**:
  1. For each tile in the board:
     - If the tile is 0, return `false` (empty space exists).
     - If adjacent tiles (below or right) match the current tile, return `false` (merge possible).
  2. If no conditions are met, return `true` (game over).

### 5. Win Detection
- **Solution**: `updateBoard()` checks for the win condition after each move.
- **Algorithm**:
  1. Iterate through all tiles.
  2. If a tile equals `winTarget` (256, 2048, or 8192) and `hasWon` is `false`:
     - Apply a win animation (pulsing effect).
     - Show the "You Won!" overlay with restart/continue options.
     - Set `hasWon` to `true` to prevent repeated triggers.

### 6. Undo Move
- **Solution**: `saveState()` and `undoMove()` manage move history.
- **Algorithm**:
  - **Save**: Before each move, push a deep copy of `board` and `score` to `boardHistory` and `scoreHistory`.
  - **Undo**: Pop the last state from both histories, update `board` and `score`, and refresh the UI.

### 7. Invalid Move Feedback
- **Solution**: `showInvalidMove()` provides visual feedback when no tiles move.
- **Algorithm**:
  1. In `move()`, if no change occurs (`moved = false`), call `showInvalidMove()`.
  2. Add a CSS class to display the "Invalid Move" message.
  3. Use `setTimeout` to remove the class after 500ms, fading it out.

### 8. Mouse Click Handling
- **Solution**: Grid edge clicks trigger directional moves.
- **Algorithm**:
  1. On `click` event, get the click coordinates relative to the grid.
  2. Define an `edgeSize` (50px) for clickable areas.
  3. If click is:
     - Top (`y < edgeSize`): Move up.
     - Bottom (`y > height - edgeSize`): Move down.
     - Left (`x < edgeSize`): Move left.
     - Right (`x > width - edgeSize`): Move right.
  4. Call `move(direction)` with the determined direction.

### 9. High Score Tracking
- **Solution**: `localStorage` persists the high score.
- **Algorithm**:
  1. Load `highScore` from `localStorage` on start (default 0).
  2. After each move, if `score > highScore`, update `highScore` and save to `localStorage`.
  3. Display the updated `highScore`.

## Customization

You can tweak the game by editing `index.html` directly:

- **Colors**: Modify the `.tile-*` classes in the `<style>` section for different tile colors.
- **Win Targets**: Adjust the `setWinTarget()` function in `<script>` to change win conditions (e.g., 512 for 3x3).
- **Grid Size**: Edit the `--size` variable or media queries in CSS for different board dimensions.
- **Animations**: Customize the `@keyframes` (e.g., `pulse`, `fadeIn`) for win or feedback effects.
- **Feedback Duration**: Change the `setTimeout` value in `showInvalidMove()` to adjust how long "Invalid Move" displays.
- **Social Media**: Update the `og:image` and `twitter:image` URLs in `<head>` with your own image.

## Technical Details

- **Tech Stack**: HTML5, CSS3, JavaScript (vanilla, no frameworks).
- **Structure**: Single `index.html` file with embedded `<style>` and `<script>` sections.
- **Game Logic**:
  - Uses a 2D array (`board`) to track tile states.
  - Implements efficient merging and movement algorithms.
  - Saves state history for undo functionality.
- **Performance**: Optimized with minimal DOM updates and lightweight animations.
- **Storage**: Uses `localStorage` for high score persistence.
- **Date**: Built with knowledge up to February 21, 2025.

## Contributing

Feel free to fork this project and submit pull requests with improvements! Ideas for enhancements:

- Add sound effects for moves and wins.
- Implement swipe gestures for mobile touch support.
- Create a dark mode toggle.
- Add a leaderboard with backend integration.

Submit issues or suggestions via GitHub if hosting this in a repository.

## License

This project is open-source under the [MIT License](https://opensource.org/licenses/MIT). Use, modify, and distribute it freely, with attribution appreciated!
