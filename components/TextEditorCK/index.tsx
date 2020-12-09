import React from "react";
import { useState, useEffect, useRef } from 'react'
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "layout/AppTheme";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import TextInput from "components/Fields/TextInput";

import { FormikProps, FormikErrors, FormikTouched, FormikState } from 'formik';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
// SSR dynamic import
import dynamic from 'next/dynamic'
import TextEditorPlaceholder from 'components/TextEditor/TextEditorPlaceholder';
const TextEditorSSR = dynamic(() => import('../TextEditor'), {
  loading: () => <TextEditorPlaceholder/>,
  ssr: false
})
import { maxLengthProductDescription } from "utils/limitsAndRules";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';

// styles for CK editor, must load after CKeditor,
// but loading CK editor via import first, results in "window no defined" errors
// even checking for process.browser
// So use !important on this stylesheet and then it overrides defaault styles
import './ckStyles.css';
import { editorConfiguration } from "./editorConfiguration";





const TextEditorCK = (props: ReactProps & FormikProps<FormikFields>) => {

  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {} as any;

  const {
    showHtml = false,
    ...fprops
  } = props;

  const [description, setDescription] = React.useState(
    fprops.values.description || undefined
  )

  const [focused, setFocused] = React.useState(false)
  const [charCount, setCharCount] = React.useState(0)

  // Debounce Formik State changes to limit lag
  const [updateDescription] = useDebouncedCallback((description: string) => {
    setDescription(description)
    fprops?.setFieldValue('description', description)
    // if (!fprops.touched.description) {
    //   fprops.setFieldTouched('description', true)
    // }
  }, 64);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react')?.CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    } as any;
    setEditorLoaded(true)
  }, [])

  console.log("fprops.values.description:", fprops.values.description)
  // console.log("fprops.setFieldValue.description", fprops.setFieldValue)
  // console.log("fprops.errors.description:", fprops.errors.description)

  if (editorLoaded) {
    return (
      <div className="ck-content" style={{ position: "relative" }}>
        <CKEditor
          editor={ClassicEditor}

          config={ editorConfiguration }
          // data={'<p>Hello from CKEditor 5!</p>'}
          data={description || "<p></p>"}
          onInit={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor)
          }}
          onChange={(event, editor) => {
            const description = editor.getData()
            // in HTML-string format
            // console.log({ event, editor, data: description })
            updateDescription(description)
          }}
          onBlur={ ( event, editor ) => {
            // console.log( 'Blur.', editor );
            setFocused(false)
          }}
          onFocus={ ( event, editor ) => {
            setFocused(true)
            // console.log( 'Focus.', editor );
          }}
        />
        <ValidationErrorMsg
          touched={fprops.touched?.description}
          focused={focused}
          errorMessage={fprops?.errors?.description}
          style={{
            bottom: '0.1rem',
            right: '0.5rem',
          }}
        />
      </div>
    )
  } else {
    return (
      <div>Editor loading</div>
    )
  }

}

interface ReactProps {
  showHtml?: boolean;
  errorMessage?: string;
  onChange?(args: any): void;
  limit?: { max: number };
  // formik
  touched?: FormikTouched<FormikFields>
  errors?: FormikErrors<FormikFields>
  values?: FormikFields
  setFieldTouched?(...a: any): any
  resetSlate?: boolean;
  disableFocusOutline?: boolean;
  className?: any;
  placeholder?: string;
  containerStyle?: {
    [key:string]: any
  };
  editorStyle?: {
    [key:string]: any
  };
}
interface FormikFields {
  description: string;
}

export default TextEditorCK;

