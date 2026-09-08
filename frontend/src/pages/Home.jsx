import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";

import {
  ArrowRight,
  PlayCircle,
  Coins,
  TrendingUp,
  Sparkles,
  Wallet,
  PiggyBank,
  LineChart,
  Flame,
  Heart,
  Brain,
  Trophy,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Budget Planner",
    desc: "Personalized budgets that adapt to how you actually spend.",
  },
  {
    icon: Wallet,
    title: "Expense Tracking",
    desc: "Quick-add expenses with smart auto-categorization.",
  },
  {
    icon: LineChart,
    title: "Goal Forecasting",
    desc: "Know exactly when you'll hit every savings goal.",
  },
  {
    icon: Flame,
    title: "Daily Saving Streak",
    desc: "Turn small wins into unstoppable habits.",
  },
  {
    icon: Heart,
    title: "Financial Health Score",
    desc: "A single number that captures your financial wellbeing.",
  },
  {
    icon: Sparkles,
    title: "Smart Saving Insights",
    desc: "Weekly nudges that uncover hidden room to save.",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-slate-950 text-white min-h-screen">
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-20">
        <FloatingCoins />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Financial Habit Coach
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Your money shouldn't{" "}
              <span className="text-emerald-400">
                disappear
              </span>
              <br />
              before month-end.
            </h1>

            <p className="mt-6 text-gray-400 text-lg max-w-xl">
              SaveSense uses AI to understand your spending habits,
              build smarter budgets, and turn saving into a daily streak.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-xl font-semibold"
              >
                Start Saving
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/features"
                className="flex items-center gap-2 border border-gray-700 px-6 py-3 rounded-xl"
              >
                <PlayCircle size={18} />
                Watch Demo
              </Link>
            </div>

            {/* <div className="mt-10 grid grid-cols-3 gap-5">
              <Stat value={47} suffix="K+" label="Savers" />
              <Stat value={92} suffix="%" label="Hit goals" />
              <Stat value={28} suffix=" days" label="Avg streak" />
            </div> */}
          </motion.div>

          <HeroDashboard />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-12">
          Everything you need to build the habit
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-black" />
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-400 mt-3">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-violet-400 mb-3">
                Savings Habit Builder
              </p>

              <h2 className="text-4xl font-bold">
                A year of saving at a glance
              </h2>

              <p className="text-gray-400 mt-4">
                Build streaks, unlock badges, and track your
                consistency .
              </p>
            </div>

            <MiniHeatmap />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
          <Trophy className="mx-auto text-yellow-400 mb-4" size={40} />

          <h2 className="text-4xl font-bold">
            Start a streak that pays you back
          </h2>

          <p className="text-gray-400 mt-4">
            Join thousands building real savings habits.
          </p>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-xl font-semibold mt-8"
          >
            Create Free Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

// function Stat({ value, suffix, label }) {
//   return (
//     <div>
//       <div className="text-2xl font-bold">
//         <CountUp end={value} suffix={suffix} duration={2} />
//       </div>

//       <div className="text-gray-400 text-sm">
//         {label}
//       </div>
//     </div>
//   );
// }
function Stat({ value, suffix, label }) {
  return (
    <div>
      <div className="text-2xl font-bold">
        {value}{suffix}
      </div>

      <div className="text-sm text-gray-400">
        {label}
      </div>
    </div>
  );
}

function FloatingCoins() {
  const items = [
    { Icon: Coins, left: "8%", top: "10%" },
    { Icon: PiggyBank, left: "90%", top: "20%" },
    { Icon: TrendingUp, left: "5%", top: "75%" },
    { Icon: Sparkles, left: "92%", top: "78%" },
  ];

  return (
    <>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block text-emerald-400"
          style={{
            left: item.left,
            top: item.top,
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
          }}
        >
          <item.Icon size={28} />
        </motion.div>
      ))}
    </>
  );
}

function HeroDashboard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-lg">
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-gray-400 text-sm">
            Total Saved
          </p>

          <h2 className="text-3xl font-bold">
            ₹48,250
          </h2>
        </div>

        <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <TrendingUp size={14} />
          +12.4%
        </div>
      </div>

      <div className="h-24 flex items-end gap-2">
        {[20, 35, 28, 50, 45, 65, 58, 78, 70, 88, 82, 95].map(
          (h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.05 }}
              className="flex-1 rounded bg-emerald-500"
            />
          )
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        <MiniStat
          icon={Flame}
          value="28d"
          label="Streak"
        />

        <MiniStat
          icon={Target}
          value="3/5"
          label="Goals"
        />

        <MiniStat
          icon={Heart}
          value="86"
          label="Score"
        />
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, value, label }) {
  return (
    <div className="bg-slate-800 rounded-xl p-3">
      <Icon className="text-emerald-400 mb-2" size={18} />
      <div className="font-semibold">{value}</div>
      <div className="text-xs text-gray-400">
        {label}
      </div>
    </div>
  );
}

function MiniHeatmap() {
  const cells = Array.from({ length: 126 }, (_, i) => {
    const v = (Math.sin(i * 1.3) + 1) / 2;

    return v < 0.35
      ? "bg-gray-700"
      : v < 0.55
      ? "bg-green-800"
      : v < 0.75
      ? "bg-green-600"
      : "bg-green-400";
  });

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1">
      {cells.map((color, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.003 }}
          className={`w-4 h-4 rounded ${color}`}
        />
      ))}
    </div>
  );
}