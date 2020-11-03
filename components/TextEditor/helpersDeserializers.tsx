import React from 'react';
import { Editor, Transforms } from 'slate'
import { jsx } from 'slate-hyperscript'


///////////////////////////////////////
///////////////////////////////////////
// CONVERTS FROM HTML DOM-ELEMENTS in CLIPBOARD to Slate objects
//
// For when you want go from HTML-DOM elements you copy and pasted to editor.
// INPUT: HTML-DOM elements copy and pasted from websites
// OUTPUT: Slate Objects which the editor manipulates
///////////////////////////////////////
///////////////////////////////////////


export const ELEMENT_TAGS = {
  A: el => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'p' }),
  H4: () => ({ type: 'p' }),
  H5: () => ({ type: 'p' }),
  H6: () => ({ type: 'p' }),
  /// Don't deserialize H3 onwards
  // H1: () => ({ type: 'heading-one' }),
  // H2: () => ({ type: 'heading-two' }),
  // H3: () => ({ type: 'heading-three' }),
  // H4: () => ({ type: 'heading-four' }),
  // H5: () => ({ type: 'heading-five' }),
  // H6: () => ({ type: 'heading-six' }),
  IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  OP: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
  B: () => ({ type: 'break' }),
  BR: () => ({ type: 'break' }),
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
export const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
}



export const deserialize = (el) => {

  const nodeName = el.nodeName;
  const nodeType = el.nodeType;
  let parent = el

  // console.log("ELLLLLLLL:", el)

  if (nodeType === 3) {
    return el?.textContent;
  } else if (nodeType !== 1) {
    return null;
  } else if (nodeName === "BR") {
    // return "\n";
    // remove \n, replace with <p> tags for newlines
    return "";
  }

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0]
  }

  const children = Array.from(parent.childNodes)
    .map(deserialize)
    .flat()

  // console.log('children', children)

  if (nodeName === 'BODY') {
    return jsx('fragment', {}, children)
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el)
    // const attrs = {} // no attrs
    if (children.length < 1) {
      // slate.js always requires a element to have a non-empty text node
      // otherise a <li></li> element (empty bullet point) will error and crash
      // slate.js because its a sack of shit
      return ['']
    }
    return children.map(child => jsx('text', attrs, child))
  }


  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el)
    if (children.length === 0) {
      if (nodeName === "LI") {
        return [{ type: "list-item", children: [{ text: "" }] }]
      } else {
        // return [{ type: "paragraph", children: [{ text: "&nbsp;" }] }]
        return [{ type: "paragraph", children: [{ text: "" }] }]
      }
    }
    return jsx('element', attrs, children)
  }

  return children
}










/// Actual HTML Deserializer used in the Slate Editor for copy and paste
/// deserializing

export const withHtmlDeserializer = editor => {
  const { insertData, isInline, isVoid } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const html = data.getData('text/html')

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html')
      const fragment = deserialize(parsed.body)
      Transforms.insertFragment(editor, fragment)
      return
    }

    insertData(data)
  }

  return editor
}

