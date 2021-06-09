import "./PasswordReset.css";
import { useState } from "react";
import { UpdatePassword } from "../ApiCalls/ApiCalls";
import { BeforeAsyncOperation, AfterAsyncOperation } from "../../utils/funcs";
import { useActionManager } from "../Contexts/ActionManagementContext";
import { SetLoader } from "../Loader/Loader";
export function PasswordReset() {
  const { action, setAction } = useActionManager();
  const { isLoading, component } = action;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPasswords, setNewPasswords] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordUpdateMessage, setPasswordUpdateMessage] = useState({
    message: "a",
    styleClass: "update-inital-render-class",
  });
  async function PasswordResetHandler(e) {
    e.preventDefault();
    if (newPasswords.newPassword === newPasswords.confirmNewPassword) {
      BeforeAsyncOperation({ action, setAction, component: "passwordReset" });
      const response = await UpdatePassword(
        currentPassword,
        newPasswords.newPassword
      );
      AfterAsyncOperation({
        action,
        setAction,
        textPassedToModal: "process completed",
      });
      response.status === true
        ? setPasswordUpdateMessage({
            message: response.message,
            styleClass: "update-status update-success",
          })
        : setPasswordUpdateMessage({
            message: response.message,
            styleClass: "update-status update-failure",
          });
    } else {
      setPasswordUpdateMessage({
        message: "Passwords didn't match.Try again",
        styleClass: "update-status update-failure",
      });
    }
  }
  return (
    <form onSubmit={PasswordResetHandler}>
      <div className="account-info password-div">
        <p className="label">Reset Password</p>
        {isLoading && component === "passwordReset" && (
          <div className="account-interaction-loader">
            <SetLoader />
          </div>
        )}
        <p className={passwordUpdateMessage.styleClass}>
          {passwordUpdateMessage.message}
        </p>

        <div className="inline-inputs">
          <div className="holder internal-inline-div">
            <label className="labels-acc" for="username">
              Current Password
            </label>
            <input
              name="username"
              type="password"
              className="input-box acc-username"
              required
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="holder internal-inline-div">
            <label className="labels-acc new-passsword" for="username">
              New Password
            </label>
            <input
              name="username"
              type="password"
              className="input-box acc-username"
              required
              onChange={(e) =>
                setNewPasswords({
                  ...newPasswords,
                  newPassword: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="holder">
          <label className="labels-acc" for="username">
            Confirm New Password
          </label>
          <input
            name="username"
            type="password"
            className="input-box acc-username"
            required
            onChange={(e) =>
              setNewPasswords({
                ...newPasswords,
                confirmNewPassword: e.target.value,
              })
            }
          />
        </div>
        <button type="submit" className="button button-outline submit-button ">
          UPDATE PASSWORD
        </button>
      </div>
    </form>
  );
}
