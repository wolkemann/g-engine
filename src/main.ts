import "./style.css";
import "./engine/css/Message.css";

import Actor from "./engine/Actor";
import Scenario from "./engine/Scenario";
import Message from "./engine/Message";
import { CreateMusic, Sequence } from "./engine/GEngine";

//@ts-ignore
window.electronAPI.gg();

const scenario = new Scenario({
  id: "sfondo",
  image: "bg3.png",
  fullscreen: true,
  opacity: 1,
})
  .animateWindow({}, {}, 0)
  .fadeImage({}, {}, 0);

const attore = new Actor({
  id: "lana",
  face: "lana.png",
  opacity: 0,
  x: 480,
  y: 200,
  borderColor: "aquamarine",
}).fadeImage({}, {}, 0);

const messaggio = new Message({
  id: "message",
  height: 200,
  y: 500,
});

const musica = CreateMusic("melody.wav");

const scena = new Sequence();
scena
  .wait(1000)
  .animate(messaggio, { opacity: 0 }, { opacity: 1 }, 2000)
  .wait(4000)
  .addText(messaggio, "... ", { mustPress: true })
  .playAudio(musica)
  .wait(10)
  .fadeAudio(musica, [0, 0, 15000])
  .clearText(messaggio)
  .wait(1500)
  .addText(messaggio, "... ... ... ")
  .wait(1500)
  .addText(messaggio, " H-Hello?", { mustPress: true })
  .clearText(messaggio)
  .addText(messaggio, " Did someone turned the lights off?", {
    mustPress: true,
  })
  .addText(messaggio, " I can't see anything around me...", { mustPress: true })
  .clearText(messaggio)
  .animate(attore, { opacity: 0 }, { opacity: 1 }, 2000)
  .wait(2000)
  .clearText(messaggio)
  .addText(messaggio, "Well, that's quite a mess.", { mustPress: true })
  .clearText(messaggio)
  .wait(1400)
  .addText(messaggio, "Ehi! You there! ", { mustPress: true })
  .addLine(messaggio, "Yes, you in front of me. ", { mustPress: true })
  .addText(messaggio, "Maybe you can help me.", { mustPress: true })
  .clearText(messaggio)
  .addText(messaggio, "Try to click on me.")
  .pressButton(attore)
  .clearText(messaggio)
  .fade(attore, {}, { opacity: 0 }, 2000)
  .wait(2500)
  .addText(messaggio, "Wow! That worked. ", { mustPress: true })
  .addText(messaggio, "It seems we have a wizard here, uh? ", {
    mustPress: true,
  })
  .addText(messaggio, "Why don't you try to remove darkness around me?")
  .pressButton(scenario)
  .clearText(messaggio)
  .fade(scenario, {}, { opacity: 0 }, 2000)
  .wait(2500)
  .addText(messaggio, "Well, that's quite an accomplish.", { mustPress: true })
  .addText(messaggio, " It is awalys good to have smart people around.", {
    mustPress: true,
  })
  .addText(messaggio, " I suppose.", { mustPress: true })
  .clearText(messaggio)
  .wait(1500)
  .addText(messaggio, "Anyway, back to work.", { mustPress: true })
  .clearText(messaggio)
  .addText(
    messaggio,
    "Thank you for your interest in the Geschichte Engine and thank you once again for the time that you decided to invest in dowloading and playing this demo.",
    { mustPress: true }
  )
  .clearText(messaggio)
  .addText(messaggio, "So what's this Geschichte Engine, you may ask.", {
    mustPress: true,
  })
  .clearText(messaggio)
  .addText(
    messaggio,
    '"Geschichte" means "story", in german, and that\'s basically what this engine is about.',
    { mustPress: true }
  )
  .clearText(messaggio)
  .addText(
    messaggio,
    "A way to create simple, interactive visual novel with TypeScript. ",
    { mustPress: true }
  )
  .addText(
    messaggio,
    "It uses Electron to build a executable for Windows, MacOs and Linux, so that everybody can play your story.",
    { mustPress: true }
  )
  .clearText(messaggio)
  .addText(messaggio, "But this engine is not only about visual things.", {
    mustPress: true,
  })
  .addText(
    messaggio,
    " If you have the volume up, you can probably already hear some music playing in the background.",
    { mustPress: true }
  )
  .clearText(messaggio)
  .addText(messaggio, "You can even make me talk for real!", {
    mustPress: true,
  })
  .addText(messaggio, " If you have the budget to do so, of course :)", {
    mustPress: true,
  })
  .clearText(messaggio)
  .wait(1500)
  .addText(messaggio, "Ahah, I'm joking! Of Course I can talk.", {
    mustPress: true,
  })
  .addText(messaggio, " Let me try.", {
    mustPress: true,
  })
  .clearText(messaggio)
  .wait(2000)
  .addText(
    messaggio,
    "Bla bla bla, blablablabla bla bla blablabla blabla bla bla bla. BLA? Blabla bla blablabla!",
    {
      mustPress: true,
      voice: "talk.mp3",
    }
  )
  .clearText(messaggio)
  .wait(1100)
  .addText(messaggio, "... Uhm... ", { mustPress: true })
  .addText(messaggio, "that didn't worked as I expected.", { mustPress: true })
  .clearText(messaggio)
  .addText(
    messaggio,
    'Anyway, pretty static for a so called "dynamic engine", don\'t you think? ',
    { mustPress: true }
  )
  .addText(messaggio, "Why don't you try to animate something?", {
    mustPress: true,
  })
  .clearText(messaggio)
  .addText(messaggio, "Click again on me to move my window.")
  .pressButton(attore)
  .clearText(messaggio)
  .animate(attore, {}, { x: 30, y: 60 }, 1200)
  .wait(1400)
  .addText(messaggio, "Nice, all went good without a crash.", {
    mustPress: true,
  })
  .clearText(messaggio)
  .addText(
    messaggio,
    "(By the way, I'm writing all of this during a flight. If you get the irony.)",
    {
      mustPress: true,
    }
  )
  .clearText(messaggio)
  .addText(messaggio, "Now, why don't we try to move the message box? ", {
    mustPress: true,
  })
  .addText(messaggio, "I'm sure you already now what to do. ", {
    mustPress: true,
  })
  .clearText(messaggio)
  .animate(messaggio, {}, { opacity: 0 }, 1200)
  .wait(1800)
  .animate(
    messaggio,
    { width: 500, height: 0, y: 60 },
    { opacity: 1, height: 340 },
    1500
  )
  .wait(1800)
  .addText(messaggio, "Quite fantastic! Don't you think? ", {
    mustPress: true,
  })
  .addText(messaggio, "Of course you can add as many elements as you want. ", {
    mustPress: true,
  })
  .addText(
    messaggio,
    "The only limit is your imagination! (So says the Marketing Team.)",
    {
      mustPress: true,
    }
  )
  .run();
