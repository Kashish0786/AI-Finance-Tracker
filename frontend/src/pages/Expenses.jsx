

// import { useState } from "react";
// import {
//   Plus,
//   Trash2,
//   CreditCard,
//   IndianRupee,
//   Calendar,
//   Mic,
//   Camera,
//   Utensils,
//   Car,
//   ShoppingBag,
//   Receipt,
//   Tv,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const catIcons = {
//   Food: Utensils,
//   Transport: Car,
//   Shopping: ShoppingBag,
//   Bills: Receipt,
//   Entertainment: Tv,
// };

// const cats = Object.keys(catIcons);

// export default function Expenses() {
//   const [expenses, setExpenses] = useState([]);

//   const [amount, setAmount] = useState("");
//   const [cat, setCat] = useState("Food");
//   const [note, setNote] = useState("");

//   const [subscriptions, setSubscriptions] = useState([
//     {
//       id: 1,
//       app: "Netflix",
//       plan: "Premium",
//       amount: 649,
//       color: "from-red-500 to-red-700",
//       logo:
//         "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
//     },
//     {
//       id: 2,
//       app: "Prime",
//       plan: "Annual",
//       amount: 1499,
//       color: "from-blue-500 to-cyan-500",
//       logo:
//         "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
//     },
//     {
//       id: 3,
//       app: "Spotify",
//       plan: "Premium",
//       amount: 119,
//       color: "from-green-500 to-emerald-600",
//       logo:
//         "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
//     },
//   ]);

//   const [emiForm, setEmiForm] = useState({
//     name: "",
//     amount: "",
//     dueDate: "",
//   });

//   const [emis, setEmis] = useState([]);

//   const addExpense = (e) => {
//     e.preventDefault();

//     if (!amount) return;

//     const newExpense = {
//       id: Date.now(),
//       category: cat,
//       amount: Number(amount),
//       note,
//       date: new Date().toLocaleDateString(),
//     };

//     setExpenses([newExpense, ...expenses]);

//     setAmount("");
//     setNote("");
//   };

//   const addEmi = () => {
//     if (!emiForm.name || !emiForm.amount) return;

//     setEmis([
//       ...emis,
//       {
//         id: Date.now(),
//         ...emiForm,
//       },
//     ]);

//     setEmiForm({
//       name: "",
//       amount: "",
//       dueDate: "",
//     });
//   };

//   const deleteSub = (id) => {
//     setSubscriptions(
//       subscriptions.filter((item) => item.id !== id)
//     );
//   };

//   const deleteEmi = (id) => {
//     setEmis(emis.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="min-h-screen p-6 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

//       <h1 className="text-3xl font-bold mb-8">
//         Expense Manager
//       </h1>

//       {/* SUBSCRIPTIONS */}
//       <div className="mb-10">
//         <h2 className="text-xl font-semibold mb-5">
//           Active Subscriptions
//         </h2>

//         <div className="grid md:grid-cols-3 gap-5">
//           {subscriptions.map((sub) => (
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               key={sub.id}
//               className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
//             >
//               <div className="flex justify-between items-center">
//                 <img
//                   src={sub.logo}
//                   alt=""
//                   className="h-8 object-contain"
//                 />

//                 <button
//                   onClick={() => deleteSub(sub.id)}
//                 >
//                   <Trash2 className="text-red-400" />
//                 </button>
//               </div>

//               <h3 className="mt-5 text-xl font-bold">
//                 {sub.app}
//               </h3>

//               <p className="text-gray-400">
//                 {sub.plan} Plan
//               </p>

//               <div className="mt-4 text-3xl font-bold">
//                 ₹{sub.amount}
//               </div>

//               <p className="text-sm text-gray-400 mt-2">
//                 Monthly Billing
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* EMI */}
//       <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 mb-10">

//         <h2 className="text-xl font-semibold mb-5 flex gap-2 items-center">
//           <CreditCard />
//           EMI Tracker
//         </h2>

//         <div className="grid md:grid-cols-4 gap-4">

//           <input
//             placeholder="EMI Name"
//             value={emiForm.name}
//             onChange={(e) =>
//               setEmiForm({
//                 ...emiForm,
//                 name: e.target.value,
//               })
//             }
//             className="p-3 rounded-xl bg-black/30 border border-white/10"
//           />

