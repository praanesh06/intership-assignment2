# Instagram Clone — Assignment 2

A React-based Instagram clone built to demonstrate React components, hooks, state management, form validation, and dynamic rendering.

## Features

- **Home Feed** — View posts with like, comment, save, and delete functionality
- **Stories Bar** — Scrollable story circles with seen/unseen state
- **Add Post** — Create new posts with image URL and validated caption
- **Search** — Filter posts by username or caption in real time
- **Saved Posts** — View all bookmarked posts
- **Profile Page** — View your posts grid, follower stats, and bio

## How to Run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Assignment Rubric Coverage

| Criterion | Implementation |
|-----------|----------------|
| React Components & UI | `App`, `PostCard`, `Avatar`, `StoryCircle`, `AddPostModal`, `Navbar` |
| useState | Likes, saves, comments, posts array, modal visibility, active tab, search query, notifications |
| useEffect | Debounced image preview in AddPostModal |
| useRef | Auto-focus comment input on click |
| Form Validation | Empty check, min 5 chars, max 200 chars, live character counter, error messages |
| map() rendering | Posts, comments, stories all rendered via `.map()` |
| Add/Delete | Add post → prepend to state; Delete → filter from state |

## Project Structure

```
src/
├── App.jsx                  # Root component, all global state
├── index.js                 # Entry point
├── index.css                # Global styles
├── components/
│   ├── Avatar.jsx           # User avatar with initials
│   ├── StoryCircle.jsx      # Story ring with seen/unseen
│   ├── PostCard.jsx         # Full post with actions
│   ├── AddPostModal.jsx     # Create post modal with validation
│   └── Navbar.jsx           # Bottom navigation bar
└── data/
    └── initialData.js       # Seed posts, stories, constants
```
