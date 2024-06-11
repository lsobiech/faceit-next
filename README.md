## App Description
This app is a dynamic social media feed built with Next.js and Redux. It allows users to scroll through posts, view detailed information about each post, and see real-time updates. The application features a modular component architecture and utilizes Redux for state management.

## Key Features

Infinite Scrolling:
Automatically fetches and displays more posts as the user scrolls down the feed.

Post Highlighting:
Newly fetched posts are highlighted briefly.

User Information:
Displays author information alongside each post.

Real-Time Updates:
Uses hooks for real-time updates.

Detailed Post View:
Allows users to view detailed information about each post.

Modular Architecture:
Organizes components into atoms, molecules, and organisms for better maintainability and scalability.

Components
Feed Component (Organism): Manages the display of posts and handles fetching more posts as the user scrolls.
PostPreview Component (Molecule): Displays individual posts with author information and highlights new posts.
PostDetail Component (Molecule): Displays detailed information about a single post along with the author's information.

ClientProvider Component (Atom): Wraps the application with Redux Provider to enable state management.

## Install Dependencies:
npm install
npm run dev
http://localhost:3000
npm run test
npm run test:update
npm run test:watch
npm run test:coverage

# Structure
src/
├── components/
│   ├── atoms/
│   │   └── ClientProvider.tsx
│   ├── molecules/
│   │   ├── PostDetail.tsx
│   │   └── PostPreview.tsx
│   └── organisms/
│       └── Feed.tsx
├── hooks/
│   └── useMockRealTimeUpdates.ts
├── interfaces/
│   ├── Post.ts
│   └── User.ts
├── pages/
│   ├── index.tsx
│   └── posts/[id].tsx
├── store/
│   ├── postSlice.ts
│   ├── userSlice.ts
│   └── index.ts
├── tests/
│   ├── components/
│   │   ├── Feed.test.tsx
│   │   ├── PostDetail.test.tsx
│   │   └── PostPreview.test.tsx
│   └── hooks/
│       └── useMockRealTimeUpdates.test.ts
└── utils/
    └── api.ts

## Author
lka@immediatetiger.com


