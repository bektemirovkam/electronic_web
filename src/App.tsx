import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppPreloader } from "./components";

import { AuthLayout, MainLayout } from "./layouts";
import { authActions } from "./store/actions/auth";
import { getAllCategories } from "./store/actions/categories";
import { getIsAuthState, getIsInitState } from "./store/selectors/auth";

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector(getIsAuthState);
  const isInit = useSelector(getIsInitState);

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  React.useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");

    if (isAuth) {
      dispatch(authActions.setIsAuth(true));
    }

    dispatch(authActions.setIsInit());
  }, [dispatch]);

  if (!isInit) {
    return (
      <div className="app">
        <AppPreloader />
      </div>
    );
  }

  return <div className="app">{isAuth ? <MainLayout /> : <AuthLayout />}</div>;
}

export default App;
