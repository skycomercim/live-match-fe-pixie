import LiveMatch from "./components/LiveMatch";

import "./styles.css";
import store from "./animation/store/store";
import {Provider} from "react-redux";

export default function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <h1>Live Match</h1>
          <LiveMatch matchId={1234} />
        </div>
      </Provider>
  );
}
