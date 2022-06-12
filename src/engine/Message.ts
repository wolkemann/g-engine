import $ from "jquery";
import { Howl } from "howler";
import Window, { WindowProps } from "./Window";

interface MessageProps extends WindowProps {
  /** @property the size of the text in pixel @default 30 */
  textSize?: number;
  /** @property the color of the text @default "grey" */
  textColor?: string;
  /** @property the name of the font @default "Helvetica" */
  fontName?: string;
}

export default class Message extends Window {
  textSize: number;
  textColor: string;
  fontName: string;
  textLines: number;
  finishedTyping: boolean;

  /**
   * `Message` class used to create a message box to type text inside
   * @method addText to add text inside the message box
   */
  constructor(props: MessageProps) {
    super({
      x: "center",
      y: 350,
      width: 650,
      height: 250,
      ...props,
      id: "message-" + props.id,
    });
    this.textSize = props.textSize ? props.textSize : 30;
    this.textColor = props.textColor ? props.textColor : "grey";
    this.fontName = props.fontName ? props.fontName : "Helvetica";
    this.textLines = 0;
    this.finishedTyping = false;

    this.generateElement();
  }
  /**
   * Generates the Message as DOM Element.
   */
  generateElement() {
    this.generateWindow();
    $(`#${this.id}`)
      .css({
        fontSize: this.textSize,
        color: this.textColor,
        fontFamily: this.fontName,
      })
      .addClass("message");

    $(`#${this.id}`).html(
      `
      <div class="message-content" id="${this.id}-content"></div>
      <div class="message-continue" id="${this.id}-continue"></div>
      `
    );
  }
  /**
   *`addText` types text inside the Message box.
   *
   * @param props `{text, voice, typewriter, newLine}`
   */
  addText(props: {
    /** @property text the text string to be displayed in the messagebox. */
    text: string;

    /**
     * @property voice plays a sound when the message is displayed. Put your sounds inside `/public/resources/sounds/`.
     * @example "voice.wav"
     *  */
    voice?: string;

    /** @property enables typewriting effect when `true`. */
    typewriter?: boolean;

    /** @property creates a new text paragraph when `true`. */
    newLine?: boolean;
  }) {
    //resetting data
    this.finishedTyping = false;
    let currentLine = this.textLines;

    $(`#${this.id}-continue`).html(``);
    props.typewriter === undefined
      ? (props.typewriter = true)
      : props.typewriter;
    if (props.voice) {
      let sound = new Howl({
        src: [`../build/resources/sounds/${props.voice}`],
        volume: 0.8,
        html5: true,
      });
      sound.play();
    }
    if (props.newLine || this.textLines == 0) {
      /**
       * check if this text line is the first or if a new text line must be created.
       */
      this.textLines++;
      currentLine = this.textLines;
      $(`#${this.id}-content`).append(
        `<p class="message-textLine" id="${this.id}-textLine-${currentLine}"></p>`
      );
    }
    /**
     * check if the typewriter mode is enabled
     */
    if (props.typewriter) {
      let i = 0;
      const typewriter = () => {
        if (i < props.text.length) {
          $(`#${this.id}-textLine-${currentLine}`).append(props.text[i]);
          i++;
          setTimeout(typewriter, 50);
        } else {
          this.finishedTyping = true;
          $(`#${this.id}-continue`).html(`&#5125`);
        }
      };
      typewriter();
    } else {
      /**
       * If typewriter mode is off the text is display normally.
       */
      this.finishedTyping = true;
      $(`#${this.id}-textLine-${currentLine}`).append(props.text);
      $(`#${this.id}-continue`).html(`&#5125`);
    }

    return this;
  }

  clearText() {
    this.textLines = 0;
    $(`#${this.id}-content`).html("");
    $(`#${this.id}-continue`).html("");
  }
}
