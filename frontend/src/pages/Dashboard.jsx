
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

import {
  Wallet,
  PiggyBank,
  TrendingUp,
  ArrowDown,
  Sparkles,
  Target,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const { user } = useUser();
  const [subscriptions, setSubscriptions] = useState([]);


  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {

        const res = await axios.get(
          `http://localhost:5000/api/users/${user.id}`
        );

        setData(res.data);

        const subRes = await axios.get(
        `http://localhost:5000/api/subscriptions/${user.id}`
      );

      setSubscriptions(subRes.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [user]);

  const income = Number(data?.monthlyIncome || 0);

  const goal = Number(data?.savingsGoal || 0);

  // const expense =
  //   data?.expenses?.reduce(
  //     (sum, item) => sum + item.amount,
  //     0
  //   ) || 0;

  // const saved = income - expense;

  // const savingRate =
  //   income > 0
  //     ? ((saved / income) * 100).toFixed(1)
  //     : 0;

  // const chartData =
  //   income > 0
  //     ? [
  //         {
  //           name: "Income",
  //           value: income,
  //         },
  //         {
  //           name: "Expense",
  //           value: expense,
  //         },
  //         {
  //           name: "Saved",
  //           value: saved,
  //         },
  //         {
  //           name: "Goal",
  //           value: goal,
  //         },
  //       ]
  //     : [];

  const normalExpense =
  data?.expenses?.reduce(
    (sum, item) => sum + item.amount,
    0
  ) || 0;


const subscriptionExpense =
  subscriptions.reduce(
    (sum, sub) => sum + Number(sub.amount),
    0
  );


const expense = normalExpense + subscriptionExpense;


const saved = income - expense;


const savingRate =
  income > 0
    ? ((saved / income) * 100).toFixed(1)
    : 0;


const chartData =
  income > 0
    ? [
        {
          name: "Income",
          value: income,
        },
        {
          name: "Expense",
          value: expense,
        },
        {
          name: "Saved",
          value: saved,
        },
        {
          name: "Goal",
          value: goal,
        },
      ]
    : [];

  return (
    <div className="min-h-screen px-6 py-10 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

      <h1 className="text-3xl font-bold mb-2">
        Welcome, {user?.fullName}
      </h1>

      <p className="text-gray-400 mb-8">
        Here's your financial overview.
      </p>

      {/* CARDS */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">

        {/* INCOME */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-105 transition duration-300 shadow-lg">

          <Wallet className="text-blue-400" size={28} />

          <p className="text-gray-400 text-sm mt-3">
            Monthly Income
          </p>

          <h2 className="text-2xl font-bold mt-2">
            ₹{income}
          </h2>

        </div>

        {/* GOAL */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-105 transition duration-300 shadow-lg">

          <Target className="text-yellow-400" size={28} />

          <p className="text-gray-400 text-sm mt-3">
            Savings Goal
          </p>

          <h2 className="text-2xl font-bold mt-2">
            ₹{goal}
          </h2>

        </div>

        {/* EXPENSE */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-105 transition duration-300 shadow-lg">

          <ArrowDown className="text-red-400" size={28} />

          <p className="text-gray-400 text-sm mt-3">
            Total Expense
          </p>

          <h2 className="text-2xl font-bold mt-2">
            ₹{expense}
          </h2>


          <p className="text-xs text-white/40 mt-2">
               Includes subscriptions ₹{subscriptionExpense}
          </p>

        </div>

        {/* SAVED */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-105 transition duration-300 shadow-lg">

          <PiggyBank className="text-emerald-400" size={28} />

          <p className="text-gray-400 text-sm mt-3">
            Total Saved
          </p>

          <h2 className="text-2xl font-bold mt-2">
            ₹{saved}
          </h2>

        </div>

        {/* RATE */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:scale-105 transition duration-300 shadow-lg">

          <TrendingUp className="text-violet-400" size={28} />

          <p className="text-gray-400 text-sm mt-3">
            Saving Rate
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {savingRate}%
          </h2>

        </div>

      </div>

      {/* EMPTY STATE */}

      {income === 0 && (
        <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">

          <Sparkles
            size={40}
            className="mx-auto text-violet-400"
          />

          <h2 className="text-2xl font-bold mt-4">
            Dashboard Locked
          </h2>

          <p className="text-gray-400 mt-2">
            Add Monthly Income and Savings Goal
            from Profile page.
          </p>

        </div>
      )}

      {/* GRAPH */}

      {chartData.length > 0 && (
        <div className="mt-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg">

          <h2 className="text-xl font-semibold mb-5">
            Financial Overview
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={chartData}>

                <CartesianGrid
                  stroke="#ffffff15"
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="name"
                  stroke="#aaa"
                />

                <YAxis stroke="#aaa" />

                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #333",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                />

                <Bar
                  dataKey="value"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>
      )}
    </div>
  );
}