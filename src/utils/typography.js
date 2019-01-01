import Typography from "typography"


// const typography = new Typography({ baseFontSize: "18px" })
import bootstrapTheme from "typography-theme-bootstrap"

const typography = new Typography(bootstrapTheme);
const {rhythm, scale} = typography;
export {rhythm, scale, typography as default};