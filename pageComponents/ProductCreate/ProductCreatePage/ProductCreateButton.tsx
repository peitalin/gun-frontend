import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Typings
import { ProductCreateInput } from "typings/gqlTypes";
// Material UI
import ButtonLoading from "components/ButtonLoading";
// Utility Components
import ErrorBounds from "components/ErrorBounds";
// Validation
import { FormikErrors } from 'formik';
import { buttonWidthClassified } from "./constants";



const ProductCreateButton = (props: ReactProps) => {

  const {
    postInstantly = true,
    disabled = true,
  } = props;

  return (
    <ErrorBounds className={clsx(
      props.classes.createProductButtonContainer,
      props.classes.flexButtonItem
    )}>
      <ButtonLoading
        type="submit"
        style={{
          width: props.width || '100%',
          height: 44,
          borderRadius: 8,
        }}
        variant={postInstantly ? "contained" : "outlined"}
        color={postInstantly ? "secondary" : "primary"}
        // loadingIconColor={Colors.lightGrey}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={props.loading}
        // disabled={!process.browser || disabled}
        disabled={disabled}
        onClick={props.onClick}
        className={props.classes.button}
      >
        { props.title ?? "Publish Now"}
      </ButtonLoading>
    </ErrorBounds>
  )
};


interface ReactProps extends WithStyles<typeof styles> {
  postInstantly: boolean;
  disabled: boolean;
  loading?: boolean;
  errors: FormikErrors<ProductCreateInput>
  title?: string;
  type?: string;
  width?: number | string;
  // onClick(e: React.FormEvent<HTMLFormElement>): void;
  onClick?(e: any): void;
}

const styles = (theme: Theme) => createStyles({
  createProductButtonContainer: {
    display: "flex",
    flexDirection: "column",
    width: buttonWidthClassified,
  },
  flexButtonItem: {
    marginTop: '0.25rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'flex-end',
    alignItems: 'flex-start',
    flexGrow: 1,
    flexBasis: '50%',
  },
  button: {
    margin: 0,
  },
})

export default withStyles(styles)(ProductCreateButton);


