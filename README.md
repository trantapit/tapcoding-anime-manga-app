# AnimeManga Web App

A web application for searching and managing anime and manga using the Jikan API (MyAnimeList).

## Features

- Search for anime and manga
- Filter by type, status, and more
- Add items to wishlist
- View detailed information about anime and manga
- Dark mode support
- Responsive design

## Tech Stack

- Vue 3
- Vite
- Pinia (State Management)
- Vue Router
- Tailwind CSS
- Axios
- Jikan API v4

## Project Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## API Rate Limits

The Jikan API has a rate limit of 3 requests per second. The application includes debouncing for search requests to help manage this limit.

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License. 