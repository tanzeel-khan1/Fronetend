const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen   transition-colors duration-500">
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-purple-300 opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
      </div>

      {/* Text */}
      <h1 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 tracking-wide animate-pulse">
        Loading...
      </h1>
    </div>
  );
};

export default Loader;
