import React from "react";
import { useDispatch } from "react-redux";

import { MainLayout } from "./layouts";
import { getAllCategories } from "./store/actions/categories";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="app">
      <MainLayout />
    </div>
  );
}

export default App;
