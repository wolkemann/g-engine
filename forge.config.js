const path = require("path");

module.exports = {
  packagerConfig: {
    icon: path.join(__dirname, "/build/favicon.ico"),
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "g-engine",
        setupIcon: path.join(__dirname, "/build/favicon.ico"),
        iconUrl: path.join(__dirname, "/build/favicon.ico"),
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};
