import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  box-sizing: border-box;
  --Body: black;
  --Background: white;
  --OnBackground: #2332EB;
  --OnMidground: white;
  --Midground: #2332EB;
  --Foreground: #9CBBFB;
  --OnForground: #081078;
  --Primary: #2332EB;
  --PrimaryLight: #9CBBFB;
  --PrimaryDark: #081078;
  --Accent: #FFE701;
  --AccentLight: #FFF6A4;
  --OnAccent: black;
  --AccentBorder: #FFE701;
  --Error: #EE312F;
  --ErrorLight: #FDCCCB;
  --OnErrorLight: #EE312F;
  --Disabled: #E5E5E5;
  --OnDisabled: #666666;
  --DisabledBorder:#8B8B8B;
  --MaxWidth: 1000px;
  --BoxShadow: 0 12px 24px 0 rgba(0,0,0,0.09)
}
*,*:before,*:after {
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

h1, h2 {
  font-family: 'Asar', Merriweather, Impact, Serif;
  letter-spacing: 0.15rem;
}

body {
  font-family: 'Asap','helvetica', 'arial', sans-serif;
  padding: 0;
  margin: 0;
  font-size: 2rem;
  line-height: 2;
  letter-spacing: 0.15rem;
}

a {
  text-decoration: none;
  color: var(--Primary);
}
a:hover {
  text-decoration: underline;
}
button {
  font-family: 'Asap','helvetica', 'arial', sans-serif;;
}
`;

export default GlobalStyles;
