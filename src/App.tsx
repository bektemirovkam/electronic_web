import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppPreloader } from "./components";

import { AuthLayout, MainLayout } from "./layouts";
import { adminActions } from "./store/actions/admin";

import { getAllCategories } from "./store/actions/categories";
import { getIsAuthState, getIsInitState } from "./store/selectors/admin";

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
      dispatch(adminActions.setIsAuth(true));
    }

    dispatch(adminActions.setIsInit(true));
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
