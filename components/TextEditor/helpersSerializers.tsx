import React from 'react';
import { Editor, Transforms } from 'slate'
import { Node, Text } from 'slate'
import escapeHtml from 'escape-html'
const LIST_TYPES = ['numbered-list', 'bulleted-list']
import { jsx } from 'slate-hyperscript'


///////////////////////////////////////
///////////////////////////////////////
// CONVERTS FROM HTML DOM-ELEMENTS TO HTML-TEXT
//
// For when you want to DISPLAY your rich text representation in HTML
// INPUT: HTML-DOM elements from databse or from Copy-paste clipboard
//
// OUTPUT: HTML raw-text which browser can display.
// remember to tweak CSS rules + html formatting to get desired display
// e.g. whiteSpace: pre-wrap to display newlines
///////////////////////////////////////
///////////////////////////////////////

export const EMPTY_ELEM = "<p></p>"

export const serializeText = nodes => {
  return nodes.map(n => Node.string(n)).join('\n')
}

export const serializeHtml = nodes => {
  return nodes.map(n => serializeHtmlNode(n)).join('\n')
}

export const serializeHtmlNode = element => {

  // console.log("serialize elem: ", element)

  if (Text.isText(element)) {

    // let text = element.text.replace(/\n/g, w => '<br>')
    let text = element.text

    if (element.bold && element.italics) {
      return `<i><strong>${text}</strong></i>`
    } else if (element.bold) {
      return `<strong>${text}</strong>`
    } else if (element.italics) {
      return `<i>${text}</i>`
    } else {
      return escapeHtml(text)
    }
  }

  const children = element.children.map(n => serializeHtmlNode(n)).join('')

  if (element && !element.type) {
    return "<p></p>"
  } else {
    switch (element.type) {
      case 'block-quote':
        return `<blockquote>${children}</blockquote>`
      case 'heading-one':
        return `<h1>${children}</h1>`
      case 'heading-two':
        return `<h2>${children}</h2>`
      case 'heading-three':
        return `<h3>${children}</h3>`
      case 'heading-four':
        return `<h4>${children}</h4>`
      case 'heading-five':
        return `<h5>${children}</h5>`
      case 'span':
        return `<span>${children}</span>`

      case 'bulleted-list':
        return `<ul>${children}</ul>`
      case 'list-item':
        return `<li>${children}</li>`
      case 'numbered-list':
        return `<ol>${children}</ol>`
      case 'bold':
        return `<strong>${children}</strong>`
      case 'italics':
        return `<em>${children}</em>`
      case 'link':
        return `<a href="${escapeHtml(element.url)}">${children}</a>`
      case 'br':
        return "<br/>"
      case 'break':
        return "<br/>"
      case 'p':
        return `<p>${children}</p>`
      case 'paragraph':
        return `<p>${children}</p>`
      default:
        return `<p>${children}</p>`
    }
  }
}





