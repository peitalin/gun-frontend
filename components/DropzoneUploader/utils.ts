import React from 'react'
import { IFileWithMeta, IMeta, IStyleCustomization } from './Dropzone'

export const formatBytes = (b: number) => {
  const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let l = 0
  let n = b

  while (n >= 1024) {
    n /= 1024
    l += 1
  }

  return `${n.toFixed(n >= 10 || l < 1 ? 0 : 1)}${units[l]}`
}

export const formatDuration = (seconds: number) => {
  const date = new Date(0)
  date.setSeconds(seconds)
  const dateString = date.toISOString().slice(11, 19)
  if (seconds < 3600) return dateString.slice(3)
  return dateString
}

// adapted from: https://github.com/okonet/attr-accept/blob/master/src/index.js
// returns true if file.name is empty and accept string is something like ".csv",
// because file comes from dataTransferItem for drag events, and
// dataTransferItem.name is always empty
export const accepts = (file: File, accept: string) => {
  if (!accept || accept === '*') return true

  const mimeType = file.type || ''
  const baseMimeType = mimeType.replace(/\/.*$/, '')

  return accept
    .split(',')
    .map(t => t.trim())
    .some(type => {
      if (type.charAt(0) === '.') {
        return file.name === undefined || file.name.toLowerCase().endsWith(type.toLowerCase())
      } else if (type.endsWith('/*')) {
        // this is something like an image/* mime type
        return baseMimeType === type.replace(/\/.*$/, '');
      }
      return mimeType === type
    });
}

type ResolveFn<T> = (...args: any[]) => T

export const resolveValue = <T = any>(value: ResolveFn<T> | T, ...args: any[]) => {
  if (typeof value === 'function') return (value as ResolveFn<T>)(...args)
  return value
}

export const defaultClassNames = {
  dropzone: 'dzu-dropzone',
  dropzoneActive: 'dzu-dropzoneActive',
  dropzoneReject: 'dzu-dropzoneActive',
  dropzoneDisabled: 'dzu-dropzoneDisabled',
  input: 'dzu-input',
  inputLabel: 'dzu-inputLabel',
  inputLabelWithFiles: 'dzu-inputLabelWithFiles',
  preview: 'dzu-previewContainer',
  previewImage: 'dzu-previewImage',
  submitButtonContainer: 'dzu-submitButtonContainer',
  submitButton: 'dzu-submitButton',
}

export const mergeStyles = (
  classNames: IStyleCustomization<string>,
  styles: IStyleCustomization<React.CSSProperties>,
  addClassNames: IStyleCustomization<string>,
  ...args: any[]
) => {
  const resolvedClassNames: { [property: string]: string } = { ...defaultClassNames }
  const resolvedStyles = { ...styles } as { [property: string]: string }

  for (const [key, value] of Object.entries(classNames)) {
    resolvedClassNames[key] = resolveValue(value, ...args)
  }

  for (const [key, value] of Object.entries(addClassNames)) {
    resolvedClassNames[key] = `${resolvedClassNames[key]} ${resolveValue(value, ...args)}`
  }

  for (const [key, value] of Object.entries(styles)) {
    resolvedStyles[key] = resolveValue(value, ...args)
  }

  return { classNames: resolvedClassNames, styles: resolvedStyles as IStyleCustomization<React.CSSProperties> }
}

export const getFilesFromEvent = (
  event: React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>,
): Array<File | DataTransferItem> => {
  let items = null

  if ('dataTransfer' in event) {
    const dt = event.dataTransfer

    // NOTE: Only the 'drop' event has access to DataTransfer.files, otherwise it will always be empty
    if ('files' in dt && dt.files.length) {
      items = dt.files
    } else if (dt.items && dt.items.length) {
      items = dt.items
    }
  } else if (event.target && event.target.files) {
    items = event.target.files
  }

  return Array.prototype.slice.call(items)
}


export enum DZU_UPLOAD_STATUS {
  GETTING_UPLOAD_PARAMS = "getting_upload_params",
  UPLOADING = "uploading",
  ERROR_UPLOAD_PARAMS = "error_upload_params",
  EXCEPTION_UPLOAD = "exception_upload",
  ERROR_UPLOAD = "error_upload",
  REJECTED_MAX_FILES = "rejected_max_files",
  ABORTED = "aborted",
  REMOVED = "removed",
  DONE = "done",
}
import { DzuPreviewItem } from "typings/dropzone";


export const handleUploadingStates = ({
  status,
  fileWithMeta,
  setLoading,
  uploadingCallback,
}: {
  status: string,
  fileWithMeta: IFileWithMeta,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  uploadingCallback: () => void,
}) => {

  const D = DZU_UPLOAD_STATUS;
  let { meta, file, xhr } = fileWithMeta;

  if (status === D.GETTING_UPLOAD_PARAMS) {
    setLoading(true)
  }

  if (status === D.UPLOADING && !!meta.previewUrl) {
    uploadingCallback()
  }

  if (status === D.ERROR_UPLOAD_PARAMS) {
    setLoading(false)
    console.info("error_upload_params:", status, meta, file)
  }
  if (status === D.EXCEPTION_UPLOAD) {
    setLoading(false)
    console.info("exception_upload:", status, meta, file)
  }
  if (status === D.ERROR_UPLOAD) {
    setLoading(false)
    console.info("error_upload:", status, meta, file)
  }
  if (status === D.REJECTED_MAX_FILES) {
    setLoading(false)
    console.info("rejected_max_files:", status, meta, file)
  }
  if (status === D.ABORTED) {
    setLoading(false)
    console.info("aborted:", status, meta, file)
  }
  if (status === D.REMOVED) {
    setLoading(false)
    console.info("removed:", status, meta, file)
  }

}
