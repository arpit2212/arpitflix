<img width="1892" height="916" alt="image" src="https://github.com/user-attachments/assets/cedd1bb4-42b6-4fc2-8b17-e4394b616418" /><img width="1919" height="839" alt="image" src="https://github.com/user-attachments/assets/473d00bf-17c8-4fea-824c-b6c19ae3624f" /><img width="1893" height="908" alt="image" src="https://github.com/user-attachments/assets/65a57753-d780-40e1-a2e8-e0664ad7d269" /># 🎬 Arpitflix

A modern, responsive movie and series streaming website built with React and Vite. Discover, browse, and enjoy your favorite movies and TV shows with a sleek Netflix-inspired interface.

## ✨ Features

- 🎥 **Extensive Movie & TV Show Library** - Browse thousands of movies and series
- 🔍 **Smart Search** - Find content quickly with intelligent search functionality
- 📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Clean, intuitive interface inspired by popular streaming platforms
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎭 **Genre Filtering** - Discover content by categories and genres
- ⭐ **Ratings & Reviews** - See ratings and user reviews for informed viewing decisions
- 🔥 **Trending Content** - Stay updated with what's popular and trending


## 📸 Screenshots
![Home Screen](https://github.com/arpit2212/arpitflix/blob/main/src/assets/Screenshot%202025-08-15%20103920.png)
![movies card](https://github.com/arpit2212/arpitflix/blob/main/src/assets/Screenshot%202025-08-15%20103935.png?raw=true)
![moives details](https://github.com/arpit2212/arpitflix/blob/main/src/assets/Screenshot%202025-08-15%20103956.png?raw=true)
![movies cast](https://github.com/arpit2212/arpitflix/blob/main/src/assets/Screenshot%202025-08-15%20104028.png?raw=true)
![Movies extra detail](https://github.com/arpit2212/arpitflix/blob/main/src/assets/Screenshot%202025-08-15%20104047.png?raw=true)



## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** CSS3 / SCSS / Styled Components (specify which you're using)
- **State Management:** React Hooks / Redux (specify if used)
- **HTTP Client:** Axios / Fetch API
- **Movie Data:** TMDB API / OMDB API (specify which API you're using)
- **Deployment:** Vercel / Netlify / GitHub Pages (specify your deployment platform)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/arpit2212/arpitflix.git
   cd arpitflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here ( to get the api key of all the movie data login to TMBD and get free developer api key ) https://www.themoviedb.org/

   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Visit `http://localhost:5173` to see the application running.

## 🔑 API Setup

This project uses The Movie Database (TMDB) API for fetching movie and TV show data.
https://www.themoviedb.org/

1. **Get your API key:**
   - Visit [TMDB](https://www.themoviedb.org/)
   - Create an account and request an API key
   - Add the API key to your `.env` file

2. **API Documentation:**
   - [TMDB API Documentation](https://developers.themoviedb.org/3)

## 📁 Project Structure

```
arpitflix/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── MovieCard/
│   │   ├── Navbar/
│   │   └── Footer/
│   ├── pages/
│   │   ├── Home/
│   │   ├── MovieDetails/
│   │   ├── Search/
│   │   └── Browse/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code linting

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. **Fork the project**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Arpit**
- GitHub: [@arpit2212](https://github.com/arpit2212)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [React](https://reactjs.org/) for the amazing frontend framework
- [Vite](https://vitejs.dev/) for the fast build tool
- Inspiration from Netflix and other streaming platforms

## 🐛 Issues & Support

If you encounter any issues or have questions, please:
1. Check the [existing issues](https://github.com/arpit2212/arpitflix/issues)
2. Create a new issue if needed
3. Provide detailed information about the problem

## 📊 Project Status

🚧 **Status:** In Development

**Planned Features:**
- [ ] User authentication and profiles
- [ ] Watchlist functionality
- [ ] Video streaming integration
- [ ] Advanced filtering options
- [ ] Recommendation system
- [ ] Mobile app version

---

⭐ **If you found this project helpful, please give it a star!** ⭐
