import $ from "jquery";
import Window, { WindowProps } from "./Window";

interface ActorProps extends WindowProps {
  /**
   * @property the Actor's face. Please store your faces in "public/resources/faces/[file]".
   * @example face: "actor.png"
   *
   * */
  face: string;
}

export default class Actor extends Window {
  face: string;
  /**
   * `Actor` is the class used to create and control the actors of the game.
   *  the class is a direct extension of `Window`.
   *
   */
  constructor(props: ActorProps) {
    super({
      id: "actor-" + props.id,
      x: props.x ? props.x : 20,
      y: props.y ? props.y : 20,
      width: props.width ? props.width : 250,
      height: props.height ? props.height : 280,
      borderSize: props.borderSize ? props.borderSize : undefined,
      borderColor: props.borderColor ? props.borderColor : undefined,
      borderRadius: props.borderRadius ? props.borderRadius : undefined,
    });

    this.face = "../build/resources/faces/" + props.face;

    this.generateElement();
  }
  /**
   * Generates the Actor as DOM Element.
   */
  generateElement() {
    this.generateWindow();
    $(`#${this.id}`).css({
      backgroundColor: this.borderColor,
      backgroundImage: `url(${this.face})`,
      backgroundPosition: `center`,
      backgroundSize: `cover`,
      backgroundOrigin: `content-box`,
      backgroundRepeat: `no-repeat`,
    });
  }
}
