import { Heart, Shield, Sparkles } from "lucide-react";

export default function About() {
  const cards = [
    {
      icon: Heart,
      title: "Calm by design",
      body: "No guilt. No clutter. Just gentle, intelligent nudges.",
    },
    {
      icon: Sparkles,
      title: "AI that explains",
      body: "Every insight comes with a reason and a next step.",
    },
    {
      icon: Shield,
      title: "Privacy first",
      body: "Your data stays yours. Encryption everywhere.",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            About SaveSense
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We believe saving is a habit, not a sacrifice. SaveSense is the AI
            coach that makes the habit stick.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="
                  p-6 rounded-2xl
                  bg-gray-100 dark:bg-white/5
                  backdrop-blur-xl
                  border border-gray-200 dark:border-white/10
                  shadow-lg
                  transition
                  hover:scale-105
                "
              >
                <Icon className="w-8 h-8 text-emerald-500 mb-4" />

                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {card.title}
                </h3>

                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div
          className="
            mt-10 p-8 rounded-3xl
            bg-gray-100 dark:bg-white/5
            backdrop-blur-xl
            border border-gray-200 dark:border-white/10
          "
        >
          <h2 className="text-3xl font-bold text-black dark:text-white">
            Our Mission
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-4xl leading-8">
            Most people don't have a money problem — they have a habit problem.
            We're building the most beautiful, encouraging way to turn financial
            intent into daily action. SaveSense exists so your money stops
            disappearing before month-end and starts compounding into the life
            you want.
          </p>
        </div>
        
      </div>
    </div>
  );
}