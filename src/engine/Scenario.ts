import $ from "jquery";
import Window, { WindowProps } from "./Window";

interface ScenarioProps extends WindowProps {
  /**
   * @property the Scenario's image. Please store your faces in "public/resources/faces/[file]".
   * @example face: "background.png"
   *
   * */
  image: string;
  /**
   * @property if true the picture will cover the entire screen
   *
   * */
  fullscreen?: boolean;
}

export default class Scenario extends Window {
  image: string;
  fullscreen?: boolean;
  /**
   * `Scenario` is the class used to create and control the Scenarios of the game.
   *  the class is a direct extension of `Window`.
   *
   */
  constructor(props: ScenarioProps) {
    super({
      x: 300,
      y: 20,
      width: 650,
      height: 250,
      ...props,
      id: "scenario-" + props.id,
    });
    this.image = "../build/resources/backgrounds/" + props.image;
    this.fullscreen = props.fullscreen;

    if (this.fullscreen) {
      this.x = 0;
      this.y = 0;
      this.width = "100%";
      this.height = "100%";
      this.borderSize = 0;
    }

    $(`#${this.id}`).css({
      backgroundColor: this.borderColor,
      backgroundImage: `url(${this.image})`,
      backgroundPosition: `center`,
      backgroundSize: `cover`,
      backgroundOrigin: `content-box`,
      backgroundRepeat: `no-repeat`,
    });
  }
}
