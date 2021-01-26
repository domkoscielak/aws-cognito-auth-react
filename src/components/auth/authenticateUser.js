import { useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import Login from "../auth/login";
import Register from "../auth/register";

Amplify.configure(awsconfig);

const AuthenticatUser = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [currentAuthUI, setCurrentAuthUI] = useState("login");
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // CHECK IF USER HAS BEEN AUTHENTICATED ALREADY
  Auth.currentAuthenticatedUser({
    bypassCache: false, // If set to true, this call will send a request to Cognito to get the latest user data
  })
    .then((user) => {
      setAuthenticatedUser(user.username);
    })
    .catch((err) => console.log(err));

  // SIGN OUT
  const signOut = async () => {
    try {
      await Auth.signOut();
      setAuthenticatedUser(false);
      setValues({
        username: "",
        password: ""
      })
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  // SET AUTH UI COMPONENTS
  const setCurrentAuthUIComponent = (authOption) => {
    setCurrentAuthUI(authOption);
  };

  return (
    <>
      {authenticatedUser && (
        <>
          {/* SIGN OUT BUTTON */}
          <div style={{ "textAlign": "center" }}>
            <button onClick={signOut}>SignOut</button>
          </div>
          {/* MAIN CONTENT*/}
          {props.children}
        </>
      )}
      {!authenticatedUser && (
        <>
          {currentAuthUI === "login" && (
            <Login
              username={values.username}
              password={values.password}
              onUsernameChange={handleInputChange}
              onPasswordChange={handleInputChange}
              setAuthenticatedUser={setAuthenticatedUser}
              loginBtnText="LogIn"
              registerLinkText="Not a user? Click here to register"
              onRegisterLinkClick={() => setCurrentAuthUIComponent("register")}
            />
          )}
          {currentAuthUI === "register" && (
            <Register
              username={values.username}
              password={values.password}
              onUsernameChange={handleInputChange}
              onPasswordChange={handleInputChange}
              registerBtnText="Register"
              loginLinkText="Already registered? Click here to LogIn"
              onLoginLinkClick={() => setCurrentAuthUIComponent("login")}
            />
          )}
        </>
      )}
    </>
  );
};

export default AuthenticatUser;