//           <input
//             placeholder="Amount"
//             value={emiForm.amount}
//             onChange={(e) =>
//               setEmiForm({
//                 ...emiForm,
//                 amount: e.target.value,
//               })
//             }
//             className="p-3 rounded-xl bg-black/30 border border-white/10"
//           />

//           <input
//             type="date"
//             value={emiForm.dueDate}
//             onChange={(e) =>
//               setEmiForm({
//                 ...emiForm,
//                 dueDate: e.target.value,
//               })
//             }
//             className="p-3 rounded-xl bg-black/30 border border-white/10"
//           />

//           <button
//             onClick={addEmi}
//             className="rounded-xl bg-emerald-500 text-black font-semibold"
//           >
//             Add EMI
//           </button>
//         </div>

//         <div className="mt-5 space-y-3">
//           {emis.map((emi) => (
//             <div
//               key={emi.id}
//               className="flex justify-between items-center p-4 rounded-xl bg-black/20"
//             >
//               <div>
//                 <h3 className="font-semibold">
//                   {emi.name}
//                 </h3>

//                 <p className="text-gray-400 text-sm">
//                   ₹{emi.amount}
//                 </p>

//                 <p className="text-xs text-gray-500">
//                   {emi.dueDate}
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   deleteEmi(emi.id)
//                 }
//               >
//                 <Trash2 className="text-red-400" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* QUICK ADD */}
//       <div className="grid lg:grid-cols-3 gap-5">

//         <div className="rounded-3xl p-5 bg-white/5 backdrop-blur-xl border border-white/10">

//           <h2 className="flex items-center gap-2 font-semibold mb-5">
//             <Plus />
//             Quick Expense
//           </h2>

//           <form
//             onSubmit={addExpense}
//             className="space-y-4"
//           >
//             <input
//               type="number"
//               placeholder="Amount"
//               value={amount}
//               onChange={(e) =>
//                 setAmount(e.target.value)
//               }
//               className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
//             />

//             <div className="flex flex-wrap gap-2">
//               {cats.map((c) => {
//                 const Icon = catIcons[c];

//                 return (
//                   <button
//                     type="button"
//                     key={c}
//                     onClick={() => setCat(c)}
//                     className={`flex items-center gap-2 px-3 py-2 rounded-full ${
//                       cat === c
//                         ? "bg-emerald-500 text-black"
//                         : "bg-white/10"
//                     }`}
//                   >
//                     <Icon size={14} />
//                     {c}
//                   </button>
//                 );
//               })}
//             </div>

//             <input
//               placeholder="Note"
//               value={note}
//               onChange={(e) =>
//                 setNote(e.target.value)
//               }
//               className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
//             />

//             <div className="flex gap-3">
//               <button className="flex-1 p-3 rounded-xl bg-emerald-500 text-black font-semibold">
//                 Add Expense
//               </button>

//               <button
//                 type="button"
//                 className="w-12 rounded-xl bg-white/10"
//               >
//                 <Mic size={18} />
//               </button>

//               <button
//                 type="button"
//                 className="w-12 rounded-xl bg-white/10"
//               >
//                 <Camera size={18} />
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* EXPENSE LIST */}

//         <div className="lg:col-span-2 space-y-4">

//           <AnimatePresence>
//             {expenses.map((e) => {
//               const Icon =
//                 catIcons[e.category] || Receipt;

//               return (
//                 <motion.div
//                   key={e.id}
//                   initial={{
//                     opacity: 0,
//                     y: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                   }}
//                   className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex gap-4"
//                 >
//                   <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
//                     <Icon className="text-black" />
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex justify-between">
//                       <h3 className="font-semibold">
//                         {e.note || e.category}
//                       </h3>

//                       <h3 className="font-bold">
//                         ₹{e.amount}
//                       </h3>
//                     </div>

//                     <div className="flex justify-between text-sm text-gray-400 mt-2">
//                       <span>{e.category}</span>
//                       <span>{e.date}</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>

//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser } from "@clerk/clerk-react";
// // import { useState } from "react";
// import {
//   Plus,
//   Trash2,
//   CreditCard,
//   IndianRupee,
//   Calendar,
//   Mic,
//   Camera,
//   Utensils,
//   Car,
//   ShoppingBag,
//   Receipt,
//   Tv,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const catIcons = {
//   Food: Utensils,
//   Transport: Car,
//   Shopping: ShoppingBag,
//   Bills: Receipt,
//   Entertainment: Tv,
// };

// const cats = Object.keys(catIcons);

