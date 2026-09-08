import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";

import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const availableSubscriptions = [
  {
    app: "Netflix",
    category: "Streaming",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    color: "from-red-500 to-red-700",
    plans: [
      { name: "Mobile", amount: 149, cycle: "Monthly" },
      { name: "Basic", amount: 199, cycle: "Monthly" },
      { name: "Standard", amount: 499, cycle: "Monthly" },
      { name: "Premium", amount: 649, cycle: "Monthly" },
    ],
  },
  {
    app: "Amazon Prime",
    category: "Streaming",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Amazon_Prime_logo_%282022%29.svg",
    color: "from-sky-500 to-cyan-400",
    plans: [
      { name: "Monthly", amount: 299, cycle: "Monthly" },
      { name: "Quarterly", amount: 599, cycle: "Quarterly" },
      { name: "Annual", amount: 1499, cycle: "Yearly" },
    ],
  },
  {
    app: "Disney+ Hotstar",
    category: "Streaming",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Disney%2B_Hotstar_2024.svg",
    color: "from-blue-500 to-indigo-700",
    plans: [
      { name: "Mobile", amount: 149, cycle: "Quarterly" },
      { name: "Super", amount: 299, cycle: "Quarterly" },
      { name: "Premium", amount: 1499, cycle: "Yearly" },
    ],
  },

  {
    app: "Spotify",
    category: "Music",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    color: "from-green-500 to-emerald-500",
    plans: [
      { name: "Student", amount: 59, cycle: "Monthly" },
      { name: "Individual", amount: 119, cycle: "Monthly" },
      { name: "Duo", amount: 149, cycle: "Monthly" },
      { name: "Family", amount: 179, cycle: "Monthly" },
    ],
  },
   {
    app: "Apple Music",
    category: "Music",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg",
    color: "from-pink-500 to-red-500",
    plans: [
      { name: "Student", amount: 59, cycle: "Monthly" },
      { name: "Individual", amount: 119, cycle: "Monthly" },
      { name: "Family", amount: 179, cycle: "Monthly" },
    ],
  },
   {
    app: "YouTube Premium",
    category: "Streaming",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png",
    color: "from-red-500 to-pink-500",
    plans: [
      { name: "Individual", amount: 149, cycle: "Monthly" },
      { name: "Family", amount: 299, cycle: "Monthly" },
      { name: "Student", amount: 89, cycle: "Monthly" },
    ],
  },
    {
    app: "Canva Pro",
    category: "Productivity",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/bb/Canva_Logo.svg",
    color: "from-cyan-400 to-blue-500",
    plans: [
      { name: "Pro", amount: 500, cycle: "Monthly" },
    ],
  },
  {
    app: "ChatGPT Plus",
    category: "AI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    color: "from-emerald-500 to-teal-600",
    plans: [
      { name: "Plus", amount: 1700, cycle: "Monthly" },
    ],
  },
   {
    app: "LinkedIn Premium",
    category: "Education",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    color: "from-blue-600 to-sky-500",
    plans: [
      { name: "Career", amount: 1599, cycle: "Monthly" },
    ],
  },


];

const categories = [
  "Active",
  "Streaming",
  "Music",
  "AI",
  "Productivity",
  "Education",
];

