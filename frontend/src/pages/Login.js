import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3080/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/profile");
    } catch (err) {
      alert("Giriş başarısız!");
    }
  };

  return (
    <div className="container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default Login;
