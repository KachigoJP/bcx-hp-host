// import React from "react";
// import { Global, css } from "@emotion/react";

// // Source
// import montserratLatin300Eot from "@assets/fonts/montserrat-v15-latin-300.eot";
// import montserratLatin300Woff2 from "../fonts/montserrat-v15-latin-300.woff2";
// import montserratLatin300Woff from "../fonts/montserrat-v15-latin-300.woff";
// import montserratLatin300Tff from "../fonts/montserrat-v15-latin-300.ttf";
// import montserratLatin300Svg from "../fonts/montserrat-v15-latin-300.svg";

// import montserratLatinRegularEot from "../fonts/montserrat-v15-latin-regular.eot";
// import montserratLatinRegularWoff2 from "../fonts/montserrat-v15-latin-regular.woff2";
// import montserratLatinRegularWoff from "../fonts/montserrat-v15-latin-regular.woff";
// import montserratLatinRegularTff from "../fonts/montserrat-v15-latin-regular.ttf";
// import montserratLatinRegularSvg from "../fonts/montserrat-v15-latin-regular.svg";

// import montserratLatin500Eot from "../fonts/montserrat-v15-latin-500.eot";
// import montserratLatin500Woff2 from "../fonts/montserrat-v15-latin-500.woff2";
// import montserratLatin500Woff from "../fonts/montserrat-v15-latin-500.woff";
// import montserratLatin500Tff from "../fonts/montserrat-v15-latin-500.ttf";
// import montserratLatin500Svg from "../fonts/montserrat-v15-latin-500.svg";

// import montserratLatin600Eot from "../fonts/montserrat-v15-latin-600.eot";
// import montserratLatin600Woff2 from "../fonts/montserrat-v15-latin-600.woff2";
// import montserratLatin600Woff from "../fonts/montserrat-v15-latin-600.woff";
// import montserratLatin600Tff from "../fonts/montserrat-v15-latin-600.ttf";
// import montserratLatin600Svg from "../fonts/montserrat-v15-latin-600.svg";

// import montserratLatin700Eot from "../fonts/montserrat-v15-latin-700.eot";
// import montserratLatin700Woff2 from "../fonts/montserrat-v15-latin-700.woff2";
// import montserratLatin700Woff from "../fonts/montserrat-v15-latin-700.woff";
// import montserratLatin700Tff from "../fonts/montserrat-v15-latin-700.ttf";
// import montserratLatin700Svg from "../fonts/montserrat-v15-latin-700.svg";

// export const FontsCSS = () => {
//     return (
//         <Global
//             styles={css`
//                 /* montserrat-300 - latin */
//                 @font-face {
//                     font-family: "Montserrat";
//                     font-style: normal;
//                     font-weight: 300;
//                     src: url(${montserratLatin300Eot}); /* IE9 Compat Modes */
//                     src: local(""),
//                         url(${montserratLatin300Eot}+"?#iefix")
//                             format("embedded-opentype"),
//                         /* IE6-IE8 */ url(${montserratLatin300Woff2})
//                             format("woff2"),
//                         /* Super Modern Browsers */
//                             url(${montserratLatin300Woff}) format("woff"),
//                         /* Modern Browsers */ url(${montserratLatin300Tff})
//                             format("truetype"),
//                         /* Safari, Android, iOS */
//                             url(${montserratLatin300Svg}+"#Montserrat")
//                             format("svg"); /* Legacy iOS */
//                 }
//                 /* montserrat-regular - latin */
//                 @font-face {
//                     font-family: "Montserrat";
//                     font-style: normal;
//                     font-weight: 400;
//                     src: url(${montserratLatinRegularEot}); /* IE9 Compat Modes */
//                     src: local(""),
//                         url(${montserratLatinRegularEot} + "?#iefix")
//                             format("embedded-opentype"),
//                         /* IE6-IE8 */ url(${montserratLatinRegularWoff2})
//                             format("woff2"),
//                         /* Super Modern Browsers */
//                             url(${montserratLatinRegularWoff}) format("woff"),
//                         /* Modern Browsers */ url(${montserratLatinRegularTff})
//                             format("truetype"),
//                         /* Safari, Android, iOS */
//                             url(${montserratLatinRegularSvg} + "#Montserrat")
//                             format("svg"); /* Legacy iOS */
//                 }
//                 /* montserrat-500 - latin */
//                 @font-face {
//                     font-family: "Montserrat";
//                     font-style: normal;
//                     font-weight: 500;
//                     src: url(${montserratLatin500Eot}); /* IE9 Compat Modes */
//                     src: local(""),
//                         url(${montserratLatin500Eot}+"?#iefix")
//                             format("embedded-opentype"),
//                         /* IE6-IE8 */ url(${montserratLatin500Woff2})
//                             format("woff2"),
//                         /* Super Modern Browsers */
//                             url(${montserratLatin500Woff}) format("woff"),
//                         /* Modern Browsers */ url(${montserratLatin500Tff})
//                             format("truetype"),
//                         /* Safari, Android, iOS */
//                             url(${montserratLatin500Svg}+"#Montserrat")
//                             format("svg"); /* Legacy iOS */
//                 }
//                 /* montserrat-600 - latin */
//                 @font-face {
//                     font-family: "Montserrat";
//                     font-style: normal;
//                     font-weight: 600;
//                     src: url(${montserratLatin600Eot}); /* IE9 Compat Modes */
//                     src: local(""),
//                         url(${montserratLatin600Eot}+"?#iefix")
//                             format("embedded-opentype"),
//                         /* IE6-IE8 */ url(${montserratLatin600Woff2})
//                             format("woff2"),
//                         /* Super Modern Browsers */
//                             url(${montserratLatin600Woff}) format("woff"),
//                         /* Modern Browsers */ url(${montserratLatin600Tff})
//                             format("truetype"),
//                         /* Safari, Android, iOS */
//                             url(${montserratLatin600Svg}+"#Montserrat")
//                             format("svg"); /* Legacy iOS */
//                 }
//                 /* montserrat-700 - latin */
//                 @font-face {
//                     font-family: "Montserrat";
//                     font-style: normal;
//                     font-weight: 700;
//                     src: url(${montserratLatin700Eot}); /* IE9 Compat Modes */
//                     src: local(""),
//                         url(${montserratLatin700Eot}+"?#iefix")
//                             format("embedded-opentype"),
//                         /* IE6-IE8 */ url(${montserratLatin700Woff2})
//                             format("woff2"),
//                         /* Super Modern Browsers */
//                             url(${montserratLatin700Woff}) format("woff"),
//                         /* Modern Browsers */ url(${montserratLatin700Tff})
//                             format("truetype"),
//                         /* Safari, Android, iOS */
//                             url(${montserratLatin700Svg}+"../fonts/montserrat-v15-latin-700.svg#Montserrat")
//                             format("svg"); /* Legacy iOS */
//                 }
//             `}
//         />
//     );
// };