export default function Subscriptions() {
  const { user } = useUser();
  const [subscriptions, setSubscriptions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("null");

  // ✅ FETCH SUBSCRIPTIONS
  const fetchSubscriptions = useCallback(async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/subscriptions/${user.id}`
      );
     
      setSubscriptions(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  // ✅ ADD SUBSCRIPTION
  const addSubscription = async (service, plan) => {
    try {
      await axios.post("http://localhost:5000/api/subscriptions", {
        clerkId: user.id,
        appName: service.app,
        plan: plan.name,
        amount: plan.amount,
        billingCycle: plan.cycle,
        logo: service.logo,
        nextBillingDate: new Date(),
      });
//toast.success("Subscription added successfully!");
      await fetchSubscriptions();
      setInsights(null);

      toast.success("Subscription added successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add subscription!");
    }
  };

  // ✅ DELETE SUBSCRIPTION
  const deleteSub = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/subscriptions/${id}`
      );
//toast.success("Subscription cancelled successfully!");
      await fetchSubscriptions();
      setInsights(null);

      toast.success("Subscription cancelled successfully!");

      setSubscriptions((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to cancel subscription!");
    }
  };

// ✅ GENERATE INSIGHTS
const generateInsights = async (subs = subscriptions) => {
  if (subscriptions.length === 0) {
    setInsights("Add some subscriptions first.");
    return;
  }

  try {
    setLoadingInsights(true);

    const res = await axios.post(
      "http://localhost:5000/api/ai/subscription-insights",
      {
        subscriptions,
      }
    );

    setInsights(res.data);
  } catch (err) {
    console.log(err);
    setInsights("Unable to generate insights.");
  } finally {
    setLoadingInsights(false);
  }
};

const filteredActive = subscriptions.filter((sub) =>
  sub.appName.toLowerCase().includes(search.toLowerCase())
);

const filteredAvailable = availableSubscriptions.filter(
  (service) => service.category === selectedCategory
);

// Prepare data for the bar chart
const spendingData = subscriptions.map((sub) => ({
  name: sub.appName,
  amount: sub.amount,
}));

return (
  <div className="space-y-10 text-white bg-[#0a0a0a] min-h-screen p-6">

    {/* HEADER */}
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xs tracking-[0.3em] text-white/50 uppercase">
          Subscriptions
        </h2>
        <h1 className="text-3xl font-bold mt-1 text-white">
          Subscription manager
        </h1>
      </div>

<div className="relative w-80">
  <input
    type="text"
    placeholder="Search Netflix, Spotify..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-2xl bg-white/5 border border-white/10 py-3 pl-11 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400 transition"
  />

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-0.5 w-5 h-5 text-white/40"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
    />
  </svg>
</div>

    </div>

{/* INSIGHTS */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="rounded-3xl border border-cyan-500/20 bg-linear-to-r from-cyan-500/10 via-slate-900 to-emerald-500/10 p-6"
>
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold">
        🤖 AI Insights
      </h2>

      <p className="text-white/60 mt-1">
        Personalized recommendations based on your subscriptions.
      </p>
    </div>

    <button
      onClick={generateInsights}
      disabled={loadingInsights}
      className="px-5 py-2 rounded-xl bg-linear-to-r from-cyan-400 to-emerald-400 text-black font-semibold hover:scale-105 transition"
    >
      {loadingInsights ? "Generating..." : "Generate"}
    </button>
  </div>

  <div className="mt-6 min-h-55">
    {loadingInsights ? (
      <div className="flex items-center justify-center h-48">
        <p className="text-white/60 animate-pulse text-lg">
          🤖 AI is analyzing your subscriptions...
        </p>
      </div>
    ) : insights ? (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

        <div className="rounded-2xl bg-cyan-500/10 border border-cyan-400/20 p-5">
          <p className="text-white/60 text-sm">
            💰 Monthly Spending
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {insights.totalSpending}
          </h2>
        </div>

        <div className="rounded-2xl bg-red-500/10 border border-red-400/20 p-5">
          <p className="text-white/60 text-sm">
            🔥 Most Expensive
          </p>

          <h3 className="font-semibold mt-2 text-lg">
            {insights.mostExpensive.appName}
          </h3>

          <p className="text-white/60">
            {insights.mostExpensive.plan}
          </p>

          <p className="text-red-300 font-semibold">
            ₹{insights.mostExpensive.amount} / {insights.mostExpensive.billingCycle}
          </p>
        </div>

        <div className="rounded-2xl bg-green-500/10 border border-green-400/20 p-5">
          <p className="text-white/60 text-sm">
            💚 Cheapest
          </p>

          <h3 className="font-semibold mt-2 text-lg">
            {insights.cheapest.appName}
          </h3>

           <p className="text-white/60">
              {insights.cheapest.plan}
            </p>

            <p className="text-green-300 font-semibold">
               ₹{insights.cheapest.amount} / {insights.cheapest.billingCycle}
            </p>
        </div>

        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-400/20 p-5">
          <p className="text-white/60 text-sm">
            💸 Possible Savings
          </p>

          <h3 className="font-semibold text-yellow-300 mt-2 text-lg">
            {insights.possibleSavings}
          </h3>
        </div>

        <div className="rounded-2xl bg-purple-500/10 border border-purple-400/20 p-5">
          <p className="text-white/60 text-sm">
            📺 Duplicate Services
          </p>

          <h3 className="font-semibold mt-2 text-lg">
            {insights.duplicateServices}
          </h3>
        </div>

        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-5 md:col-span-2 xl:col-span-1">
          <p className="text-white/60 text-sm">
            🤖 AI Recommendation
          </p>

          <p className="mt-3 leading-7 text-white/90">
            {insights.recommendations || "No recommendation available."}
          </p>
        </div>

      </div>
    ) : (
      <div className="flex items-center justify-center h-48 rounded-2xl border border-dashed border-white/20 bg-black/20">
        <p className="text-white/50 text-lg">
          Click <span className="font-semibold text-cyan-300">Generate</span> to receive AI insights about your subscriptions.
        </p>
      </div>
    )}
  </div>
</motion.div>
{/* INSIGHTS Done */}

{/* CATEGORY FILTER */}
<div className="flex flex-wrap gap-3 mb-8">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`px-5 py-2 rounded-full transition font-medium ${
        selectedCategory === category
          ? "bg-cyan-400 text-black"
          : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
      }`}
    >
      {category}
    </button>
  ))}

    <p className="text-white/60 font-bold mt-2 text-sm sm:text-base md:text-lg text-center">
      Choose a category above to view subscriptions.
    </p>

