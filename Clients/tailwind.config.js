/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        popinLight: ["popinLight"],
        popinRegular: ["popinRegular"],
        popinMedium: ["popinMedium"],
        popinSemiBold: ["popinSemiBold"],
        popinBold: ["popinBold"],
        popinExtraBold: ["popinExtraBold"],
        popinBlack: ["popinBlack"],
        popinExtraLight: ["popinExtraLight"],
        popinThin: ["popinThin"],
        popinLightItalic: ["popinLightItalic"],
        popinItalic: ["popinItalic"],
        popinMediumItalic: ["popinMediumItalic"],
        popinSemiBoldItalic: ["popinSemiBoldItalic"],
        popinBoldItalic: ["popinBoldItalic"],
        popinExtraBoldItalic: ["popinExtraBoldItalic"],
        popinBlackItalic: ["popinBlackItalic"],
      },
    },
  },
  plugins: [],
}
