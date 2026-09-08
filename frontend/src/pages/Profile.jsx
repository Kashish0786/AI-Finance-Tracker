

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useUser } from "@clerk/clerk-react";

// export default function Profile() {
//   const { user } = useUser();

//   const [income, setIncome] = useState("");
//   const [budget, setBudget] = useState("");
//   const [goal, setGoal] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [saved, setSaved] = useState(false);

//   // optional: existing data load (edit mode)
//   useEffect(() => {
//     if (!user) return;

//     axios
//       .get(`http://localhost:5000/api/users/${user.id}`)
//       .then((res) => {
//         if (res.data) {
//           setIncome(res.data.monthlyIncome || "");
//           setBudget(res.data.monthlyBudget || "");
//           setGoal(res.data.savingsGoal || "");
//         }
//       })
//       .catch(() => {});
//   }, [user]);

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post("http://localhost:5000/api/users/profile", {
//         clerkId: user.id,
//         name: user.fullName,
//         email: user.primaryEmailAddress.emailAddress,
//         monthlyIncome: Number(income),
//         monthlyBudget: Number(budget),
//         savingsGoal: Number(goal),
//       });

//       setSaved(true);
//     } catch (err) {
//       console.log(err);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

//       <form onSubmit={handleSave} className="space-y-4">
//         <input
//           type="number"
//           placeholder="Monthly Income"
//           value={income}
//           onChange={(e) => setIncome(e.target.value)}
//           className="w-full p-3 border rounded"
//         />

//         <input
//           type="number"
//           placeholder="Monthly Budget"
//           value={budget}
//           onChange={(e) => setBudget(e.target.value)}
//           className="w-full p-3 border rounded"
//         />

//         <input
//           type="number"
//           placeholder="Savings Goal"
//           value={goal}
//           onChange={(e) => setGoal(e.target.value)}
//           className="w-full p-3 border rounded"
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white p-3 rounded"
//         >
//           {loading ? "Saving..." : "Save Profile"}
//         </button>

//         {saved && (
//           <p className="text-green-600 text-sm">
//             Profile saved successfully 🎉
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser } from "@clerk/clerk-react";
// import { Flame, Sparkles, Trophy } from "lucide-react";

// export default function Profile() {
//   const { user } = useUser();

//   const [data, setData] = useState(null);

//   useEffect(() => {
//     if (!user) return;

//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/users/${user.id}`
//         );
//         setData(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   const name = user?.fullName || "WELCOME";
//   const email =
//     user?.primaryEmailAddress?.emailAddress || "guest@savesense.app";

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">

//       {/* GRID */}
//       <div className="grid lg:grid-cols-3 gap-5">

//         {/* LEFT PROFILE CARD */}
//         <div className="lg:col-span-1 text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">

//           {/* Avatar */}
//           <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-linear from-emerald-400 to-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
//             {name.charAt(0).toUpperCase()}
//           </div>

//           <h2 className="text-xl font-bold mt-4">{name}</h2>
//           <p className="text-xs text-gray-400">{email}</p>

//           {/* Personality */}
//           <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs">
//             <Sparkles className="w-3 h-3 text-violet-400" />
//             Saving Personality: <b>Steady Builder</b>
//           </div>

//           <p className="text-xs text-gray-400 mt-4">
//             Joined {new Date().toDateString()}
//           </p>
//         </div>

//         {/* RIGHT STATS */}
//         <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">

//           {/* LEVEL */}
//           <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
//             <Trophy className="w-5 h-5 text-yellow-400" />
//             <p className="text-xs text-gray-400 mt-3">Level</p>
//             <h3 className="text-2xl font-bold mt-1">7</h3>
//           </div>

//           {/* STREAK */}
//           <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
//             <Flame className="w-5 h-5 text-orange-400" />
//             <p className="text-xs text-gray-400 mt-3">Current Streak</p>
//             <h3 className="text-2xl font-bold mt-1">
//               {data?.streak || 0} days
//             </h3>
//           </div>

//           {/* BADGES */}
//           <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
//             <Sparkles className="w-5 h-5 text-violet-400" />
//             <p className="text-xs text-gray-400 mt-3">Badges</p>
//             <h3 className="text-2xl font-bold mt-1">
//               {data?.badges?.length || 0}/10
//             </h3>
//           </div>

//           {/* INCOME BOX */}
//           <div className="sm:col-span-3 p-5 rounded-2xl bg-white/5 border border-white/10">
//             <h3 className="font-semibold mb-4">Financial Overview</h3>

//             <div className="grid sm:grid-cols-3 gap-3">

//               <div className="p-4 rounded-xl bg-black/20">
//                 <p className="text-xs text-gray-400">Monthly Income</p>
//                 <h2 className="text-xl font-bold">
//                   ₹{data?.monthlyIncome || 0}
//                 </h2>
//               </div>

//               <div className="p-4 rounded-xl bg-black/20">
//                 <p className="text-xs text-gray-400">Budget</p>
//                 <h2 className="text-xl font-bold">
//                   ₹{data?.monthlyBudget || 0}
//                 </h2>
//               </div>

//               <div className="p-4 rounded-xl bg-black/20">
//                 <p className="text-xs text-gray-400">Savings Goal</p>
//                 <h2 className="text-xl font-bold">
//                   ₹{data?.savingsGoal || 0}
//                 </h2>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser } from "@clerk/clerk-react";
// import { Flame, Sparkles, Trophy } from "lucide-react";

// export default function Profile() {
//   const { user } = useUser();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     if (!user) return;

//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/users/${user.id}`
//         );
//         setData(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchProfile();
//   }, [user]);

//   const name = user?.fullName || user?.firstName || "WELCOME";
//   const email = user?.primaryEmailAddress?.emailAddress || "";

//   return (
//     <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      
//       <div className="max-w-6xl mx-auto">

//         {/* GRID */}
//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* LEFT PROFILE CARD */}
//           <div className="lg:col-span-1 p-6 rounded-2xl 
//             bg-white/5 backdrop-blur-2xl 
//             border border-white/10 shadow-xl">

//             {/* Avatar */}
//             <div className="w-24 h-24 mx-auto rounded-full 
//               bg-gradient-to-r from-emerald-400 to-blue-500 
//               flex items-center justify-center text-3xl font-bold shadow-lg">
//               {name.charAt(0).toUpperCase()}
//             </div>

//             <h2 className="text-xl font-bold mt-4 text-center">{name}</h2>
//             <p className="text-sm text-white/70 text-center">{email}</p>

//             {/* Personality */}
//             <div className="mt-5 flex items-center justify-center gap-2 
//               px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur">
//               <Sparkles className="w-4 h-4 text-violet-400" />
//               Saving Personality: <b>Steady Builder</b>
//             </div>

//             <p className="text-xs text-white/50 mt-5 text-center">
//               Joined {new Date().toDateString()}
//             </p>
//           </div>

//           {/* RIGHT STATS */}
//           <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">

//             {/* LEVEL */}
//             <div className="p-5 rounded-2xl 
//               bg-white/5 backdrop-blur-xl 
//               border border-white/10 shadow-md hover:scale-105 transition">
              
//               <Trophy className="w-5 h-5 text-yellow-400" />
//               <p className="text-sm text-white/60 mt-3">Level</p>
//               <h3 className="text-2xl font-bold">7</h3>
//             </div>

//             {/* STREAK */}
//             <div className="p-5 rounded-2xl 
//               bg-white/5 backdrop-blur-xl 
//               border border-white/10 shadow-md hover:scale-105 transition">

//               <Flame className="w-5 h-5 text-orange-400" />
//               <p className="text-sm text-white/60 mt-3">Current Streak</p>
//               <h3 className="text-2xl font-bold">
//                 {data?.streak || 0} days
//               </h3>
//             </div>

//             {/* BADGES */}
//             <div className="p-5 rounded-2xl 
//               bg-white/5 backdrop-blur-xl 
//               border border-white/10 shadow-md hover:scale-105 transition">

//               <Sparkles className="w-5 h-5 text-violet-400" />
//               <p className="text-sm text-white/60 mt-3">Badges</p>
//               <h3 className="text-2xl font-bold">
//                 {data?.badges?.length || 0}/10
//               </h3>
//             </div>

//             {/* FINANCIAL BOX */}
//             <div className="sm:col-span-3 p-6 rounded-2xl 
//               bg-white/5 backdrop-blur-2xl 
//               border border-white/10 shadow-xl">

//               <h3 className="text-lg font-semibold mb-5">
//                 Financial Overview
//               </h3>

//               <div className="grid sm:grid-cols-3 gap-4">

//                 <div className="p-4 rounded-xl bg-black/30 border border-white/10">
//                   <p className="text-xs text-white/60">Monthly Income</p>
//                   <h2 className="text-xl font-bold">
//                     ₹{data?.monthlyIncome || 0}
//                   </h2>
//                 </div>

//                 <div className="p-4 rounded-xl bg-black/30 border border-white/10">
//                   <p className="text-xs text-white/60">Budget</p>
//                   <h2 className="text-xl font-bold">
//                     ₹{data?.monthlyBudget || 0}
//                   </h2>
//                 </div>

//                 <div className="p-4 rounded-xl bg-black/30 border border-white/10">
//                   <p className="text-xs text-white/60">Savings Goal</p>
//                   <h2 className="text-xl font-bold">
//                     ₹{data?.savingsGoal || 0}
//                   </h2>
//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


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