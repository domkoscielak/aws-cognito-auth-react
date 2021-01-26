import { useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import Input from "../base/input";

Amplify.configure(awsconfig);

const LoginComponent = (props) => {
  const [signInWaitMsg, setSignInWaitMsg] = useState("");
  const [signInErrorMsg, setSignInErrorMsg] = useState("");

  const signIn = async () => {
    if (!props.username.length || !props.password.length) {
      setSignInErrorMsg("Username and password cannot be empty");
      return null;
    }
    setSignInErrorMsg("");
    setSignInWaitMsg("Please wait...");
    try {
      const user = await Auth.signIn(props.username, props.password);
      props.setAuthenticatedUser(user.username);
      setSignInWaitMsg("");
    } catch (error) {
      setSignInWaitMsg("");
      setSignInErrorMsg(error.message);
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      {/* USERNAME */}
      <Input
        label="Username"
        type="email"
        name="username"
        value={props.username}
        onChange={props.onUsernameChange}
        placeholder={props.usernamePlaceholder}
      />
      {/* PASSWORD */}
      <Input
        label="Password"
        type="password"
        name="password"
        value={props.password}
        onChange={props.onPasswordChange}
        placeholder={props.passwordPlaceholder}
      />
      {/* LOGIN BUTTON */}
      {!signInWaitMsg.length && (
        <button onClick={signIn}>{props.loginBtnText}</button>
      )}
      {/* LOADING */}
      {signInWaitMsg.length > 0 && <p>{signInWaitMsg}</p>}
      {/* ERRORS */}
      {signInErrorMsg.length > 0 && (
        <p style={{ color: "red" }}>{signInErrorMsg}</p>
      )}
      {/* REGISTRATION LINK BTN*/}
      <button className="btn-link" onClick={props.onRegisterLinkClick}>
        {props.registerLinkText}
      </button>
    </div>
  );
};

export default LoginComponent;