</div>


    {/* AVAILABLE SUBSCRIPTIONS */}
    <div className="grid lg:grid-cols-3 gap-6">
      {filteredAvailable.map((service) => (
        <motion.div
          key={service.app}
          whileHover={{ y: -8 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-lg"
        >

          <div
            className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 bg-linear-to-br ${service.color}`}
          />

          <div className="relative p-6">
            {/* TOP */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={service.logo}
                className="w-14 h-14 rounded-2xl bg-white p-2"
              />

              <div>
                <h2 className="text-xl font-bold text-white">
                  {service.app}
                </h2>
                <p className="text-white/50 text-sm">
                  Choose your plan
                </p>
              </div>
            </div>

            {/* PLANS */}
            <div className="space-y-3">
              {service.plans.map((plan) => (
                <div
                  key={plan.name}
                  className="flex items-center justify-between rounded-2xl bg-black/40 border border-white/10 p-4 hover:border-emerald-400 transition"
                >
                  <div>
                    <h4 className="font-semibold text-white">
                      {plan.name}
                    </h4>
                    <p className="text-sm text-white/60">
                      ₹{plan.amount} / {plan.cycle}
                    </p>
                  </div>

                  <button
                    onClick={() => addSubscription(service, plan)}
                    className="px-4 py-2 rounded-xl bg-linear-to-r from-emerald-400 to-cyan-400 text-black font-semibold hover:scale-105 transition"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

{/* ANALYTICS GRAPH */}

<div className="rounded-3xl bg-linear-to-br from-emerald-500/10 via-slate-900 to-cyan-500/10 backdrop-blur-xl border border-emerald-400/20 p-6 shadow-lg">

  <div className="mb-6 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        📊 Subscription Analytics
      </h2>

      <p className="text-white/60 mt-1">
        Monthly spending breakdown of your subscriptions.
      </p>
    </div>

    <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20">
      📈
    </div>
  </div>


  {subscriptions.length === 0 ? (

    <div className="h-60 flex flex-col gap-2 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-black/20">
      <p className="text-white/70 text-lg">
        No data available 📭
      </p>

      <p className="text-white/40 text-sm">
        Add subscriptions to see analytics.
      </p>
    </div>

  ) : (

    <div className="rounded-2xl bg-black/30 p-4 border border-white/10">

      <ResponsiveContainer width="100%" height={320}>

        <BarChart 
          data={spendingData}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >

          <CartesianGrid 
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
          />

          <XAxis
            dataKey="name"
            tick={{fill:"#ffffff", fontSize:12}}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{fill:"#ffffff", fontSize:12}}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background:"#0f172a",
              border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:"12px",
              color:"#fff"
            }}
          />

          <Bar
            dataKey="amount"
            fill="#34d399"
            radius={[12,12,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  )}

</div>
   
    {/* ACTIVE SUBSCRIPTIONS */}
    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
      <h2 className="text-2xl font-bold mb-5 text-white">
        My Active Subscriptions
      </h2>

      {subscriptions.length === 0 ? (
        <div className="text-center text-white/50 py-6">
        <p className="text-lg">No subscriptions added yet 🎯</p>
        <p className="text-sm mt-2"> Explore categories above and add your subscriptions to start tracking them.</p>
       </div>
      ) : (
        <div className="space-y-3">
          {filteredActive.map((sub) => (
            <div
              key={sub._id}
              className="flex items-center justify-between rounded-2xl bg-black/40 p-4 border border-white/10 hover:border-white/20 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <img
                  src={sub.logo}
                  className="w-10 h-10 rounded-xl bg-white p-1"
                />

                <div>
                  <h3 className="font-semibold text-white">
                    {sub.appName}
                  </h3>
                  <p className="text-sm text-white/60">
                    {sub.plan} • ₹{sub.amount}/{sub.billingCycle}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-300 border border-green-500/20">
                  Active
                </span>

                <button
                  onClick={() => deleteSub(sub._id)}
                  className="px-3 py-2 rounded-xl bg-red-500 text-white text-sm hover:scale-105 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
