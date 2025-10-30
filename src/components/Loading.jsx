function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-2xl">🎬</span>
        </div>
      </div>
      <p className="text-white text-lg mt-4">Loading...</p>
    </div>
  );
}

export default Loading;
