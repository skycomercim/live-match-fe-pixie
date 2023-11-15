import "./styles.css";
import useField from "./hooks/useField.ts";

export default function App() {
  const { canvasProps } = useField();

  return (
    <div className="App">
      <canvas {...canvasProps} />
    </div>
  );
}
