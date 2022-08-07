import { useState } from "react";
import UiSpinner from "../../components/ui/UiSpinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AppState } from "../../redux/store";
import { SignInAsync } from "../../viewModels/authSlice";
import { Navigate } from "react-router-dom";
import { homeRoute } from "../../constants/routeConstants";
type Props = {};

const AuthView = (props: Props) => {
  const authState = useAppSelector((state: AppState) => state.auth);

  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function signInHandler(e: any) {
    e.preventDefault();
    dispatch(SignInAsync({ username: username, password: password }));
  }

  if (authState.isAuthenticated && authState.token !== "") {
    return <Navigate to={homeRoute} />;
  } else {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-full">
        <form onSubmit={(e) => signInHandler(e)}>
          <div className="flex flex-col my-2">
            <label htmlFor="username">Username</label>
            <input
              onChange={(evt) => setUsername(evt.target.value)}
              className="p-2 border border-gray-700"
              id="username"
              value={username}
              type={"text"}
              required
            />
          </div>
          <div className="flex flex-col my-2">
            <label htmlFor="password">Password</label>
            <input
              onChange={(evt) => setPassword(evt.target.value)}
              className="p-2 border border-gray-700"
              value={password}
              id="password"
              type={"password"}
              required
            />
          </div>
          {authState.message !== "" && (
            <span className="text-red-600 my-2">{authState.message}</span>
          )}
          <div>
            {authState.isProceed ? (
              <UiSpinner />
            ) : (
              <input
                className="bg-cinder-800 hover:bg-cinder-600 text-white py-2 px-4 border border-gray-400 rounded shadow my-1" name="ddaf"
                type={"submit"} value="Login"
              />
            
            )}
          </div>
        </form>
      </div>
    );
  }
};

export default AuthView;
