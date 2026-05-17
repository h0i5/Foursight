export default function Loading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 mb-16">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="h-4 w-32 bg-foreground/10 mb-8 mt-8" />
        <div className="h-10 w-48 bg-foreground/10 mb-2" />
        <div className="h-5 w-24 bg-foreground/10 mb-8" />
        <div className="h-64 w-full bg-foreground/10 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-20 bg-foreground/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
