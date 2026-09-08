import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Target,
  Sparkles,
  Trash2,
  Calendar,
  IndianRupee,
} from "lucide-react";

export default function Goals() {
  const [goals, setGoals] = useState([]);

  const [form, setForm] = useState({
    name: "",
    target: "",
    deadline: "",
  });

  const addGoal = (e) => {
    e.preventDefault();

    if (!form.name || !form.target) return;

    const target = Number(form.target);

    const goal = {
      id: Date.now(),
      name: form.name,
      target,
      saved: 0,
      deadline: form.deadline || "No Deadline",
      predicted: "Start saving to unlock prediction",
    };

    setGoals((prev) => [...prev, goal]);

    setForm({
      name: "",
      target: "",
      deadline: "",
    });
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-5 py-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Future Goals
        </h1>

        <p className="text-gray-400 mb-8">
          Add your dream goals and track your progress.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT */}

          <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 shadow-xl">

            <div className="flex items-center gap-2 mb-6">
              <Plus className="text-emerald-400" />
              <h2 className="text-xl font-semibold">
                Add New Goal
              </h2>
            </div>

            <form
              onSubmit={addGoal}
              className="space-y-5"
            >

              <div>
                <label className="text-sm text-gray-400">
                  Goal Name
                </label>

                <input
                  type="text"
                  placeholder="MacBook Pro"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 p-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Target Amount
                </label>

                <input
                  type="number"
                  placeholder="120000"
                  value={form.target}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      target: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 p-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Deadline
                </label>

                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      deadline: e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 p-3 outline-none"
                />
              </div>

              <button
                className="w-full py-3 rounded-xl bg-linear-to-r from-emerald-400 to-cyan-500 text-black font-semibold hover:scale-[1.02] transition"
              >
                Create Goal
              </button>

            </form>

          </div>

          {/* RIGHT */}

          <div className="lg:col-span-2">

            {goals.length === 0 ? (

              <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-16 text-center">

                <Target
                  size={70}
                  className="mx-auto text-emerald-400 mb-5"
                />

                <h2 className="text-2xl font-bold">
                  No Goals Yet
                </h2>

                <p className="text-gray-400 mt-2">
                  Create your first financial goal.
                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-5">

                <AnimatePresence>

                  {goals.map((goal) => {
                    const percent =
                      (goal.saved / goal.target) * 100;

                    return (

                      <motion.div
                        key={goal.id}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 shadow-xl hover:border-emerald-400 transition"
                      >

                        <div className="flex justify-between">

                          <div>

                            <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-emerald-400 to-cyan-500 flex items-center justify-center">

                              <Target className="text-black" />

                            </div>

                            <h2 className="font-bold text-xl mt-4">
                              {goal.name}
                            </h2>

                          </div>

                          <button
                            onClick={() =>
                              deleteGoal(goal.id)
                            }
                            className="text-red-400"
                          >
                            <Trash2 />
                          </button>

                        </div>

                        <div className="mt-6 space-y-3">

                          <div className="flex justify-between">

                            <span className="text-gray-400 flex gap-2">

                              <IndianRupee size={18} />

                              Target

                            </span>

                            <span>
                              ₹{goal.target.toLocaleString()}
                            </span>

                          </div>

                          <div className="flex justify-between">

                            <span className="text-gray-400 flex gap-2">

                              <Calendar size={18} />

                              Deadline

                            </span>

                            <span>
                              {goal.deadline}
                            </span>

                          </div>

                        </div>

                        <div className="mt-6">

                          <div className="flex justify-between text-sm">

                            <span>Progress</span>

                            <span>
                              {percent.toFixed(0)}%
                            </span>

                          </div>

                          <div className="h-3 rounded-full bg-slate-700 mt-2 overflow-hidden">

                            <motion.div
                              initial={{
                                width: 0,
                              }}
                              animate={{
                                width: `${percent}%`,
                              }}
                              className="h-full bg-linear-to-r from-emerald-400 to-cyan-500"
                            />

                          </div>

                        </div>

                        <div className="mt-6 rounded-2xl bg-black/30 border border-white/10 p-4 flex gap-3">

                          <Sparkles className="text-violet-400 shrink-0" />

                          <div>

                            <p className="text-sm text-gray-400">
                              AI Prediction
                            </p>

                            <p className="font-medium">
                              {goal.predicted}
                            </p>

                          </div>

                        </div>

                      </motion.div>

                    );
                  })}

                </AnimatePresence>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}