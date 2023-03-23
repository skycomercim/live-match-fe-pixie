import LiveMatch from "./components/LiveMatch";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Live Match</h1>
      <LiveMatch matchId={1234} />
    </div>
  );
}
