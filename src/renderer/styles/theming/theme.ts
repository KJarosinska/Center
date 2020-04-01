const columnWidth = 6.5
const gutterWidth = 4

/**
 * All colors from palette.
 * Unused are commented out
 */

const black = "#000000"
const white = "#ffffff"
const grey1 = "#3b3f42"
const grey2 = "#6a6a6a"
const grey3 = "#a5a5a5"
const grey4 = "#d2d6db"
const grey5 = "#cdcecf"
const grey6 = "#f4f5f6"
const grey7 = "#fbfbfb"
const grey8 = "#e9e9e9"
const grey9 = "#e6e8eb"
const grey10 = "rgba(0, 0, 0, 0.08)"
const blue1 = "#3e6988"
const blue2 = "#6d9bbc"
const dark = "#232426"
// const blue3 = "#aebec9"
const blue4 = "#e3f3ff"
const blue5 = "#f3f8fc"
// const red1 = "#e96a6a"

const transparentGrey1 = "rgba(188,188,188,0.5)"

const theme = {
  color: {
    text: {
      active: black, // "#191c20"
      black,
      grey: grey5,
      darkGrey: grey1,
      primary: black,
      inverted: white,
      faded: grey2,
      supplementary: blue2,
      placeholder: grey3,
      dark: black,
      hover: blue1,
    },
    background: {
      blue: blue2,
      lightBlue: blue5,
      progressBar: blue4,
      light: white,
      app: grey7,
      dark: black,
      dark2: dark,
      grey: grey5,
      grey2: grey6,
      grey3: grey8,
      grey4: grey3,
      grey5: grey7,
      inputDark: grey1,
      accent: grey6,
      primaryDark: grey6,
      avatarDark: grey6,
      avatarLight: white,
      tableLabel: grey7,
      tableRow: white,
    },
    border: {
      app: grey9,
      active: black, // "#191c20"
      dark: black,
      default: grey5,
      grey: grey5,
      grey2: grey6,
      grey3: grey8,
      hover: grey1,
      listItem: grey4,
      light: grey4,
      intense: blue2,
    },
    boxShadow: {
      app: grey10,
      grey: transparentGrey1,
    },
  },
  layout: {
    width: "73.75rem",
  },
  breakpoint: {
    tablet: 48,
  },
  opacity: {
    regular: "0.6",
  },
  fontWeight: {
    light: 300,
    default: 400,
    bold: 700,
  },
  height: {
    small: 0.3,
    medium: 0.8,
  },
  borderRadius: {
    small: 0.2,
    medium: 0.5,
    big: 1.2,
  },
  letterSpacing: {
    negative: -0.06,
    smaller: 0.02,
    small: 0.04,
    medium: 0.075,
    regular: 0.1,
  },
  lineHeight: {
    textarea: 1.8,
  },
  font: {
    primary:
      "GT Pressura, Arial, Helvetica, Gill Sans, Lucida, Helvetica Narrow, sans-serif",
  },
  grid: {
    columnWidth,
    gutterWidth,
  },
  transitionTime: {
    standard: "500ms",
    faster: "0.3s",
    quick: "250ms",
    veryQuick: "0.15s",
    slow: "1s",
  },
  transitionTimingFunction: {
    standard: "linear",
    easeInOut: "ease-in-out",
    smooth: "ease-in-out",
  },
  width: {
    buttonBig: columnWidth * 2 + gutterWidth,
    buttonMedium: gutterWidth * 3,
    buttonSmall: columnWidth + gutterWidth,
    viewWidth: columnWidth * 12 + gutterWidth * 13,
    menuWidth: columnWidth * 3 + gutterWidth * 3,
  },
  zIndex: {
    content: 1,
    menu: 2,
    dropdown: 3,
    modalBackdrop: 4,
    modal: 5,
  },
}

export type Theme = typeof theme

export default theme
