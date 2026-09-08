import { useEffect, useState } from "react";
import { CreditCard, Trash2, Calendar, IndianRupee } from "lucide-react";

import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { Edit2, Search } from "lucide-react";

export default function EMITracker() {
    
const { user } = useUser();

const [search, setSearch] = useState("");
const [editingId, setEditingId] = useState(null);

  const [emis, setEmis] = useState([]);
  const [emiForm, setEmiForm] = useState({
    name: "",
    amount: "",
    dueDate: "",
  });

  useEffect(() => {
  if (user) {
    fetchEmis();
  }
}, [user]);

const fetchEmis = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/emis/${user.id}`
    );

    setEmis(res.data);
  } catch (err) {
    console.log(err);
  }
};

  const addEmi = async() => {
    if (
      !emiForm.name ||
      !emiForm.amount ||
      !emiForm.dueDate
    ) {
      return;
    }

     try {
    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/emis/${editingId}`,
        emiForm
      );

      setEditingId(null);
    } else {
      await axios.post(
        "http://localhost:5000/api/emis",
        {
          ...emiForm,
          userId: user.id,
        }
      );
    }


    setEmiForm({
      name: "",
      amount: "",
      dueDate: "",
    });
     fetchEmis();
  } catch (err) {
    console.log(err);
  }
  };

 const deleteEmi = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/emis/${id}`
    );

    fetchEmis();
  } catch (err) {
    console.log(err);
  }
};

const editEmi = (emi) => {
  setEditingId(emi._id);

  setEmiForm({
    name: emi.name,
    amount: emi.amount,
    dueDate: emi.dueDate.slice(0, 10),
    status: emi.status,
  });
};

const filteredEmis = emis.filter((emi) =>
  emi.name
    .toLowerCase()
    .includes(search.toLowerCase())
);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black text-white p-8">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <CreditCard className="text-emerald-400" size={34} />
          <h1 className="text-4xl font-bold">
            EMI Tracker
          </h1>
        </div>

        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">

          <div className="grid md:grid-cols-4 gap-5">

            <input
              placeholder="EMI Name"
              value={emiForm.name}
              onChange={(e) =>
                setEmiForm({
                  ...emiForm,
                  name: e.target.value,
                })
              }
              className="p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
            />

            <input
              type="number"
              placeholder="Amount"
              value={emiForm.amount}
              onChange={(e) =>
                setEmiForm({
                  ...emiForm,
                  amount: e.target.value,
                })
              }
              className="p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
            />

            <input
              type="date"
              value={emiForm.dueDate}
              onChange={(e) =>
                setEmiForm({
                  ...emiForm,
                  dueDate: e.target.value,
                })
              }
              className="p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
            />

            <button
              onClick={addEmi}
              className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition"
            >
              Add EMI
            </button>

          </div>

          <div className="mt-8">

            {emis.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No EMI Added Yet
              </div>
            ) : (
              <div className="space-y-4">

                {emis.map((emi) => (

                  <div
                    key={emi.id}
                    className="rounded-2xl bg-black/30 border border-white/10 p-5 flex justify-between items-center hover:bg-black/40 transition"
                  >

                    <div>

                      <h2 className="font-semibold text-lg">
                        {emi.name}
                      </h2>

                      <div className="flex items-center gap-2 text-emerald-400 mt-2">
                        <IndianRupee size={18} />
                        ₹{emi.amount}
                      </div>

                      <div className="flex items-center gap-2 text-gray-400 mt-2">
                        <Calendar size={16} />
                        {formatDate(emi.dueDate)}
                      </div>

                    </div>

                    <button
                      onClick={() => deleteEmi(emi.id)}
                      className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500 transition"
                    >
                      <Trash2 />
                    </button>

                  </div>

                ))}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}