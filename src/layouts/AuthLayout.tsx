import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { AuthPage } from "../pages";

const AuthLayout = () => {
  return (
    <div className="auth">
      <Switch>
        <Route path="/login" component={() => <AuthPage />} />
        <Route path="*" render={() => <Redirect to="/login" />} />
      </Switch>
    </div>
  );
};

export default AuthLayout;
