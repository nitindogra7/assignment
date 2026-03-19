export default function Loading({ text  }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-dvh">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-white/10"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
      </div>
      <p className="text-sm text-gray-400 animate-pulse">{text}</p>
    </div>
  );
}