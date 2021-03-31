import React from "react";
import { useState, useEffect, useRef } from 'react'
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";

import { FormikProps, FormikErrors, FormikTouched, FormikState } from 'formik';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { maxLengthProductDescription } from "utils/limitsAndRules";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';

// styles for CK editor, must load after CKeditor,
// but loading CK editor via import first, results in "window no defined" errors
// even checking for process.browser
// So use !important on this stylesheet and then it overrides defaault styles
// MUST BE IMPORTED IN _app.tsx
// import './ckStyles.css';
import { editorConfiguration } from "./editorConfiguration";





const TextEditorCK = (props: ReactProps & FormikProps<FormikFields>) => {

  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {} as any;

  const {
    showHtml = false,
    ...fprops
  } = props;

  const [focused, setFocused] = React.useState(false)
  const [charCount, setCharCount] = React.useState(0)
  // const [description, setDescription] = React.useState(
  //   fprops.values.description || undefined
  // )
  // // Debounce Formik State changes to limit lag
  // const [updateDescription] = useDebouncedCallback((description: string) => {
  //   setDescription(description)
  //   fprops?.setFieldValue('description', description)
  //   // if (!fprops.touched.description) {
  //   //   fprops.setFieldTouched('description', true)
  //   // }
  // }, 64);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react')?.CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    } as any;
    setEditorLoaded(true)
  }, [])

  // console.log("fprops.values.description:", fprops.values.description)
  // console.log("fprops.setFieldValue.description", fprops.setFieldValue)
  // console.log("fprops.errors.description:", fprops.errors.description)

  if (editorLoaded) {
    return (
      <div
        className={clsx("ck-content", props.className)}
        style={{ position: "relative" }}
      >
        <CKEditor
          editor={ClassicEditor}

          config={ editorConfiguration }
          // data={'<p>Hello from CKEditor 5!</p>'}
          data={fprops?.values?.description || "<p></p>"}
          onChange={(event, editor) => {
            const description = editor.getData()
            // in HTML-string format
            fprops?.setFieldValue('description', description)
            // updateDescription(description)
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

