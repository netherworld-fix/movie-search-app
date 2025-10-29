function App() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-4">🎬 Movie Search App</h1>
        <p className="text-2xl text-gray-300 mb-8">
          Discover movies, TV shows & more
        </p>

        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6">
          <p className="text-lg">API Status:</p>
          {apiKey ? (
            <p className="text-green-400 font-mono">
              ✅ TMDB API Key Loaded ({apiKey.substring(0, 8)}...)
            </p>
          ) : (
            <p className="text-red-400">❌ API Key Not Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
