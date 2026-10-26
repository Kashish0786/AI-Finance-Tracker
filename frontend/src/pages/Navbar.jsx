
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Coins,
  Menu,
  X,
  LayoutDashboard,
  Flame,
  Target,
  Receipt,
  BarChart3,
  RefreshCcw,
  Sparkles,
  CreditCard,
  Trophy,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import {
  useUser,
  useClerk,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";

const centerLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

const appLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  // { to: "/streak", label: "Daily Streak", icon: Flame },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/subscriptions", label: "Subscriptions", icon: RefreshCcw },
  { to: "/expenses", label: "Expenses", icon: Receipt },
   { to: "/emi", label: "EMI Tracker", icon: CreditCard },
  // { to: "/analytics", label: "Analytics", icon: BarChart3 },
  // { to: "/coach", label: "AI Coach", icon: Sparkles },
  // { to: "/achievements", label: "Achievements", icon: Trophy },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk(); 
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <nav className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center"
          >
            <Coins className="w-4 h-4 text-black" />
          </motion.div>

          <span className="font-bold text-white text-lg">
            Save<span className="text-emerald-400">Sense</span>
          </span>
        </Link>

        {/* LINKS */}
        <ul className="hidden md:flex items-center gap-2">
          {!user
            ? centerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`px-4 py-2 rounded-full text-sm ${
                      pathname === link.to
                        ? "bg-emerald-500 text-black"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))
            : appLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white"
                  >
                    <link.icon size={16} />
                    {link.label}
                  </Link>
                </li>
              ))}
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {!user ? (
            <>
              <SignInButton mode="modal">
                <button className="hidden sm:block text-white">
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="hidden sm:block px-4 py-2 rounded-xl bg-emerald-500 text-black">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:block px-4 py-2 rounded-xl bg-emerald-500 text-black"
              >
                Dashboard
              </Link>

              <button
                onClick={() => signOut()}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 text-white"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.div className="max-w-7xl mx-auto mt-2 p-4 rounded-2xl bg-white/5 border border-white/10 md:hidden">

            {!user ? (
              <div className="flex flex-col gap-3 text-white">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-white">
                {appLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10"
                  >
                    <item.icon size={16}  className="shrink-0"/> 
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}

                <button
                  onClick={() => signOut()}
                  className="text-red-400 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}