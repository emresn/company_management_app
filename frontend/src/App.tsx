import { Provider } from "react-redux";
import Layout from "./components/includes/LayoutView";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Layout />
      </Provider>
    </div>
  );
}

export default App;