// export default function Expenses() {
//   const { user } = useUser();
//   const [expenses, setExpenses] = useState([]);

//   const [amount, setAmount] = useState("");
//   const [cat, setCat] = useState("Food");
//   const [note, setNote] = useState("");

//   // const [subscriptions, setSubscriptions] = useState([
//   //   {
//   //     id: 1,
//   //     app: "Netflix",
//   //     plan: "Premium",
//   //     amount: 149,
//   //     yamount: 199,
//   //     color: "from-red-500 to-red-700",
//   //     logo:
//   //       "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
//   //   },
//   //   {
//   //     id: 2,
//   //     app: "Prime",
//   //     plan: "Premium",
//   //     amount: 299,
//   //     color: "from-blue-500 to-cyan-500",
//   //     logo: "https://upload.wikimedia.org/wikipedia/commons/7/72/Amazon_Prime_logo_%282022%29.svg",
//   //   },
//   //    {
//   //   id: 3,
//   //   app: "Disney+ Hotstar",
//   //   plan: "Premium",
//   //   amount: 299,
//   //   color: "from-yellow-400 to-orange-500",
//   //   logo: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Disney%2B_Hotstar_2024.svg",
//   //   // "https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg",
//   // },
  
//   //  {
//   //   id: 4,
//   //   app: "YouTube Premium",
//   //   plan: "Individual",
//   //   amount: 149,
//   //   color: "from-red-600 to-pink-500",
//   //   logo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png",
//   // },

//   //   {
//   //     id: 5,
//   //     app: "Spotify",
//   //     plan: "Premium",
//   //     amount: 139,
//   //     color: "from-green-500 to-emerald-600",
//   //     logo:
//   //       "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
//   //   },

//   //    {
//   //   id: 6,
//   //   app: "Apple Music",
//   //   plan: "Student",
//   //   amount: 99,
//   //   color: "from-pink-500 to-red-500",
//   //   logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg",
//   // },
   
//   //  {
//   //   id: 7,
//   //   app: "Canva Pro",
//   //   plan: "Pro",
//   //   amount: 499,
//   //   color: "from-cyan-400 to-blue-500",
//   //   logo: "https://upload.wikimedia.org/wikipedia/en/b/bb/Canva_Logo.svg",
//   // },
//   // ]);

//   // const [subscriptions, setSubscriptions] = useState([]);

//   const [emiForm, setEmiForm] = useState({
//     name: "",
//     amount: "",
//     dueDate: "",
//   });

//   const [emis, setEmis] = useState([]);
// // expenses fetch from backend
//   const fetchExpenses = async () => {
//   if (!user) return;

//   try {
//     const res = await axios.get(
//       `http://localhost:5000/api/expenses/${user.id}`
//     );

//     setExpenses(res.data);
//   } catch (err) {
//     console.log(err);
//   }
// };
//   useEffect(() => {
//     fetchExpenses();
//   }, [user]);

//   const addExpense = async(e) => {
//     e.preventDefault();

//     if (!amount) return;

//     // const newExpense = {
//     //   id: Date.now(),
//     //   category: cat,
//     //   amount: Number(amount),
//     //   note,
//     //   date: new Date().toLocaleDateString(),
//     // };

//     // setExpenses([newExpense, ...expenses]);

//     // setAmount("");
//     // setNote("");

//   try {
//     await axios.post("http://localhost:5000/api/expenses", {
//       clerkId: user.id,
//       amount: Number(amount),
//       category: cat,
//       note,
//     });

//     fetchExpenses();

//     setAmount("");
//     setNote("");
//   } catch (err) {
//     console.log(err);
//   }
//   };

//   const addEmi = () => {
//     if (!emiForm.name || !emiForm.amount) return;

//     setEmis([
//       ...emis,
//       {
//         id: Date.now(),
//         ...emiForm,
//       },
//     ]);

//     setEmiForm({
//       name: "",
//       amount: "",
//       dueDate: "",
//     });
//   };

//   const deleteSub = (id) => {
//     setSubscriptions(
//       subscriptions.filter((item) => item.id !== id)
//     );
//   };

//   const deleteEmi = (id) => {
//     setEmis(emis.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="min-h-screen p-6 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

//       <h1 className="text-3xl font-bold mb-8">
//         Expense Manager
//       </h1>


