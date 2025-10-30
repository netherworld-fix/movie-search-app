# 🎬 MovieFlix - Movie Discovery App

A Netflix-style movie search and discovery application built with React, Vite, React Router, and TMDB API.

![MovieFlix Screenshot](screenshot.png)

## ✨ Features

- ✅ Browse trending and popular movies
- ✅ Search movies with real-time results
- ✅ View detailed movie information (cast, ratings, trailers)
- ✅ Add/remove movies from favorites
- ✅ Multi-page navigation with React Router
- ✅ Responsive design (mobile to desktop)
- ✅ LocalStorage persistence for favorites
- ✅ Beautiful gradient UI with hover effects

## 🛠️ Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS v4
- **API:** The Movie Database (TMDB)
- **Deployment:** Vercel

## 🚀 Features Breakdown

### Home Page

- Trending movies this week
- Popular movies section
- Interactive movie cards with hover effects

### Search

- Real-time movie search
- Results count display
- URL-based search queries

### Movie Details

- Full movie information
- Cast and crew
- Embedded YouTube trailers
- Add to favorites functionality
- Backdrop and poster images

### Favorites

- Save favorite movies (persists in localStorage)
- Remove from favorites
- Empty state with helpful message

## 📦 Installation

1. Clone the repository

```bash
git clone https://github.com/netherworld-fix/movie-search-app.git
cd movie-search-app
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file

```bash
cp .env.example .env
```

4. Add your TMDB API key to `.env`

```
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

5. Start development server

```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with search
│   ├── MovieCard.jsx       # Individual movie card
│   ├── MovieGrid.jsx       # Grid layout for movies
│   ├── Loading.jsx         # Loading spinner
│   └── WeatherIcon.jsx     # Weather icons
├── pages/
│   ├── HomePage.jsx        # Trending & popular movies
│   ├── SearchPage.jsx      # Search results
│   ├── MovieDetailPage.jsx # Full movie details
│   └── FavoritesPage.jsx   # Saved favorites
├── services/
│   └── tmdbService.js      # API integration
├── App.jsx                 # Routes configuration
└── main.jsx                # React Router setup
```

## 🎯 What I Learned

### Technical Skills

- React Router for multi-page navigation
- URL parameters and query strings
- API integration with async/await
- LocalStorage for data persistence
- Promise.all for concurrent API calls
- Error handling and loading states

### Best Practices

- Component composition and reusability
- Separation of concerns (services, components, pages)
- Environment variables for security
- Responsive design principles
- Git workflow and version control

## 🌐 Live Demo

**Production:** [Your Vercel URL](https://movie-search-n470eh0of-desmond-delalis-projects.vercel.app)

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Movie recommendations
- [ ] Filter by genre
- [ ] Sort options (rating, date, popularity)
- [ ] Watchlist with categories
- [ ] Dark/light theme toggle
- [ ] Share favorites via URL

## 👨‍💻 Author

**Desmond Delali**

- GitHub: [@netherworld-fix](https://github.com/netherworld-fix)
- LinkedIn: [Your LinkedIn](your-linkedin-url)

## 📄 License

MIT License - feel free to use this project for learning!

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons from Heroicons
- Built as part of my journey to becoming a full-stack developer

---

**Day 3 Project** | Built with ❤️ using React + Vite + Tailwind CSS v4 + React Router
