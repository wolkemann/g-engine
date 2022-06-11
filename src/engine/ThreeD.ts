import Window, { WindowProps } from "./Window";
import Example from "./3DScenes/Example";

interface ThreeDProps extends WindowProps {
  scene?: Function;
}

export default class ThreeD extends Window {
  scene: Function;
  constructor(props: ThreeDProps) {
    super({
      x: "center",
      y: 20,
      width: 650,
      height: 250,
      ...props,
      id: "3DScene-" + props.id,
    });

    this.scene = props.scene ? props.scene : Example;
  }
  /**
   * Renders the 3d Scene stored in this.scene.
   */
  renderCanvas() {
    this.scene(`#${this.id}`, this.width, this.height);
  }
}
