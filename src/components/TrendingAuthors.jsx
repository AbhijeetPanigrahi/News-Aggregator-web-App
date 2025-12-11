import React from "react";

const TrendingAuthors = () => {
  const authors = [
    { name: "Adam Strong", followers: "14.3K", id: "50" },
    { name: "Samantha Hayes", followers: "18.7K", id: "32" },
  ];

  return (
    <div className="mt-8 pt-8">
      <h3 className="text-2xl font-bold text-text-primary mb-6">Trending authors</h3>
      <div className="flex flex-col gap-6">
        {authors.map((author, index) => (
          <div key={index} className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
              <img src={`https://i.pravatar.cc/150?u=${author.id}`} alt={author.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-base font-bold text-text-primary leading-tight group-hover:text-black dark:group-hover:text-white transition-colors">{author.name}</span>
              <span className="text-sm text-text-muted mt-0.5">{author.followers} followers</span>
            </div>
            <div className="w-8 h-8 flex items-center justify-center text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
              <span className="text-lg">↗</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingAuthors;
