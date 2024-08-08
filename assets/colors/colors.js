const colorsDark = {
  bgColorPri: '#373737',
  bgColorSec: '#FFFFFF',
  bgColorTer: '#5c5c5c',

  textColorPri: '#fff7fa',
  textColorSec: '#373737',
  textColorTer: '#373737',

  border : '#fff7fa',
  gray : '#d6d6d6', 


//=======================================


  white : '#FFFFFF',
  black : '#000000',
 
  disabled: '#f2f2f2',
  primary : '#E0115F', //pink
  primaryLight : '#f7faff', //light blue

  gold: '#FFD700',

  transparentDark: 'rgba(0, 0, 0, 0.5)',

  success : '#406b42',
  danger : '#d43b24',
  warning : '#db913b',
  info : '#3b70db',

  bgGold: '#fff9e2',
  bgSilver: '#cccccc',
  bgBronze: '#ffe6cc',

  primary: '#910c3e', 
  secondary : '#0F52BA',
}

const getThemeColors = () => {
  let theme = 'dark'; // get from async storage

  if (theme === 'light') {
    return colorsLight;
  } else {
    return colorsDark;
  }
};

const colors = getThemeColors();

export { colors };