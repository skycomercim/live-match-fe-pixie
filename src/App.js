import LiveMatch from "./components/LiveMatch";

import "./styles.css";
import store from "./animation/store/store";
import {Provider} from "react-redux";

export default function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <LiveMatch matchId={1234} />
        </div>
      </Provider>
  );
}
