import React from "react";
import { Layout } from "antd";

import { Switch, Route, Redirect } from "react-router-dom";

import { AppHeader, AppSideBar } from "../components";
import {
  CategoriesPage,
  ContractorCreatePage,
  ContractorsPage,
  HomePage,
  OrderCreatePage,
  OrdersPage,
  OrderPage,
  DeletedCategoriesPage,
  ContractorPage,
  OrderChatsPage,
  ChatPage,
  CategoryCreatePage,
  AdminCreatePage,
  AdminsPage,
  ChangePasswordPage,
} from "../pages";
import { useDispatch } from "react-redux";
import { adminActions } from "../store/actions/admin";

const MainLayout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("isAuth");
    dispatch(adminActions.setIsAuth(false));
  };

  return (
    <Layout className="wrapper">
      <AppHeader logout={logout} />
      <Layout>
        <AppSideBar />
        <Layout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home">
              <HomePage />
            </Route>

            <Route exact path="/orders">
              <OrdersPage />
            </Route>
            <Route exact path="/orders/create">
              <OrderCreatePage />
            </Route>
            <Route exact path="/orders/:orderId">
              <OrderPage />
            </Route>

            <Route exact path="/orders/:orderId/chats">
              <OrderChatsPage />
            </Route>

            <Route exact path="/orders/:orderId/chats/:chatId">
              <ChatPage />
            </Route>

            <Route exact path="/contractors">
              <ContractorsPage />
            </Route>
            <Route exact path="/contractors/create">
              <ContractorCreatePage />
            </Route>
            <Route path="/contractors/:contractorId">
              <ContractorPage />
            </Route>

            <Route exact path="/categories">
              <CategoriesPage />
            </Route>

            <Route exact path="/categories/deleted">
              <DeletedCategoriesPage />
            </Route>

            <Route exact path="/categories/create">
              <CategoryCreatePage />
            </Route>

            <Route exact path="/profile/:contractorId">
              <ContractorPage />
            </Route>

            <Route exact path="/admins">
              <AdminsPage />
            </Route>

            <Route exact path="/admins/create">
              <AdminCreatePage />
            </Route>
            <Route exact path="/admins/password">
              <ChangePasswordPage />
            </Route>

            <Route exact path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
