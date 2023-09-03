const breakpoints = ["576px", "768px", "992px", "1200px"];

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
};

export default theme;
