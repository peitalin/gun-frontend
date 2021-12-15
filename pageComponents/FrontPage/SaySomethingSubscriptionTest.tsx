
import React from "react";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Graphql
import { useSubscription, useMutation } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
import Button from "@mui/material/Button";
import TextField from "components/Fields/TextInput";

import {
  SAY_SOMETHING_MUTATION,
  SAY_SOMETHING_SUBSCRIPTION
} from "queries/chat-subscriptions";

import { useSnackbar } from "notistack";






const SaySomethingSubscriptionTest = (props: ReactProps) => {

  const {
    classes
  } = props

  const snackbar = useSnackbar();
  const [msg, setMsg] = React.useState("mmm whatcha say")


  const [saySomething, saySomethingResponse] = useMutation<MData, MVar>(
    SAY_SOMETHING_MUTATION, {
    variables: {
      message: ""
    },
    // onCompleted: (data) => {
    //   snackbar.enqueueSnackbar(
    //     `${JSON.stringify(data)}`, { variant: "info" }
    //   )
    // }
  })


  const { data, loading, error } = useSubscription<SData>(
    SAY_SOMETHING_SUBSCRIPTION, { variables: { }, }
  )


  React.useEffect(() => {

    if (data) {
      snackbar.enqueueSnackbar(
        `${JSON.stringify(data.saidSomething)}`, { variant: "info" }
      )
    }
  }, [data])

  // console.log("saySomethingResponse MUTATION: ", saySomethingResponse?.data)
  // console.log("saidSomething SUBSCRIPTION: ", data)

  return (
    <div className={classes.root}>

      <TextField
        variant="outlined"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder={"subscription msg"}
      />
      <Button
        variant="text"
        color="secondary"
        onClick={() => saySomething({
          variables: {
            message: msg
          }
        })}
      >
        Send Msg
      </Button>
    </div>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
}
interface MData {
  saySomething: string;
}
interface MVar {
}

interface SData {
  saidSomething: string;
}
interface SVar {
}

const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: "8rem",
    padding: "1rem",
  },
  margin1: {
    margin: "1rem",
  },
});


export default withStyles(styles)( SaySomethingSubscriptionTest );







