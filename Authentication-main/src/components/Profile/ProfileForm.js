import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBe8xCvxkWbFjwndTl_vUFJXoPpjbAOS48",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      history.replace("/");
    });
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="7" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
