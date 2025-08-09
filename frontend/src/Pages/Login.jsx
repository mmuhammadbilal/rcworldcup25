import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
   if (!form.username) newErrors.username = "Name is required";

    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      login(res.data);
      navigate(res.data.user.role === "admin" ? "/admin-dashboard" : "/home");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8yM19waG90b19vZl9jbG9zZV91cF9zaG90X29mX2FfYmFzZWJhbGxfb25fZmlyZV8wZTliMGQ1Yy02OTFjLTRkZTgtOTljOC0zMjQ3OTgzZjU2OTdfMS5qcGc.jpg')`,
      }}
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full border border-white/50">
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
  <input
    type="text"
    placeholder="Enter your name"
    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
    onChange={(e) => setForm({ ...form, username: e.target.value })}
  />
  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
</div>

          <div>
            <label className="block text-sm font-semibold text-white mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/80 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p className="text-red-200 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-white mt-4 drop-shadow">
          Don't have an account?{" "}
          <Link to="/register" className="text-white font-semibold underline hover:text-purple-200">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
