import React from "react";
import { ApolloError } from "@apollo/client";
import { MutationData } from ".";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";



const DisplaySnackBars = ({
  data,
  error,
}: DisplaySnackBarsProps) => {

  const snackbar = useSnackbar();

  React.useEffect(() => {

    let createProductTitle = data?.createProduct?.product?.currentSnapshot?.title;
    let editProductTitle = data?.editProduct?.product?.currentSnapshot?.title;

    if (!!createProductTitle) {
      snackbar.enqueueSnackbar(
        `Successfully created listing: ${createProductTitle}`,
        { variant: "success", autoHideDuration: 3000 }
      )
    }
    if (!!editProductTitle) {
      snackbar.enqueueSnackbar(
        `Successfully edited listing: ${editProductTitle}`,
        { variant: "success", autoHideDuration: 3000 }
      )
    }
  }, [data])

  React.useEffect(() => {
    if (error) {
      snackbar.enqueueSnackbar(
        `Oh oh: ${JSON.stringify(error)}`,
        { variant: "error", autoHideDuration: 6000 }
      )
    }
  }, [error])

  return (
    <div className="display-snackbars"/>
  )
}

export interface DisplaySnackBarsProps  {
  data: MutationData,
  error: ApolloError,
}

export default DisplaySnackBars;
