import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  ID,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import ButtonLoading from "components/ButtonLoading";
import Paper from "@material-ui/core/Paper";
import TextInput from "components/Fields/TextInput";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Switch from '@material-ui/core/Switch';
// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
// Formik
import { FormikProps } from 'formik';
import { FormikFieldsRandomProductsConfig } from "./RandomProductsFormik";



const FieldsConfigOptions: React.FC<ReactProps & FormikProps<FormikFieldsRandomProductsConfig>> = (props) => {

  const {
    classes,
    ...fprops
  } = props;

  // console.log("count + 1: ", fprops.values.count + 1)
  // console.log("fprops.values: ", fprops.values)

  return (
    <div className={clsx(classes.flexRow, classes.section)}>

      <div className={classes.lineContainer}>
        <div className={classes.title}>
          <Typography variant="h4" gutterBottom>
            Config Random Products Generator
          </Typography>
        </div>
      </div>

      <div className={classes.lineContainer}>
        <TextInput
          name="count"
          type="number"
          placeholder="number of products to generate"
          className={classes.textField}
          value={fprops.values.count}
          onChange={(e) => {
            if (e.target.value) {
              fprops.setFieldValue("count", parseInt(e.target.value))
            } else {
              fprops.setFieldValue("count", undefined)
            }
          }}
          inputProps={{ style: { width: 300 }}}
          // errorMessage={fprops.values.count}
          // touched={fprops.values.count}
        />
      </div>

      <div className={classes.lineContainer}>
        <Typography variant="subtitle2">
          Always Publish?
        </Typography>
        <Switch
          checked={fprops.values.alwaysPublish}
          onChange={(e) => {
            fprops.setFieldValue("alwaysPublish", !fprops.values.alwaysPublish)
          }}
          color="secondary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>

      <div className={classes.lineContainer}>
        <Typography variant="subtitle2">
          Always Fewest Previews?
        </Typography>
        <Switch
          checked={fprops.values.alwaysFewestPreviews}
          onChange={(e) => {
            fprops.setFieldValue("alwaysFewestPreviews", !fprops.values.alwaysFewestPreviews)
          }}
          color="secondary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </div>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
}



const styles = (theme: Theme) => createStyles({
  section: {
    margin: '2rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  title: {
    marginBottom: '1rem',
  },
  textField: {
    marginBottom: '0.5rem',
  },
  lineContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
  },
});


export default withStyles(styles)( FieldsConfigOptions );



