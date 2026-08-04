# 🔍 Where's Waldo? — Photo Tagging App

A full-stack photo tagging application inspired by the classic _"Where's Waldo?"_ books. Built as a project for [The Odin Project's](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app) NodeJS curriculum.

---

## ✨ Features

- 📍 **Responsive Coordinate System:** Accurately registers clicks across all screen sizes and device resolutions.
- 🎯 **Dynamic Character Tagging:** Validates selected coordinates against the backend database in real time.
- 🎨 **Color-Coded Markers:** Displays a unique colored marker on the image once a character is successfully found.
- ⏱️ **Timer & Leaderboard:** Tracks how fast the player completes the level.
- 🛡️ **Secure Backend Validation:** Coordinates and logic are validated on the server side to prevent cheating.

---

## 🛠️ Tech Stack

- **Frontend:** JavaScript (ES6+), React / HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL / Prisma ORM

---

## 📐 Technical Highlight: Responsive Coordinate Calculation

One of the main challenges of this project was ensuring that character positions remain accurate regardless of the user's screen size or screen resolution.

### How it works:

1. When a user clicks on the image, the event target's bounding box is measured using `getBoundingClientRect()`.
2. The raw pixel coordinates of the click relative to the image element are extracted.
3. These pixel coordinates are converted into **percentages** relative to the width and height of the displayed image:

```math
   X_{\%} = \left(\frac{\text{clickX}}{\text{imageWidth}}\right) \times 100
```

```math
Y_{\%} = \left(\frac{\text{clickY}}{\text{imageHeight}}\right) \times 100
```

4. The percentage-based coordinates are sent to the Node.js backend to check if they fall within the predefined target box for the selected character.
5. Upon successful validation, a **color-coded marker** (assigned specifically to that character) is rendered at the clicked position to highlight the find.

---

## 🚀 .env file snippet

```js
PORT = 5000;
DATABASE_URL = your_database_url;
```
