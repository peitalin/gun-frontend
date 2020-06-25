import React from 'react';
import { useCallback, useMemo, useState } from 'react'
import { oc as option } from "ts-optchain";
// styles
import { WithStyles, withStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { fontFam, Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Validation
import { FormikProps, FormikErrors, FormikTouched, FormikState } from 'formik';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
/// Debounce
const throttle = require('lodash.throttle');
const debounce = require('lodash.debounce');
import { useDebouncedCallback } from 'use-debounce';

// Slate
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Editor, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'

// Icons
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { underline } from 'react-icons-kit/feather/underline';
import { code } from 'react-icons-kit/feather/code';
import { ic_title } from 'react-icons-kit/md/ic_title';
import { ic_format_quote } from 'react-icons-kit/md/ic_format_quote';
import { ic_format_list_bulleted } from 'react-icons-kit/md/ic_format_list_bulleted';
import { ic_format_list_numbered } from 'react-icons-kit/md/ic_format_list_numbered';

// editor components
import {
  Button,
  Toolbar,
  BlockButton,
  MarkButton,
} from './components'
import {
  toggleBlock,
  toggleMark,
  Element,
  Leaf,
  serializeText,
  serializeHtml,
  serializeHtmlNode,
  HOTKEYS,
  ELEMENT_TAGS,
  TEXT_TAGS,
  deserialize,
  withHtml,
  initialValue,
} from "./helpers";



const TextEditor = (props: ReactProps) => {

  // optional Formik props: fprops.
  const { classes, errorMessage, ...fprops } = props;

  // State /////////////////

  const [value, setValue] = useState(
    // description should be in slate.js object model format
    // 1. parse string to HTML DOM with DOMParser()
    // 2. deserialize HtmlDOM with Slate.js deserializer function.
    // See conversions.ts -> productToProductEditInput() for more details
    option(fprops).values.description() ||
    initialValue as any
  )
  const [focused, setFocused] = React.useState(false)
  const [charCount, setCharCount] = React.useState(0)

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withHtml(withReact(withHistory(createEditor()))),
    []
  )

  const localOnChange = throttle((value) => {
    // console.log("value", value)
    setValue(value)
    props.onChange(value)
    // console.log('editor.selection', option(editor).selection())
    // console.log('editor.selection.focus', option(editor).selection.focus())
    debounceFocus(undefined)
    debounceFormikOnChange(value)
  }, 16)


  const [debounceFocus] = useDebouncedCallback((value) => {
    if (option(editor).selection.focus()) {
      setFocused(true)
      if (fprops.setFieldTouched) {
        fprops.setFieldTouched('description', true)
      }
    } else {
      setFocused(false)
    }
  }, 16);

  const [debounceFormikOnChange] = useDebouncedCallback(value => {
    try {
      let text = serializeText(value)
      setCharCount(text.length)

      ///// FORMIK BUG: DO NOT USE setFieldValue here
      //// it swallows events so you have to double click the file uploader.
      //// or the first time you attempt to pick/upload a file it will silently
      //// fail and close the menu

      // let htmlText = serializeHtml(value)
      // fprops.setFieldValue('description', htmlText)
    } catch (e) {
      console.log('slate.js serialization err:', e)
    }
    // send to Formik. This is callback passed down from Formik
  }, 16);


  React.useEffect(() => {
    // hooks for parent component to reset
    if (props.resetSlate) {
      setValue(initialValue)
    }
  }, [props.resetSlate])

  // console.log("errors", errors)
  // console.log("values.description", values.description)
  // console.log('value', value)

  return (
    <div className={classes.root}>
      <div className={clsx(
          classes.editorContainer,
          focused ? classes.focusedBorder : null,
          (option(fprops).touched.description() && !focused && errorMessage)
            ? classes.errorBorder
            : null,
        )}
        style={{
          ...props.editorStyle
        }}
      >
        <Slate
          editor={editor}
          value={value}
          onChange={localOnChange}
        >
          <Toolbar>
            <MarkButton format="bold" icon={bold} />
            {/* <MarkButton format="italic" icon={italic} /> */}
            {/* <MarkButton format="underline" icon={underline} /> */}
            {/* <MarkButton format="code" icon={code} /> */}
            {/* <BlockButton format="heading-one" icon={ic_title} /> */}
            {/* <BlockButton format="heading-two" icon="looks_two" /> */}
            {/* <BlockButton format="block-quote" icon={ic_format_quote} /> */}
            <BlockButton format="numbered-list" icon={ic_format_list_numbered} />
            <BlockButton format="bulleted-list" icon={ic_format_list_bulleted} />
          </Toolbar>
          <Editable
            className={classes.editor}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={props.placeholder || "Type a message"}
            spellCheck
            // autoFocus
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                // @ts-ignore
                if (isHotkey(hotkey, event)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  toggleMark(editor, mark)
                }
              }
            }}
          />
        </Slate>

        <ValidationErrorMsg
          touched={option(fprops).touched.description()}
          focused={focused}
          errorMessage={option(fprops).errors.description()}
          style={{
            bottom: '0.25rem',
            right: '0.3rem',
          }}
        />

        {
          props.limit &&
          <div className={classes.count}>
            <span className={classes.countText}>
                {`${charCount}/${props.limit.max} chars`}
            </span>
          </div>
        }

      </div>
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  errorMessage?: string;
  onChange(args: any): void;
  limit?: { max: number };
  // formik
  touched?: FormikTouched<FormikFields>
  errors?: FormikErrors<FormikFields>
  values?: FormikFields
  setFieldTouched?(...a: any): any
  resetSlate?: boolean;
  editorStyle?: {
    [key:string]: any
  };
  placeholder?: string;
}
interface FormikFields {
  description: string;
}

export const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
  },
  editorContainer: {
    height: '100%',
    width: '100%',
    position: 'relative',
    border: '1px solid rgba(170, 170, 170, 0.4)',
    borderRadius: BorderRadius,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  focusedBorder: {
    // boxShadow: `${fade('#50B5F5', 0.2)} 0 0 0 2px`,
    border: `2px solid ${fade(Colors.blue, 0.2)}`,
    color: Colors.charcoal,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  errorBorder: {
    border: `1px solid ${fade(theme.palette.error.light, 0.4)}`,
  },
  editor: {
    margin: '1rem',
    minHeight: '5rem',
    "> * + *": {
      marginTop: '1rem',
    },
    fontFamily: fontFam,
    fontSize: '1rem',
  },
  blockQuote: {
    borderLeft: '2px solid #ddd',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: '10px',
    color: '#aaa',
    fontStyle: 'italic',
  },
  errorMessage: {
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    right: 0,
    fontSize: '0.8rem',
    fontFamily: fontFam,
    color: `${fade(theme.palette.error.light, 0.6)}`,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  errorMessageUntouched: {
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    right: 0,
    padding: '0rem 0.5rem',
    fontSize: '0.8rem',
    fontFamily: fontFam,
    color: `${fade(Colors.grey, 0.7)}`,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  errorMessageFocused: {
    color: `${fade(Colors.purple, 0.9)}`,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  count: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  countText: {
    fontSize: "0.8rem",
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    opacity: 0.25,
    position: 'absolute',
    right: '0.25rem',
    bottom: '-1.125rem',
  },
})

export default withStyles(styles)( TextEditor );