"use client";

const categories = [
  {
    name: "Fiction",
    icon: "📚",
    count: "2.4M titles",
    gradient: "from-teal-600 to-teal-700",
  },
  {
    name: "Non-Fiction",
    icon: "📖",
    count: "1.8M titles",
    gradient: "from-emerald-600 to-emerald-700",
  },
  {
    name: "Children's Books",
    icon: "🧸",
    count: "950K titles",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    name: "Science & Tech",
    icon: "🔬",
    count: "1.2M titles",
    gradient: "from-blue-600 to-blue-700",
  },
  {
    name: "Art & Design",
    icon: "🎨",
    count: "680K titles",
    gradient: "from-purple-600 to-purple-700",
  },
  {
    name: "History",
    icon: "🏛️",
    count: "890K titles",
    gradient: "from-stone-600 to-stone-700",
  },
  {
    name: "Romance",
    icon: "💕",
    count: "1.1M titles",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    name: "Mystery & Thriller",
    icon: "🔍",
    count: "780K titles",
    gradient: "from-slate-600 to-slate-700",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-teal-50/50" id="categories-section">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-teal-900">
            Browse by Category
          </h2>
          <p className="text-teal-600 mt-2 max-w-md mx-auto">
            Explore our vast collection organized just for you
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {categories.map((category, i) => (
            <a
              key={i}
              href="#"
              className={`group relative bg-gradient-to-br ${category.gradient} rounded-2xl p-5 md:p-6 text-white overflow-hidden hover-lift`}
              id={`category-${category.name.toLowerCase().replace(/[^a-z]/g, "")}`}
            >
              {/* Decorative circle */}
              <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute -right-2 -top-2 w-12 h-12 rounded-full bg-white/5 group-hover:scale-125 transition-transform duration-500" />

              <span className="text-3xl md:text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>
              <h3 className="font-heading font-bold text-base md:text-lg leading-tight">
                {category.name}
              </h3>
              <p className="text-white/70 text-xs mt-1">{category.count}</p>

              {/* Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
