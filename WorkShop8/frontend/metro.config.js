const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { get } = require("node:http");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './app/global.css' });