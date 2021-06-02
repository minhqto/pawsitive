import {createMuiTheme} from "@material-ui/core/styles";

const PawsitiveTheme = createMuiTheme({
    palette:{
        primary:{
            light: '#ff94c2',
            main: '#f06292',
            dark: '#ba2d65',
            contrastText: '#000000',
        },
        secondary:{
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000000',
        }
    }
})

export default PawsitiveTheme;