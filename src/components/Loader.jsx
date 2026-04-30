const Loader = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center py-12 transition-colors duration-500">
      {/* Spinner */}
      <div className="relative mb-5 h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-teal-300 opacity-30"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-teal-600"></div>
      </div>

      {/* Text */}
      <h1 className="animate-pulse text-sm font-bold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
        Loading...
      </h1>
    </div>
  );
};

export default Loader;
