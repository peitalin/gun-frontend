import React from 'react'
import PropTypes from 'prop-types'

import { ILayoutProps } from './Dropzone'

const Layout = (props: ILayoutProps) => {
  const {
    UploadInput,
    previews,
    submitButton,
    dropzoneProps,
    files,
    extra: { maxFiles },
  } = props

  return (
    <div {...dropzoneProps}>
      {previews}

      {files.length < maxFiles && <UploadInput/>}

      {files.length > 0 && submitButton}
    </div>
  )
}

export default Layout
