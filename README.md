# News Aggregator

A modern news aggregation platform that combines articles from multiple sources including NewsAPI, The New York Times, and The Guardian.

⚠️ **IMPORTANT**: Due to NewsAPI restrictions, this application must be run on `localhost` for development.

## Features

-   Multi-source news aggregation from:
    -   News API
    -   The New York Times
    -   The Guardian
-   Comprehensive filtering system:
    -   Date range selection
    -   Category filtering
    -   Source filtering
    -   Search functionality
-   Toggle individual news sources
-   Real-time news updates
-   Responsive design

## Tech Stack

-   React + TypeScript
-   Vite (Build tool)
-   Zustand (State management)
-   Axios (API requests)
-   Docker for containerization

## Prerequisites

-   Node.js
-   Docker and Docker Compose (for containerized deployment)
-   API Keys from:
    -   NewsAPI
    -   The New York Times
    -   The Guardian

## Environment Setup

Create a `.env` file in the root directory:

```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_NY_NEWS_KEY=your_nyt_api_key
VITE_THE_GUARDIAN_KEY=your_guardian_api_key
```

## Running Locally

1. Install dependencies:

```bash
yarn install
```

2. Start development server:

```bash
yarn dev
```

## Docker Deployment

1. Build and run using Docker Compose:

```bash
docker-compose up --build
```

2. Access the application at:

```
http://localhost:5173
```

## Project Structure

```
src/
  ├── hooks/
  │   └── useFetchNews.ts    # News fetching logic
  ├── store/
  │   └── useUniversalStore.ts # Global state management
  └── components/
      └── ... # React components
```

## Filters

The application supports various filtering options:

-   **Date Range**: Filter articles by date range
-   **Category**: Filter by news category
-   **Source**: Filter by specific news sources
-   **Search**: Full-text search across all sources

## State Management

Uses Zustand for managing:

-   News channel toggles
-   Search queries
-   Filter states
-   Article data

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
