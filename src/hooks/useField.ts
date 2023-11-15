import {
  CanvasHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useRef,
  useState,
} from "react";
import { Application } from "pixi.js";

export default () => {
  const canvasProps: DetailedHTMLProps<
    CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > = {};
  const [initialized, setInitialized] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let app: Application;

  canvasProps.ref = canvasRef;
  canvasProps.width = 400;
  canvasProps.height = 250;

  useEffect(() => {
    if (canvasRef && !initialized) {
      app = new Application({
        background: "#1099bb",
        width: canvasProps.width as number,
        height: canvasProps.height as number,
        view: canvasRef.current,
      });
      setInitialized(true);
    }
  }, []);

  return {
    canvasProps,
  };
};
