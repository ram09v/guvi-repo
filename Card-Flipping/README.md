# Memory Game

A classic memory card matching game built with HTML, CSS, and JavaScript for DOM manipulation and game logic.

## Description

Test your memory by flipping cards to find matching pairs. The game features a 4x4 grid with 8 pairs of cards (A-H). Match all pairs to win!

## How to Play

1. Click on any card to flip it and reveal its value.
2. Click on a second card to flip it.
3. If the two cards match, they stay flipped and are removed from play.
4. If they don't match, both cards flip back after a short delay.
5. Continue until all pairs are matched.
6. Click "Restart Game" to shuffle and start over.

## Features

- 4x4 grid with 16 cards (8 pairs)
- Smooth flip animations
- Score tracking (pairs found)
- Responsive design for mobile and desktop
- Restart functionality

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and 3D transforms)
- JavaScript

## How to Run

Simply open `index.html` in your web browser. No server required!

## Game Mechanics

- Cards are shuffled randomly at the start of each game
- Only two cards can be flipped at a time
- Matched pairs are visually dimmed and disabled
- Game board locks during card flip animations to prevent rapid clicking