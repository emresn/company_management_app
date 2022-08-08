import React from "react";
import { Provider } from "react-redux";
import Layout from "./components/includes/LayoutView";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <Provider store={store}>
          <Layout />
        </Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;
