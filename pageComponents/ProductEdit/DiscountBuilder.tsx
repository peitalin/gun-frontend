import React from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
// Redux
import { connect } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReduxStateProductEdit } from "reduxStore/product_edit-reducer";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
// Typings
import { HtmlEvent } from "typings";
import ErrorBounds from 'components/ErrorBounds';



const DiscountBuilder = (props: ReactProps & ReduxProps) => {

  const [name, setName] = useState("");
  const [addCountdownTimer, setAddCountdownTimer] = useState(false);

  // Debounce Redux State changes to limit lag
  const [debounceUpdateName] = useDebouncedCallback((name: string) => {
    props.updateName(name)
  }, 100);

  const handleUpdateName = (e: HtmlEvent) => {
    let name = e.target.value;
    setName(name);
    debounceUpdateName(name);
  };

  const { classes } = props;

  return (
    <ErrorBounds className={classes.discountContainer}>
      <Typography color={"primary"} variant="subtitle1" gutterBottom>
          Create Discounts
      </Typography>
      <TextInput
        required
        placeholder="$"
        className={classes.textField}
        value={name}
        onChange={handleUpdateName}
        inputProps={{ style: { width: '100%' }}}
      />

      <Typography className={classes.flexItem} color={"primary"} variant="subtitle2" gutterBottom>
        Temporary Discount Price
      </Typography>
      <TextInput
        required
        placeholder="Not implemented yet"
        // className={classes.textField}
        // value={basePrice}
        onChange={() => alert("discounts not implemented yet")}
        inputProps={{ style: { width: '100%' }}}
      />

      <div className={classes.flexRow}>
        <FormGroup row className={clsx(classes.container, classes.flexRow)}>
          <FormControlLabel
            className={classes.flexItem}
            control={
              <Checkbox
                checked={addCountdownTimer}
                onChange={() => setAddCountdownTimer(!addCountdownTimer)}
                value="Special"
                color="primary"
              />
            }
            label="Add a Countdown Timer"
          />
        </FormGroup>
      </div>
    </ErrorBounds>
  )
}

interface ReduxProps {
  reduxProductEdit: ReduxStateProductEdit;
  updateName(name: string): void;
}
interface ReactProps extends WithStyles<typeof styles> {
  data?: any
}



//////////////// REDUX /////////////////////
const mapStateToProps = ( state: GrandReduxState )  => {
  return state
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    updateName: (payload: string) => dispatch(
      Actions.reduxProductEdit.UPDATE_NAME(payload)
    ),
  }
}
const DiscountBuilderRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)( DiscountBuilder )

export default withStyles(styles)( DiscountBuilderRedux );
