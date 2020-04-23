import * as React from "react";
import { useState } from "react";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// Components
import ErrorBounds from 'components/ErrorBounds';
// Typings
import { HtmlEvent } from "typings";


///////// INCOMPLETE COMPONENT
//////// REDUX NOT DONE, WRONG ACTIONS/REDUCERS
///// REPLACE <NAME> WITH DISCOUNT STATES


const DiscountBuilder = (props: ReactProps) => {

  const [name, setName] = useState("");
  const [addCountdownTimer, setAddCountdownTimer] = useState(false);

  const dispatch = useDispatch();
  const { classes } = props;

  const handleUpdateName = (e: HtmlEvent) => {
    let name = e.target.value;
    setName(name);
    dispatch(Actions.reduxProductCreate.UPDATE_NAME(name))
  };

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
        <FormGroup row className={classes.flexRow}>
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

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( DiscountBuilder );
