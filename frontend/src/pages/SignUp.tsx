import { useState } from "react";
import "./Sign.css";
import { register, type RegisterPayload } from "../utils/auth";
import { accessToken } from "../utils/axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const navigate = useNavigate();

  async function registration() {
    const newUser: RegisterPayload = {
      email: inputEmail,
      username: inputName,
      password: password,
    };

    try {
      const data = await register(newUser);
      console.log(accessToken, data);
      navigate("/app/home");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="sign">
      <div className="content">
        <div className="greetings">
          <div className="logo">
            <img
              src="favicon.png"
              style={{ width: "70px", borderRadius: "20px" }}
            />
            <h1>Habitly</h1>
          </div>
        </div>

        <div className="createaccount">
          <h1>Create account</h1>
          <h4 className="subtext">
            Join Habitly and start building your better tomorrow!
          </h4>
          <p style={{ color: "red" }}>{error.trim() === "" ? "" : error}</p>

          <div className="form">
            <div className="name label">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Alex Johnson"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </div>

            <div className="email label">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="text"
                placeholder="you@example.com"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </div>

            <div className="password label">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={isVisiblePassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={() => setIsVisiblePassword((prev) => !prev)}
                type="button"
              >
                show password
              </button>
            </div>

            <button className="signInBtn" onClick={registration}>
              Register
            </button>
            <p>
              Already have an account?{" "}
              <a className="link" href="/sign-in">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
