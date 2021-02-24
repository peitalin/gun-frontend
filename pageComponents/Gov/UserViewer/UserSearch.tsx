import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextInput from "components/Fields/TextInput";
// Utils Components
import ErrorBounds from "components/ErrorBounds";


const UserSearch: React.FC<ReactUsersSearchProps> = (props) => {

  const {
    classes,
    userId,
    setUserId,
    searchUser,
    loading,
    errorMsg,
  } = props;

  return (
    <ErrorBounds className={clsx(classes.root, classes.searchRoot)}>
      <Typography variant="h4">
        View Users
      </Typography>

      <div className={clsx(classes.flexRow, classes.section)}>
        <Typography color={"primary"} variant="subtitle1" gutterBottom>
          Lookup User ID:
        </Typography>
        <TextInput
          name="userId"
          placeholder="e.g. oxxxxxxxxxxxxxx"
          className={classes.textField}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          inputProps={{ style: { width: '100%' }}}
        />
        <Button
          className={classes.orderItemButton}
          variant={"outlined"}
          color={"primary"}
          onClick={() => searchUser(userId)}
        >
          Find User
        </Button>
        {
          errorMsg &&
          <Typography color={"primary"} variant="subtitle1" gutterBottom>
            {errorMsg}
          </Typography>
        }
      </div>
      {props.children}
    </ErrorBounds>
  )
}

interface ReactUsersSearchProps extends WithStyles<typeof styles> {
  setUserId(userId: string): void;
  userId: string;
  searchUser(userId: string): void;
  errorMsg: string;
  loading: boolean;
}


const styles = (theme: Theme) => createStyles({
  root: {
    padding: '3rem',
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
  },
  searchRoot: {
    marginBottom: '2rem',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  section: {
    margin: '2rem',
  },
  orderItemButton: {
    padding: "0.5rem 1rem",
    width: '100%',
    borderRadius: BorderRadius,
    border: `1px solid ${Colors.blue}`,
    "&:hover": {
      border: `1px solid ${Colors.green}`,
    },
  },
  textField: {
    marginBottom: '0.5rem',
  },
});


export default withStyles(styles)( UserSearch );



