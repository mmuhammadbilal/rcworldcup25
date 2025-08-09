import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = localStorage.getItem("authUser");
    if (existingUser) {
      const user = JSON.parse(existingUser);
      navigate(user?.user?.role === "admin" ? "/admin-dashboard" : "/");
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", form);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered successfully. Please log in.");
      navigate("/Login");
    } catch (err) {
      alert("Registration failed. Username may already exist.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/08/14/74/65/360_F_814746571_H0PGo1lqu9yp4x0mary5lLLzVNI8d8b2.jpg')",
      }}
    >
      <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-md border border-white/30">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            {errors.username && <p className="text-red-200 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded bg-white/30 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p className="text-red-200 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-300 transition duration-300 font-bold"
          >
            Register
          </button>

          <p className="text-sm text-center mt-4">
            Already registered?{" "}
            <span
              onClick={() => navigate("/Login")}
              className="text-yellow-300 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
