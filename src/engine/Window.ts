import $ from "jquery";

export interface WindowProps {
  /** @property The DIV id used to control the window. */
  id: string;

  /** @property The window X coordinate in pixel. */
  x?: number | string;

  /** @property The window Y coordinate in pixel. */
  y?: number | string;

  /** @property The window width in pixel. */
  width?: number | string;

  /** @property The window height in pixel. */
  height?: number | string;

  /** @property The window background color @default "black". */
  backgroundColor?: string;

  /** @property The window opacity. */
  opacity?: number;

  /** @property The border size of the window in pixel. @default 3 */
  borderSize?: number;

  /** @property The window border color. @default "#CC0000" */
  borderColor?: string;

  /** @property The window border radius in pixel. @default 2 */
  borderRadius?: number;
}

type animateWindowProps = Omit<WindowProps, "id">;

interface imageFadeProps {
  /** @property the fade mask width in percentage. (`1 = 1%)`  */
  maskWidth?: number;

  /** @property the fade mask height in percentage. (`1 = 1%)`  */
  maskHeight?: number;

  /** @property fade mask color. @default "black" */
  fadeColor?: string;

  /** @property fade mask opacity. @default 1 */
  opacity?: number;
}

export default class Window {
  id: string;
  x: number | string;
  y: number | string;
  width: number | string;
  height: number | string;
  backgroundColor: string;
  opacity: number;
  borderSize: number;
  borderColor: string;
  borderRadius: number;
  /**
   * `Window` is the main class used to print elements on the screen.
   *  the classes `Actor`, `Message`, are extensions of these class.
   * @method animateWindow
   * @method fadeImage
   *
   */
  constructor(props: WindowProps) {
    // parsing the shortcut coordinates like "center", "left", "right"

    this.id = props.id;
    this.x = props.x ? props.x : 0;
    this.y = props.y ? props.y : 0;
    this.width = props.width ? props.width : 0;
    this.height = props.height ? props.height : 0;
    this.backgroundColor = props.backgroundColor
      ? props.backgroundColor
      : "black";
    this.opacity = props.opacity ? props.opacity : 1;
    this.borderSize = props.borderSize ? props.borderSize : 3;
    this.borderColor = props.borderColor ? props.borderColor : "#CC0000";
    this.borderRadius = props.borderRadius ? props.borderRadius : 2;

    $(`#app`).append(
      `<div id="${this.id}">
        <div id="${this.id}-mask"></div>
      </div>`
    );

    return this;
  }
  /**
   * `animateWindow` creates animation for the Window.
   *
   * @param initialValues The initial state values `Object`
   * @param finalValues  The final state values `Object`
   * @param time the animation duration in milliseconds.
   *
   */
  animateWindow(
    initialValues: animateWindowProps,
    finalValues: animateWindowProps,
    time: number
  ) {
    const initial = {
      ...this,
      ...initialValues,
    };

    const final = {
      ...initial,
      ...finalValues,
    };

    $(`#${this.id}`).css({
      position: "absolute",
      left: initial.x,
      top: initial.y,
      width: initial.width,
      height: initial.height,
      backgroundColor: initial.backgroundColor,
      opacity: initial.opacity,
      border: `${initial.borderSize}px solid ${initial.borderColor}`,
      borderRadius: initial.borderRadius,
      boxShadow: "0px 0px 8px rgba(0 0 0 / 80%)",
    });

    $(`#${this.id}`).animate(
      {
        position: "absolute",
        left: final.x,
        top: final.y,
        width: final.width,
        height: final.height,
        backgroundColor: final.backgroundColor,
        opacity: final.opacity,
        border: `${final.borderSize}px solid ${final.borderColor}`,
        borderRadius: final.borderRadius,
        boxShadow: "0px 0px 8px rgba(0 0 0 / 80%)",
      },
      time,
      () => {
        this.updateWindowprops(final);
      }
    );

    return this;
  }
  /**
   * `fadeImage` create fade transitions inside the inner content of the window without altering the window itself.
   *
   * @param initialValues The initial state values `{ maskWidth, maskHeight, fadeColor, opacity } : Object`
   * @param finalValues  The final state values `{ maskWidth, maskHeight, fadeColor, opacity } : Object`
   * @param time the animation duration in milliseconds.
   *
   */
  fadeImage(
    initialValues: imageFadeProps,
    finalValues: imageFadeProps,
    time: number
  ) {
    const initial = {
      maskWidth: initialValues.maskWidth ? initialValues.maskWidth : 100,
      maskHeight: initialValues.maskHeight ? initialValues.maskHeight : 100,
      fadeColor: initialValues.fadeColor ? initialValues.fadeColor : "black",
      opacity: initialValues.opacity ? initialValues.opacity : 1,
    };

    const final = {
      ...initial,
      ...finalValues,
    };

    $(`#${this.id}-mask`).css({
      width: `${initial.maskWidth}%`,
      height: `${initial.maskHeight}%`,
      backgroundColor: initial.fadeColor,
      opacity: initial.opacity,
    });

    $(`#${this.id}-mask`).animate(
      {
        width: `${final.maskWidth}%`,
        height: `${final.maskHeight}%`,
        backgroundColor: final.fadeColor,
        opacity: final.opacity,
      },
      time
    );

    return this;
  }

  updateWindowprops(updatedValues: any) {
    this.x = updatedValues.x;
    this.y = updatedValues.y;
    this.width = updatedValues.width;
    this.height = updatedValues.height;
    this.backgroundColor = updatedValues.backgroundColor;
    this.opacity = updatedValues.opacity;
    this.borderSize = updatedValues.borderSize;
    this.borderColor = updatedValues.borderColor;
    this.borderRadius = updatedValues.borderRadius;
  }
}
