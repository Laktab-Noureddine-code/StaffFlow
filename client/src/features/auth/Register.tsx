import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import api, { getCsrfCookie } from "../../api/axios";
import { toast } from "sonner";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const isFormValid = name && email && password && confPassword && password === confPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await getCsrfCookie();
      const data = await api.post("/api/register", { name, email, password });
      if (data.status === 201) {
        setLoading(false);
        navigate("/");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      toast.error("Registration failed: " + (err.response?.data?.message || "Please try again."));
    }
  };

  return (
    <AuthLayout>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Create a new account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="form-label">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="form-input"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="form-label">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="form-input"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="form-label">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="form-input pr-12"
                required
              />
              
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="form-label">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="Confirm your password"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#121828] focus:border-transparent outline-none transition pr-12 ${
                  confPassword && password !== confPassword
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
                required
              />
            </div>
          </div>

          {/* Register button */}
          <button
            type="submit"
            className={`w-full ${isFormValid ? "opacity-100" : "opacity-50 cursor-not-allowed"} py-2 bg-[#121828]/90 cursor-pointer hover:bg-[#121828] text-white font-medium rounded-lg transition`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;
