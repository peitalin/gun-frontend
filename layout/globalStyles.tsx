import React from "react"

/// Get a warning: "did not match server"?
/// check for apostrophes and any character that might be html encoded
const GlobalStyles = () => <style>{`
body {
  background-color: #fefefe;
}

a {
  text-decoration: none;
}

// Hide ugly ass Safari input text-shadow
input[type=text] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type=text],
input[type=email],
input[type=password],
textarea {
  -webkit-appearance: none;
}

// Hide all scrollbars
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
    display: none;
}

//// MUI //////
// Override Dropdown menus placeholder text color
// Make it lighter grey
.css-1hwfws3 .css-151xaom-placeholder {
  color: hsl(0, 0, 75%);
  font-weight: 300;
}
// React-rte: rich text editor button borders
.EditorToolbar__root___3_Aqz {
  opacity: 0.66;
}
.IconButton__root___3tqZW .Button__root___1gz0c {
  border: 1px solid #cccccc;
}
// React-rte Text Editor Input Area
.public-DraftEditor-content {
  min-height: 6rem;
  font-family: Roboto, Helvetica;
}
// React Dropzone Uploader style overrides
.dzu-dropzone .dottedContainer {
  border: 3px dashed #ddd;
}
.dzu-dropzone {
  overflow: hidden !important;
}
.dzu-upload-input {
  opacity: 0.8;
  transition: opacity 200ms;
}
.dzu-upload-input:hover {
  opacity: 1;
  transition: opacity 200ms;
}
// Paypal button
#goofBox:hover + #goofProofButton {
  background-color: rgba(226, 16, 63, 0.08),
}
//////// Animations
.hidden {
  opacity: 0;
}
.displayNone {
  display: none;
}
.fadeInFast {
  -webkit-animation: fadeIn 0.2s cubic-bezier(0.7, 0, 0.3, 1) both;
  animation: fadeIn 0.2s cubic-bezier(0.7, 0, 0.3, 1) both;
  -webkit-animation-delay: 0.02s;
  animation-delay: 0.02s;
}
.fadeIn {
  -webkit-animation: fadeIn 0.5s cubic-bezier(0.7, 0, 0.3, 1) both;
  animation: fadeIn 0.5s cubic-bezier(0.7, 0, 0.3, 1) both;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.fadeOutFast {
  -webkit-animation: fadeOut 0.2s cubic-bezier(0.7, 0, 0.3, 1) both;
  animation: fadeOut 0.2s cubic-bezier(0.7, 0, 0.3, 1) both;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.fadeOut {
  -webkit-animation: fadeOut 0.5s cubic-bezier(0.7, 0, 0.3, 1) both;
  animation: fadeOut 0.5s cubic-bezier(0.7, 0, 0.3, 1) both;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.pulse {
  -webkit-animation: pulse 2s infinite;
  animation: pulse 2s infinite;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.slideFromLeft {
  -webkit-animation: slideFromLeft 0.6s cubic-bezier(0.7, 0, 0.3, 1) both;
  animation: slideFromLeft 0.6s cubic-bezier(0.7, 0, 0.3, 1) both;
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.barloaderLong {
  -webkit-animation: barloaderLong 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  animation: barloaderLong 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.barloaderShort {
  -webkit-animation: barloaderShort 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  animation: barloaderShort 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  -webkit-animation-delay: 1.15s;
  animation-delay: 1.15s;
}

.staggerFadeIn *:nth-child(1) {
  animation: fadeInFast 1s cubic-bezier(0.6, 0.2, 0.4, 1.1) both;
  animation-delay: .0s;
}
.staggerFadeIn *:nth-child(2) {
  animation: fadeInFast 1s cubic-bezier(0.6, 0.2, 0.4, 1.1) both;
  animation-delay: .1s;
}
.staggerFadeIn *:nth-child(3) {
  animation: fadeInFast 1s cubic-bezier(0.6, 0.2, 0.4, 1.1) both;
  animation-delay: .2s;
}
.staggerFadeIn *:nth-child(4) {
  animation: fadeInFast 1s cubic-bezier(0.6, 0.2, 0.4, 1.1) both;
  animation-delay: .3s;
}
.staggerFadeIn *:nth-child(5) {
  animation: fadeInFast 1s cubic-bezier(0.6, 0.2, 0.4, 1.1) both;
  animation-delay: .4s;
}
.staggerFadeIn *:nth-child(6) {
  animation: fadeInFast 1s cubic-bezier(0.6, 0.2, 0.4, 1.1) both;
  animation-delay: .45s;
}
.staggerFadeIn *:nth-child(7) {
  animation: fadeInFast 1s cubic-bezier(0.6, 0.2, 0.4, 1.1) both;
  animation-delay: .5s;
}
.staggerFadeIn *:nth-child(8) {
  animation: fadeInFast 1s cubic-bezier(0.6, 0.2, 0.4, 1.1) both;
  animation-delay: .55s;
}
.staggerFadeIn *:nth-child(9) {
  animation: fadeInFast 1s cubic-bezier(0.6, 0.2, 0.4, 1.1) both;
  animation-delay: .6s;
}

@keyframes fadeIn {
  from {
    opacity: 0
  };
  to {
    opacity: 1
  }
}

@keyframes fadeOut {
  from {
    opacity: 1
  };
  to {
    opacity: 0
  }
}

@keyframes slideFromLeft {
  from {
    opacity: 1;
    -webkit-transform: translate3d(-100%, 0%, 0);
    transform: translate3d(-100%, 0%, 0);
  }
}

@keyframes pulse {
  0% {
    opacity: 1
  };
  20% {
    opacity: 0.33
  }
  50% {
    opacity: 0.80
  }
  80% {
    opacity: 0.33
  }
  100% {
    opacity: 1
  }
}

@keyframes barloaderLong {
  0% {
    left: -35%;
    right: 100%
  }
  60% {
    left: 100%;
    right: -90%
  }
  100% {
    left: 100%;
    right: -90%
  }
}

@keyframes barloaderShort {
  0% {
    left: -200%;
    right: 100%
  }
  60% {
    left: 107%;
    right: -8%
  }
  100% {
    left: 107%;
    right: -8%
  }
}

progress[value]::-webkit-progress-bar {
  background-color: #aaaaee;
  color: #eaeaea;
}
progress[value] {
  background-color: #aaaaee;
  color: #eaeaea;
  border: none;
}

`}</style>;

export default GlobalStyles;