// {/* SUBSCRIPTIONS (UPDATED PREMIUM UI LIKE IMAGE) */}
// <div className="mb-10">
//   <div className="flex items-center justify-between mb-5">
//     <div>
//       <h2 className="text-xs tracking-[0.3em] text-gray-400 uppercase">
//         Subscriptions
//       </h2>
//       <h1 className="text-3xl font-semibold mt-1">
//         Subscription manager
//       </h1>
//     </div>

//     <button className="px-4 py-2 rounded-2xl bg-linear-to-r from-blue-500 to-cyan-400 text-black font-medium flex items-center gap-2">
//       <Plus size={18} />
//       New
//     </button>
//   </div>

//   <div className="grid md:grid-cols-3 gap-6">
//     {subscriptions.map((sub) => (
//       <motion.div
//         key={sub.id}
//         whileHover={{ scale: 1.02 }}
//         className="relative rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
//       >
//         {/* glow background */}
//         <div
//           className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-30 bg-linear-to-br ${sub.color}`}
//         />

//         {/* top row */}
//         <div className="flex items-center justify-between relative z-10">
//           <div className="flex items-center gap-3">
//             <img
//               src={sub.logo}
//               className="h-10 w-10 rounded-xl bg-white/10 p-1"
//             />
//             <div>
//               <h3 className="font-semibold text-lg">{sub.app}</h3>
//               <p className="text-xs text-gray-400">
//                 {sub.plan} plan
//               </p>
//             </div>
//           </div>

//           {/* active badge */}
//           <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
//             Active
//           </span>
//         </div>

//         {/* plans (like your image grid) */}
//         <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
//           <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
//             <p className="text-xs text-gray-400">Monthly</p>
//             <p className="font-semibold">₹{sub.amount}/mo</p>
//           </div>
//           </div>

//         {/* footer */}
//         <div className="flex items-center justify-between mt-6 relative z-10">
//           <div className="flex items-center gap-2 text-xs text-gray-400">
//             <Calendar size={14} />
//             Next billing
//           </div>

//           <p className="text-sm font-semibold">
//             ₹{sub.amount}/mo
//           </p>
//         </div>

//         {/* buttons */}
//         <div className="flex gap-3 mt-5 relative z-10">
//           <button className="flex-1 py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-sky-400 text-black font-semibold flex items-center justify-center gap-2">
//             <Plus size={16} />
//             Add
//           </button>

//           <button
//             onClick={() => deleteSub(sub.id)}
//             className="w-12 rounded-2xl bg-white/10 flex items-center justify-center"
//           >
//             <Trash2 size={16} className="text-red-400" />
//           </button>
//         </div>
//       </motion.div>
//     ))}
//   </div>
// </div>

//       {/* EMI */}
//       <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 mb-10">

//         <h2 className="text-xl font-semibold mb-5 flex gap-2 items-center">
//           <CreditCard />
//           EMI Tracker
//         </h2>

//         <div className="grid md:grid-cols-4 gap-4">

//           <input
//             placeholder="EMI Name"
//             value={emiForm.name}
//             onChange={(e) =>
//               setEmiForm({
//                 ...emiForm,
//                 name: e.target.value,
//               })
//             }
//             className="p-3 rounded-xl bg-black/30 border border-white/10"
//           />

//           <input
//             placeholder="Amount"
//             value={emiForm.amount}
//             onChange={(e) =>
//               setEmiForm({
//                 ...emiForm,
//                 amount: e.target.value,
//               })
//             }
//             className="p-3 rounded-xl bg-black/30 border border-white/10"
//           />

//           <input
//             type="date"
//             value={emiForm.dueDate}
//             onChange={(e) =>
//               setEmiForm({
//                 ...emiForm,
//                 dueDate: e.target.value,
//               })
//             }
//             className="p-3 rounded-xl bg-black/30 border border-white/10"
//           />

//           <button
//             onClick={addEmi}
//             className="rounded-xl bg-emerald-500 text-black font-semibold"
//           >
//             Add EMI
//           </button>
//         </div>

//         <div className="mt-5 space-y-3">
//           {emis.map((emi) => (
//             <div
//               key={emi.id}
//               className="flex justify-between items-center p-4 rounded-xl bg-black/20"
//             >
//               <div>
//                 <h3 className="font-semibold">
//                   {emi.name}
//                 </h3>

//                 <p className="text-gray-400 text-sm">
//                   ₹{emi.amount}
//                 </p>

//                 <p className="text-xs text-gray-500">
//                   {emi.dueDate}
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   deleteEmi(emi.id)
//                 }
//               >
//                 <Trash2 className="text-red-400" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* QUICK ADD */}
//       <div className="grid lg:grid-cols-3 gap-5">

