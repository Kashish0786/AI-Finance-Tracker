

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Flame, Sparkles, Trophy, Save } from "lucide-react";

export default function Profile() {
  const { user } = useUser();

  const [data, setData] = useState(null);

  const [form, setForm] = useState({
    monthlyIncome: "",
    savingsGoal: "",
  });

  // FETCH USER DATA
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${user.id}`
        );

        setData(res.data);

        setForm({
          monthlyIncome: res.data?.monthlyIncome || "",
          savingsGoal: res.data?.savingsGoal || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [user]);

  // SAVE DATA
  const handleSave = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/profile",
        {
          // userId: user.id,
           clerkId: user.id,
           name: user.fullName,
      email: user.primaryEmailAddress?.emailAddress,
          monthlyIncome: form.monthlyIncome,
          savingsGoal: form.savingsGoal,
        }
      );

      setData(res.data);
      alert("Profile updated 🚀");
    } catch (err) {
      console.log(err);
    }
  };

  const name = user?.fullName || "WELCOME";
  const email =
    user?.primaryEmailAddress?.emailAddress || "guest@Mail.com";

  return (
    <div className="min-h-screen px-4 py-12 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-1 p-6 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl">

            <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-r from-emerald-400 to-blue-500 flex items-center justify-center text-3xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-xl font-bold mt-4 text-center">{name}</h2>
            <p className="text-xs text-gray-400 text-center">{email}</p>

            <div className="mt-4 flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs">
                <Sparkles className="w-3 h-3 text-violet-400" />
                Steady Builder
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 grid gap-5">

            {/* STATS */}
            <div className="grid sm:grid-cols-3 gap-4">

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <p className="text-xs text-gray-400 mt-3">Level</p>
                <h3 className="text-2xl font-bold">7</h3>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <Flame className="w-5 h-5 text-orange-400" />
                <p className="text-xs text-gray-400 mt-3">Streak</p>
                <h3 className="text-2xl font-bold">
                  {data?.streak || 0} days
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <p className="text-xs text-gray-400 mt-3">Badges</p>
                <h3 className="text-2xl font-bold">
                  {data?.badges?.length || 0}
                </h3>
              </div>
            </div>

            {/* FORM */}
            <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl">

              <h3 className="text-lg font-semibold mb-4">
                Financial Setup
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">

                <input
                  type="number"
                  value={form.monthlyIncome}
                  onChange={(e) =>
                    setForm({ ...form, monthlyIncome: e.target.value })
                  }
                  placeholder="Monthly Income"
                  className="p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                />

                <input
                  type="number"
                  value={form.savingsGoal}
                  onChange={(e) =>
                    setForm({ ...form, savingsGoal: e.target.value })
                  }
                  placeholder="Savings Goal"
                  className="p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                />

              </div>

              <button
                onClick={handleSave}
                className="mt-5 w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-linear-to-r from-emerald-400 to-blue-500 text-black font-semibold"
              >
                <Save size={18} />
                Save Profile
              </button>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}