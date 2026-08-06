import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Loader2, Building2, Eye, EyeOff } from "lucide-react";
import { register as registerApi } from "../services/authService";
import { useToast } from "../context/ToastContext";

export default function Register() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the validation errors below.", "warning");
      return;
    }

    try {
      setLoading(true);
      await registerApi({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      showToast("Account created successfully! Please log in.", "success");
      navigate("/login", { state: { email: formData.email.trim() } });
    } catch (error) {
      const message = error.message || "Registration failed";
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-8 backdrop-blur-md text-white">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-xl mb-3 text-indigo-400">
            <Building2 size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
          <p className="text-slate-400 text-sm mt-1">Join PG Booking CRM</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 flex items-center justify-center text-slate-400 pointer-events-none z-10">
                <User size={18} />
              </div>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                style={{ paddingLeft: "2.75rem" }}
                className={`w-full h-11 pr-4 bg-slate-800 border text-white rounded-xl text-sm outline-none transition focus:ring-2 ${
                  fieldErrors.name
                    ? "border-rose-500 focus:ring-rose-500/30"
                    : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30"
                }`}
              />
            </div>
            {fieldErrors.name && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 flex items-center justify-center text-slate-400 pointer-events-none z-10">
                <Mail size={18} />
              </div>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={{ paddingLeft: "2.75rem" }}
                className={`w-full h-11 pr-4 bg-slate-800 border text-white rounded-xl text-sm outline-none transition focus:ring-2 ${
                  fieldErrors.email
                    ? "border-rose-500 focus:ring-rose-500/30"
                    : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30"
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 flex items-center justify-center text-slate-400 pointer-events-none z-10">
                <Lock size={18} />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                style={{ paddingLeft: "2.75rem", paddingRight: "2.75rem" }}
                className={`w-full h-11 bg-slate-800 border text-white rounded-xl text-sm outline-none transition focus:ring-2 ${
                  fieldErrors.password
                    ? "border-rose-500 focus:ring-rose-500/30"
                    : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 flex items-center justify-center text-slate-400 hover:text-slate-200 z-10 p-1"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Confirm Password
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 flex items-center justify-center text-slate-400 pointer-events-none z-10">
                <Lock size={18} />
              </div>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ paddingLeft: "2.75rem", paddingRight: "2.75rem" }}
                className={`w-full h-11 bg-slate-800 border text-white rounded-xl text-sm outline-none transition focus:ring-2 ${
                  fieldErrors.confirmPassword
                    ? "border-rose-500 focus:ring-rose-500/30"
                    : "border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 flex items-center justify-center text-slate-400 hover:text-slate-200 z-10 p-1"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 mt-2 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition shadow-lg ${
              loading
                ? "bg-slate-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] shadow-indigo-600/30"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating Account...
              </>
            ) : (
              <>
                Register
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div className="text-center pt-4 border-t border-slate-800 mt-5">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold ml-1">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}