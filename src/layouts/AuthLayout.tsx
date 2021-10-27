import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { AuthPage } from "../pages";
import { authActions } from "../store/actions/auth";

const AuthLayout = () => {
  const dispatch = useDispatch();

  const auth = () => {
    localStorage.setItem("isAuth", "true");
    dispatch(authActions.setIsAuth(true));
  };

  return (
    <div className="auth">
      <Switch>
        <Route path="/login" component={() => <AuthPage auth={auth} />} />
        <Route path="*" render={() => <Redirect to="/login" />} />
      </Switch>
    </div>
  );
};

export default AuthLayout;
