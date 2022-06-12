import $ from "jquery";
import { Howl } from "howler";
/**
 * Automatically set the game window content equal to the width and height specified in electron.
 */
export function setRendererSize() {
  //@ts-ignore
  const { width, height } = window.electronAPI.getWindowProps();

  $("#app").css({
    margin: "auto",
    position: "relative",
    width: width,
    height: height,
  });
}
/**
 * `Createmusic` creates a music using Howler.js
 * @param track
 * @param loop
 */
export function CreateMusic(track: string, loop?: boolean) {
  return new Howl({
    src: [`../build/resources/music/${track}`],
    loop: loop ? loop : true,
    html5: true,
  });
}
/**
 * `Createsound` creates a sound effectS using Hwoler.js
 * @param track
 * @param loop
 */
export function CreateSound(track: string, loop?: boolean) {
  return new Howl({
    src: [`../build/resources/sounds/${track}`],
    loop: loop ? loop : false,
    html5: true,
  });
}
export class Sequence {
  eventList: Array<any>;
  eventsPlayed: number;
  /**
   * `Sequence` contains the methods to create a sequence of events, which consists in manipulating
   * the elements on the screen(i.e. an `Actor`, a `Scenario` or a `Message`).
   * @property `eventList` the event array where all the instructions are stored and executed in order.
   * @property `eventsPlayed` the number of event played inside the event array `eventList`
   * @method `event`
   * @method `animate`
   * @method `fade`
   * @method `addText`
   * @method `addLine`
   * @method `clearText`
   * @method `wait`
   * @method `pressButton`
   * @method `playAudio`
   * @method `stopAudio`
   * @method `fadeAudio`
   */
  constructor() {
    this.eventList = [];
    this.eventsPlayed = 0;

    return this;
  }
  /**
   * @method `event` adds a element instruction inside the event array `eventList`.
   * @param props.element the element you want to manipulate, i.e. an `Actor`, a `Message`, or a `Scenario`.
   * @param props.method the method of the corresponding element you want to use, i.e. "animateWindow".
   * @param props.args an array which contains the arguments of the corresponding method.
   * @example 
   * sequence.event({
    element: Message,
    method: "animateWindow",
    args: [{ opacity: 0 }, { opacity: 1 }, 3000],
  })
   */
  event(props: { element: object; method: string; args: Array<any> }) {
    this.eventList.push({
      element: props.element,
      method: props.method,
      args: props.args,
    });

    return this;
  }
  /**
   * @method `animate` adds the "animateWindow" method inside the event array `eventList` for the selected element.
   * @param element the element you want to manipulate, i.e. an `Actor`, a `Message`, or a `Scenario`.
   * @param starting the starting values at which the animation will start.
   * @param finishing the final values at which the animation will end.
   * @param time the time it takes to complete the animation
   * @example
   * sequence.animate(window, {opacity: 0}, {opacity: 1}, 2000)
   */
  animate(element: object, starting: object, finishing: object, time: number) {
    this.eventList.push({
      element: element,
      method: "animateWindow",
      args: [starting, finishing, time],
    });

    return this;
  }
  /**
   * @method `fade` adds the "fadeImage" method inside the event array `eventList` for the selected element.
   * @param element the element you want to manipulate, i.e. an `Actor`, a `Message`, or a `Scenario`.
   * @param starting the starting values at which the animation will start.
   * @param finishing the final values at which the animation will end.
   * @param time the time it takes to complete the animation
   * @example
   * sequence.fade(actor, {opacity: 0}, {opacity: 1}, 2000)
   */
  fade(element: object, starting: object, finishing: object, time: number) {
    this.eventList.push({
      element: element,
      method: "fadeImage",
      args: [starting, finishing, time],
    });

    return this;
  }
  /**
   * Removes the selected Element as DOM Element. It will still exist as an Object,
   * so you can recreate it with createElement.
   * @param element the element you want to remove.
   * @example sequence.removeElement(element)
   */
  removeElement(element: object) {
    this.eventList.push({
      element: element,
      method: "removeElement",
      args: [],
    });

    return this;
  }
  /**
   * Clears the text inside a Message element.
   * @param element the Message element you want to clear the text.
   * @example sequence.clearText(Message)
   */
  clearText(element: object) {
    this.eventList.push({
      element: element,
      method: "clearText",
      args: [],
    });

    return this;
  }
  /**
   * Adds a text in the same line inside a Message element.
   * @param element the Message element where the text will be typed.
   * @param text the text string that will be displayed.
   * @param options the options you can choose.
   * @param options.mustPress when `true` the user must click on this element to move forward.
   * @param options.voice when the string is specified a sound effect will play.
   * @example sequence.addText(Message, "this is a text", {mustPress: true, voice: "voice.wav"})
   */
  addText(
    element: object,
    text: string,
    options?: { mustPress?: boolean; voice?: string }
  ) {
    this.eventList.push({
      element: element,
      method: "addText",
      args: [{ text: text, voice: options?.voice ? options?.voice : false }],
    });

    if (options?.mustPress) {
      this.eventList.push({
        element: element,
        method: "pressButton",
      });
    }
    return this;
  }
  /**
   * Adds a text in a new line inside a Message element.
   * @param element the Message element where the text will be typed.
   * @param text the text string that will be displayed.
   * @param options the options you can choose.
   * @param options.mustPress when `true` the user must click on this element to move forward.
   * @param options.voice when the string is specified a sound effect will play.
   * @example sequence.addText(Message, "this is a text", {mustPress: true, voice: "voice.wav"})
   */
  addLine(
    element: object,
    text: string,
    options?: { mustPress?: boolean; voice?: string }
  ) {
    this.eventList.push({
      element: element,
      method: "addText",
      args: [{ text: text, voice: options?.voice ? options.voice : false }],
    });

    if (options?.mustPress) {
      this.eventList.push({
        element: element,
        method: "pressButton",
      });
    }

    return this;
  }
  /**
   * @method `wait` adds an instruction inside the event array `eventList` that tells the event loop to wait before
   * processing new event.
   * @param time - the waiting time in milliseconds.
   * @example sequence.wait(5000);
   */
  wait(time: number) {
    this.eventList.push({
      element: "scene",
      method: "wait",
      args: time,
    });

    return this;
  }
  /**
   * @method `pressButton` adds an instruction inside the event array `eventList` that will stop the event loop and
   * resume it only when the user clicks a selected element(i.e. a `Message`).
   * @param element the element that will become clickable.
   * @example sequence.pressButton(Message)
   *
   */
  pressButton(element: object) {
    this.eventList.push({
      element: element,
      method: "pressButton",
    });

    return this;
  }
  /**
   * @method `playAudio` adds an instruction inside the event array `eventList` to play a music or a sound.
   * @param track the music/sound object.
   * @param volume the volume of the track (from 0 to 1).
   * @example sequence.playAudio(Music, 0.5)
   */
  playAudio(track: { volume: Function }, volume?: number) {
    this.eventList.push({
      element: track,
      method: "playAudio",
      args: [volume ? volume : 0],
    });

    return this;
  }
  /**
   * @method `stopAudio` adds an instruction inside the event array `eventList` to stop the selected music or sound.
   * @param track the music/sound object.
   * @example sequence.stopAudio(Music)
   */
  stopAudio(track: object) {
    this.eventList.push({
      element: track,
      method: "stop",
      args: [],
    });

    return this;
  }
  /**
   * @method `fadeAudio` adds an instruction inside the event array `eventList` to create fade effect
   * for the selected music or sound.
   * @param track the music/sound object.
   * @param args the Howler.js fade arguments `[from, to, seconds]`
   *
   */
  fadeAudio(track: object, args: Array<any>) {
    this.eventList.push({
      element: track,
      method: "fade",
      args: args,
    });

    return this;
  }
  /**
   * Closes the game window calling the Electron's API.
   * @example sequence.closeGame()
   */
  closeGame() {
    this.eventList.push({
      element: "none",
      method: "closeGame",
      args: [],
    });

    return this;
  }
  /**
   * Renders the 3d Scene stored in your ThreeD element.
   * @param element the ThreeD element where do you want to render the 3d canvas
   * @example sequence.renderCanvas(example3dScene)
   */
  renderCanvas(element: object) {
    this.eventList.push({
      element: element,
      method: "renderCanvas",
      args: [],
    });

    return this;
  }
  /**
   * @method `run` plays the events inside the array `eventList`. Use it always after you have inserted your events.
   */
  run() {
    // resetting data
    let pressButtonRequired = false;
    let timer = 0;

    // destructuring the current event to be played and the previous
    let { element, method, args } = this.eventList[this.eventsPlayed];
    let prevElement =
      this.eventList[this.eventsPlayed > 0 ? this.eventsPlayed - 1 : 0].element;

    // check which method must be executed
    switch (method) {
      case "wait":
        timer = args;
        break;

      case "pressButton":
        pressButtonRequired = true;
        break;

      case "playAudio":
        element.volume(...args);
        element.play();
        break;

      case "fade":
        element.fade(...args);
        break;

      case "closeGame":
        //@ts-ignore
        window.electronAPI.closeWindow();
        break;

      case "renderCanvas":
        element.renderCanvas();
        break;

      default:
        element[method](...args);
        break;
    }

    // move the event list by 1
    this.eventsPlayed++;

    // check if the user must click an element
    if (pressButtonRequired) {
      $(`#${element.id}`).on("click", () => {
        // if the previous event was a Message type, we wait before all the text is typed

        if (prevElement.id.includes("message-")) {
          if (prevElement.finishedTyping) {
            // after the text is fully typed, we push forward to the next event
            $(`#${element.id}`).off();
            this.run();
          }
        } else {
          $(`#${element.id}`).off();
          this.run();
        }
      });
    } else {
      // if a .wait() is used the we wait the corrisponding time before pushing forward to the next event in the list.
      setTimeout(() => {
        if (this.eventsPlayed == this.eventList.length) return;
        this.run();
      }, timer);
    }
  }
}
export class Story {}