//         <div className="rounded-3xl p-5 bg-white/5 backdrop-blur-xl border border-white/10">

//           <h2 className="flex items-center gap-2 font-semibold mb-5">
//             <Plus />
//             Quick Expense
//           </h2>

//           <form
//             onSubmit={addExpense}
//             className="space-y-4"
//           >
//             <input
//               type="number"
//               placeholder="Amount"
//               value={amount}
//               onChange={(e) =>
//                 setAmount(e.target.value)
//               }
//               className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
//             />

//             <div className="flex flex-wrap gap-2">
//               {cats.map((c) => {
//                 const Icon = catIcons[c];

//                 return (
//                   <button
//                     type="button"
//                     key={c}
//                     onClick={() => setCat(c)}
//                     className={`flex items-center gap-2 px-3 py-2 rounded-full ${
//                       cat === c
//                         ? "bg-emerald-500 text-black"
//                         : "bg-white/10"
//                     }`}
//                   >
//                     <Icon size={14} />
//                     {c}
//                   </button>
//                 );
//               })}
//             </div>

//             <input
//               placeholder="Note"
//               value={note}
//               onChange={(e) =>
//                 setNote(e.target.value)
//               }
//               className="w-full p-3 rounded-xl bg-black/30 border border-white/10"
//             />

//             <div className="flex gap-3">
//               <button className="flex-1 p-3 rounded-xl bg-emerald-500 text-black font-semibold">
//                 Add Expense
//               </button>

//               <button
//                 type="button"
//                 className="w-12 rounded-xl bg-white/10"
//               >
//                 <Mic size={18} />
//               </button>

//               <button
//                 type="button"
//                 className="w-12 rounded-xl bg-white/10"
//               >
//                 <Camera size={18} />
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* EXPENSE LIST */}

//         <div className="lg:col-span-2 space-y-4">

//           <AnimatePresence>
//             {expenses.map((e) => {
//               const Icon =
//                 catIcons[e.category] || Receipt;

//               return (
//                 <motion.div
//                   key={e.id}
//                   initial={{
//                     opacity: 0,
//                     y: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                   }}
//                   className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex gap-4"
//                 >
//                   <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
//                     <Icon className="text-black" />
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex justify-between">
//                       <h3 className="font-semibold">
//                         {e.note || e.category}
//                       </h3>

//                       <h3 className="font-bold">
//                         ₹{e.amount}
//                       </h3>
//                     </div>

//                     <div className="flex justify-between text-sm text-gray-400 mt-2">
//                       <span>{e.category}</span>
//                       <span>{e.date}</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>

//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  CreditCard,
  IndianRupee,
  Mic,
  Camera,
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Search,
  Pencil,
  Tv,
} from "lucide-react";

const catIcons = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Entertainment: Tv,
};

const cats = Object.keys(catIcons);

export default function Expenses() {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);

  const [amount, setAmount] = useState("");
  const [cat, setCat] = useState("Food");
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [editingExpense, setEditingExpense] = useState(null);
  const [isListening, setIsListening] = useState(false);

  // ✅ FETCH EXPENSES
  const fetchExpenses = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/expenses/${user.id}`
      );
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  // ✅ ADD EXPENSE
  // const addExpense = async (e) => {
  //   e.preventDefault();
  //   if (!amount) return;

  //   try {
  //     await axios.post("http://localhost:5000/api/expenses", {
  //       clerkId: user.id,
  //       amount: Number(amount),
  //       category: cat,
  //       note,
  //     });

  //     setAmount("");
  //     setNote("");
  //     fetchExpenses();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const addExpense = async (e) => {
  e.preventDefault();

  if (!amount) return;

  try {
    if (editingExpense) {
      await axios.put(
        `http://localhost:5000/api/expenses/${editingExpense._id}`,
        {
          amount: Number(amount),
          category: cat,
          note,
        }
      );
    } else {
      await axios.post("http://localhost:5000/api/expenses", {
        clerkId: user.id,
        amount: Number(amount),
        category: cat,
        note,
      });
    }

    setAmount("");
    setNote("");
    setCat("Food");
    setEditingExpense(null);

    fetchExpenses();

  } catch (err) {
    console.log(err);
  }
};
//delete expense
  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    fetchExpenses();
  } catch (err) {
    console.log(err);
  }
};

