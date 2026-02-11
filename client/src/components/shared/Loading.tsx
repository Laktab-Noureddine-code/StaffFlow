function Loading() {
  return (
    <div className="flex-col min-h-screen gap-4 w-full flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent text-[#4ea376] text-4xl animate-spin flex items-center justify-center border-t-[#4ea376] rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-green-400 text-2xl animate-spin flex items-center justify-center border-t-green-400 rounded-full"></div>
      </div>
    </div>
  );
}

export default Loading;
