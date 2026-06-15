import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful");

      window.location.href = "/";

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleRegister}
      >

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Register
        </button>

          <p>
            Already have an account?
           <a href="/"> Login</a>
          </p>

      </form>

    </div>
  );
}

export default Register;