//edit expense
const handleEdit = (expense) => {
  setEditingExpense(expense);

  setAmount(expense.amount);
  setCat(expense.category);
  setNote(expense.note);
};

//mic listneing
const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // setIsListening(true);
    recognition.onstart = () => {
  console.log("Started");
};

recognition.onaudiostart = () => {
  console.log("Audio Started");
};

recognition.onspeechstart = () => {
  console.log("Speech Started");
};

recognition.onresult = (event) => {
  console.log(event.results[0][0].transcript);
};

recognition.onerror = (event) => {
  console.log("Error:", event.error);
};

recognition.onend = () => {
  console.log("Ended");
};


  recognition.start();
  console.log("Listening...");

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    console.log("Voice:", transcript);

    // AI 
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.log(event.error);
    setIsListening(false);
  };
};

  // ✅ SEARCH FILTER
const filteredExpenses = expenses.filter((expense) => {
  const searchText = search.toLowerCase();

  return (
    expense.note?.toLowerCase().includes(searchText) ||
    expense.category?.toLowerCase().includes(searchText)
  );
});

  return (
    <div className="space-y-8 text-white">

      {/* QUICK ADD */}
      <br></br>
      <div className="grid lg:grid-cols-3 gap-6">

        {/* FORM */}
        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10">

          <h2 className="flex items-center gap-2 font-semibold mb-5">
            <Plus />
            Quick Expense
          </h2>

          <form onSubmit={addExpense} className="space-y-4">

            {/* AMOUNT */}
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none"
            />

            {/* CATEGORY */}
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => {
                const Icon = catIcons[c];

                return (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCat(c)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${
                      cat === c
                        ? "bg-emerald-500 text-black"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <Icon size={14} />
                    {c}
                  </button>
                );
              })}
            </div>

            {/* NOTE */}
            <input
              placeholder="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none"
            />

            {/* BUTTONS */}
            <div className="flex gap-3">

{/* //add expense button */}
              <button className="flex-1 p-3 rounded-xl bg-emerald-500 text-black font-semibold hover:scale-105 transition">
                {editingExpense ? "Update Expense" : "Add Expense"}
              </button>

              {/* <button
                type="button"
                className="w-12 rounded-xl bg-white/10 flex items-center justify-center"
              >
                <Mic size={18} />
              </button> */}

              <button
                  type="button"
                  onClick={startListening}
                  className={`w-12 rounded-xl flex items-center justify-center transition ${
                    isListening
                       ? "bg-red-500 animate-pulse"
                       : "bg-white/10"
               }`}
              >
                <Mic size={18} />
              </button>

              <button
                type="button"
                className="w-12 rounded-xl bg-white/10 flex items-center justify-center"
              >
                <Camera size={18} />
              </button>

            </div>
          </form>
        </div>

        {/* LIST */}
        <div className="lg:col-span-2 space-y-4">
              
            {/* SEARCH BAR */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
              />

              <input
              type="text"
              placeholder="Search by note or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 outline-none text-white placeholder:text-white/40"
              />
          </div>
          <AnimatePresence>
            
            {filteredExpenses.map((e) => {
              const Icon = catIcons[e.category] || Receipt;

              return (
                <motion.div
                  key={e._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex gap-4"
                >

                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <Icon className="text-black" />
                  </div>

                  <div className="flex-1">

                    {/* <div className="flex justify-between">
                      <h3 className="font-semibold text-white">
                        {e.note || e.category}
                      </h3>

                      <h3 className="font-bold text-white">
                        ₹{e.amount}
                      </h3>
                    </div> */}
{/* add */}
                        <div className="flex justify-between items-start">
                          <div>
                           <h3 className="font-semibold text-white">
                             {e.note || e.category}
                                 </h3>

                             <h3 className="font-bold text-white mt-1">
                              ₹{e.amount}
                             </h3>
                        </div>

                        <div className="flex gap-2">
                       {/* Edit */}
                          <button
                             onClick={() => handleEdit(e)}
                              className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500 transition"
                          >
                              ✏️
                        </button>

                        {/* Delete */}
                         <button
                         onClick={() => handleDelete(e._id)}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500 transition"
                        >
                         <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* DATE */}
                    <div className="flex justify-between text-sm text-white/60 mt-2">
                      <span>{e.category}</span>
                      <span>
                        {new Date(e.date).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                       minute: "2-digit",
                      })}
                      </span>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}