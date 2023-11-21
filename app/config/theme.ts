// import {store} from '../redux/store';

export const fonts = {
    primary: 'Montserrat-SemiBold',
    secondry: 'Montserrat-Medium',
    title: 'Montserrat-Black',
    subTitle: 'Montserrat-ExtraBoldItalic',
    dmSans: 'DM Sans',
    textInput: "DMSans-Medium",
    textFont: "DMSans-Regular",
  };
  
  export const lightTheme = {
    primary: '#064081',
    secondry: '#02B0E8',
    text: '#414042',
   
  };
  
  export const darkTheme = {
    primary: '#064081',
    secondry: '#02B0E8',
    text: '#414042',
   
  };
  
  // const isDarkMode = store.getState()?.Theme?.isDarkMode;
  const isDarkMode = false;
  
  export const colors = isDarkMode ? darkTheme : lightTheme;
  