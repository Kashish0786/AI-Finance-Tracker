
import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <SignUp
        routing="path"
        path="/signup"
        signInUrl="/login"
      />
    </div>
  );
}