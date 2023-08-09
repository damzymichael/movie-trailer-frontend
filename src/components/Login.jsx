import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import { CircleLoader } from "react-spinners";

const Login = ({ setShowLogin }) => {
  const { login, isLoading: isLoadinG, error: erroR } = useLogin();
  const { signup, isLoading, error } = useSignup();
  const [signUp, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const validatePassword = () => {
    if (password.length > 0 && confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setPasswordError(true);
        return;
      }
      setPasswordError(false);
    }
    setPasswordError(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    if (erroR) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return;
    }
    setShowLogin(false);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (passwordError) return;
    await signup(username, password);
    if (error) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      return;
    }
    setShowLogin(false);
  };

  return (
    <div className="login">
      <span onClick={() => setShowLogin(false)}>+</span>
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={validatePassword}
        />
        {signUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyUp={validatePassword}
          />
        )}
        {passwordError && (
          <center className="error">Passwords do not match</center>
        )}

        {signUp ? (
          <button onClick={handleSignup} disabled={isLoading}>
            {isLoading ? (
              <CircleLoader size={17} cssOverride={{ marginInline: "15px" }} />
            ) : (
              "Sign up"
            )}
          </button>
        ) : (
          <button onClick={handleLogin} disabled={isLoadinG}>
            {isLoadinG ? (
              <CircleLoader size={17} cssOverride={{ marginInline: "15px" }} />
            ) : (
              "Login"
            )}
          </button>
        )}

        {(error || erroR) && alertVisible ? (
          <center className="error">{error || erroR}</center>
        ) : null}
      </form>
      <p>
        Don't have an account?
        <span className="signup" onClick={() => setSignup(true)}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
