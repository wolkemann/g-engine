import Window, { WindowProps } from "./Window";
import $ from "jquery";
import Example from "./3DScenes/Example";

interface ThreeDProps extends WindowProps {
  scene?: Function;
  canvasWidth: number;
  canvasHeight: number;
}

export default class ThreeD extends Window {
  scene: Function;
  canvasWidth: number;
  canvasHeight: number;
  constructor(props: ThreeDProps) {
    super({
      x: "center",
      y: 20,
      width: 650,
      height: 250,
      ...props,
      id: "3DScene-" + props.id,
    });

    this.canvasWidth = props.canvasWidth;
    this.canvasHeight = props.canvasHeight;
    this.scene = props.scene ? props.scene : Example;

    this.generateElement();
  }
  generateElement() {
    this.generateWindow();
    this.scene(`#${this.id}`, this.canvasWidth, this.canvasHeight);
  }
  /**
   * Renders the 3d Scene stored in this.scene.
   */
  renderCanvas() {
    this.scene(`#${this.id}`, this.canvasWidth, this.canvasHeight);
  }
}
