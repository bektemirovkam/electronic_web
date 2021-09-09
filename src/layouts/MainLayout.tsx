import React from "react";
import { Layout } from "antd";

import { Switch, Route, Redirect } from "react-router-dom";

import { AppHeader, AppSideBar } from "../components";
import {
  CategoriesPage,
  CustomerCreatePage,
  CustomersPage,
  HomePage,
  OrderCreatePage,
  OrdersPage,
  SuppliersPage,
  OrderPage,
  SupplierCreatePage,
  CategoryCreatePage,
  DeletedCategoriesPage,
} from "../pages";

const MainLayout = () => {
  return (
    <Layout className="wrapper">
      <AppHeader />
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
            <Route path="/orders/:id">
              <OrderPage />
            </Route>

            <Route exact path="/customers">
              <CustomersPage />
            </Route>
            <Route exact path="/customers/create">
              <CustomerCreatePage />
            </Route>

            <Route exact path="/suppliers">
              <SuppliersPage />
            </Route>

            <Route exact path="/suppliers/create">
              <SupplierCreatePage />
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

            <Route exact path="*" render={() => <Redirect to="/home" />}>
              <HomePage />
            </Route>
          </Switch>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
