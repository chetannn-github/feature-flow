import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/ui/card";
import { Flag, Loader2, ArrowLeft } from "lucide-react";

export default function Signup() {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    
    e.preventDefault();
    try {
      if(auth.loading) return ;
      dispatch(loginStart());
      const res = await api.post("/auth/signup", { name, email, password });
      dispatch(loginSuccess(res));
      navigate("/");
    } catch (err) {
      setEmail("");setName(""); setPassword("");
      
      dispatch(loginFailure(err.message || "Signup failed"));
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-blue-500/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_70%)]"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-md z-10">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-3xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 shadow-lg">
              <Flag className="h-7 w-7 text-white drop-shadow-sm" />
            </div>
            <span className="text-3xl font-bold text-white drop-shadow-sm">Feature Flow</span>
          </div>
          <p className="text-white/90 text-base font-medium">Join us and create your account!</p>
        </div>

        <Card className="shadow-2xl border border-white/20 bg-white/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <CardHeader className="space-y-1 pb-4 relative z-10">
            <CardTitle className="text-3xl font-bold text-center text-white drop-shadow-sm">Sign Up</CardTitle>
            <CardDescription className="text-center text-white/80 text-base">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90 font-medium">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/25 focus:border-white/50 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/25 focus:border-white/50 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/25 focus:border-white/50 transition-all duration-300"
                />
              </div>


          

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                disabled={auth.loading}
              >
                {auth.loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/70">Already have an account?</span>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/sign-in"
                  className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  Login here
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-white/50 text-xs">
            By signing up, you agree to our{' '}
            <a href="#" className="text-white/70 hover:text-white underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-white/70 hover:text-white underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
