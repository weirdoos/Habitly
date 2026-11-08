import { useState } from "react";
import "./Sign.css";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_URL;

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
          <h1>Log in</h1>
          <h4 className="subtext">
            Welcome back! please enter your details to continue.
          </h4>
          <div className="form">
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
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
              <button
                onClick={() => setIsVisiblePassword((prev) => !prev)}
                type="button"
              >
                show password
              </button>
            </div>
            <p style={{ color: "red" }}>dsdsd</p>

            <button className="signInBtn">Log in</button>
            <p>
              Don`t have an account?{" "}
              <a className="link" href="/sign-up">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
