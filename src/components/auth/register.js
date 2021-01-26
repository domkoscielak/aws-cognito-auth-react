import { useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import Input from "../base/input";

Amplify.configure(awsconfig);

const RegisterComponent = (props) => {
  const [registerWaitMsg, setRegisterWaitMsg] = useState("");
  const [registerErrorMsg, setRegisterErrorMsg] = useState("");

  
  const signUp = async () => {
    if (!props.username.length || !props.password.length) {
      setRegisterErrorMsg("Username and password cannot be empty");
      return null;
    }
    setRegisterErrorMsg("");
    setRegisterWaitMsg("Please wait...");
    try {
      const { user } = await Auth.signUp({
        username: props.username,
        password: props.password,
        attributes: {
          email: props.username,
          // other custom attributes
        },
      });
      console.log(user);
      setRegisterWaitMsg("");
    } catch (error) {
      console.log("error signing up:", error);
      setRegisterWaitMsg("");
      setRegisterErrorMsg(error.message);
      
    }
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      <Input
        label="Username"
        type="email"
        name="username"
        value={props.username}
        onChange={props.onUsernameChange}
        placeholder={props.usernamePlaceholder}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={props.password}
        onChange={props.onPasswordChange}
        placeholder={props.passwordPlaceholder}
      />
      
      {/* REGISTER BUTTON */}
      {!registerWaitMsg.length && (
        <button onClick={signUp}>{props.registerBtnText}</button>
      )}
      {/* LOADING */}
      {registerWaitMsg.length > 0 && <p>{registerWaitMsg}</p>}
      {/* ERRORS */}
      {registerErrorMsg.length > 0 && (
        <p style={{ color: "red" }}>{registerErrorMsg}</p>
      )}
      {/* LOGIN LINK BTN*/}
      <button className="btn-link" onClick={props.onLoginLinkClick}>
        {props.loginLinkText}
      </button>
    </div>
  );
};

export default RegisterComponent;
