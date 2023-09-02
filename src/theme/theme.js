const breakpoints = ["576px", "768px", "992px", "1200px"];
// breakpoints.sm = [0];
// breakpoints.md = [1];
// breakpoints.lg = [2];
// breakpoints.xl = [3];

const theme = {
  colors: {
    white: "#fff",
    black: "#000",
    blue: "#5773ff",
    warning: "#d0342c",
  },

  background: {
    primary: "#212121",
    primary_light: "#2b2b2b",
    secondary: "#5773ff",
    warning: "#d0342c",
  },

  mediaQueries: {
    small: `@media screen and (min-width: ${breakpoints[0]})`,
    medium: `@media screen and (min-width: ${breakpoints[1]})`,
    large: `@media screen and (min-width: ${breakpoints[2]})`,
    ExtraLarge: `@media screen and (min-width: ${breakpoints[3]})`,
  },

  fontSizes: ["1.2rem", "1.6rem", "2rem", "2.4rem", "5rem"],

  space: [0, 4, 8, 16],
};

export default theme;
