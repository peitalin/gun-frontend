import React from 'react';
import { Editor, Transforms } from 'slate'
import { Node, Text } from 'slate'
import escapeHtml from 'escape-html'
const LIST_TYPES = ['numbered-list', 'bulleted-list']
import { jsx } from 'slate-hyperscript'

import { ImageElement } from "./components";


// for when slate.js is empty initially.
// represents empty text field
export const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: '' },
    ],
  },
]

export const EMPTY_STATE = "<p></p>"


export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return !!match
}

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const Element = props => {

  const {
    // attributes,
    children,
    element
  } = props

  // disable attributes
  // e.g. no color text, etc
  let attributes = {}

  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'code':
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      )
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'link':
      return (
        <a href={element.url} {...attributes}>
          {children}
        </a>
      )
    case 'br':
      return <br/>
    case 'image':
      return <ImageElement {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}


export const Leaf = ({ attributes, children, leaf }) => {

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>
  }

  return <span {...attributes}>{children}</span>
}


export const serializeText = nodes => {
  return nodes.map(n => Node.string(n)).join('\n')
}

export const serializeHtml = nodes => {
  return nodes.map(n => serializeHtmlNode(n)).join('\n')
}

export const serializeHtmlNode = element => {

  if (Text.isText(element)) {
    if (element.bold && element.italics) {
      return `<i><strong>${element.text}</strong></i>`
    } else if (element.bold) {
      return `<strong>${element.text}</strong>`
    } else if (element.italics) {
      return `<i>${element.text}</i>`
    } else {
      return escapeHtml(element.text)
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
      default:
        return `<p>${children}</p>`
    }
  }
}

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}


export const ELEMENT_TAGS = {
  A: el => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  OP: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
  B: () => ({ type: 'paragraph' }),
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

export const deserialize = el => {

  if (el.nodeType === 3) {
    if (el.textContent.trim()) {
      // trim for MS-word pastes
      // replace carriage returns for google docs copy-paste
      return el.textContent
    }
    // return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  } else if (el.nodeName === 'BR') {
    return '\n'
  }

  const { nodeName } = el
  let parent = el

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

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children)
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el)
    // const attrs = {}
    // no attrs
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

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el)
    // const attrs = {}
    // no attrs
    if (children.length < 1) {
      // slate.js always requires a element to havea non-empty text node
      // otherise a <li></li> element (empty bullet point) will error and crash
      // slate.js because its a sack of shit
      return ['']
    }
    return children.map(child => jsx('text', attrs, child))
  }


  return children
}


export const withHtml = editor => {
  const { insertData, isInline, isVoid } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const html = data.getData('text/html')
    const text = data.getData('text/plain')

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html')
      const fragment = deserialize(parsed.body)
      Transforms.insertFragment(editor, fragment)
      return
    } else if (text) {

      let textNodes = text.split('\n').map(t => {
        if (!!t.trim()) {
          return {
            type: 'paragraph',
            children: [{
              text: t.trim()
            }]
          }
        } else {
          return {
            type: 'br',
            children: [{ text: t }]
          }
        }
      })

      Transforms.insertFragment(editor, textNodes)

      return
    }

    insertData(data)
  }

  return editor
}

