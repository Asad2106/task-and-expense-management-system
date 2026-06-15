import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
    );

    localStorage.setItem(
        "token",
     res.data.token
    );
    alert("Login Successful");
    window.location.href = "/dashboard";
} catch (error) {
      alert(error.response.data.message);
    }

  };

  return (
    <div className="auth-container">

      <form className="auth-form" onSubmit={handleLogin}>

        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

        <p>
         Don't have an account?
         <a href="/register"> Register</a>
         </p>
      </form>
    </div>
  );
}

export default Login;