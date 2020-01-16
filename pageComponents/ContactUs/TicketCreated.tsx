import React from "react";
import { useState } from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Utils
import Loading from "components/Loading";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";




const TicketCreated: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.innerRoot}>

          <div className={classes.flexCol}>
            <Typography className={classes.title} variant="h3">
              A support ticket has been created for you.
            </Typography>
            {
              router.query.ticketId &&
              <Typography className={classes.title} variant="body1">
                {`Ticket: ${router.query.ticketId}`}
              </Typography>
            }
          </div>

          <div className={classes.flexCol}>
            <Typography className={classes.title} variant="body1">
              We will get back to you shortly.
            </Typography>
          </div>


          <div className={classes.flexCol}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                router.push("/")
              }}
            >
              <Typography variant="body1">
                Return Home
              </Typography>
            </Button>
          </div>

        </div>
      </div>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}



const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: '4rem 2rem 2rem 2rem',
    marginBottom: '1rem',
    borderRadius: '2px',
    backgroundColor: Colors.foregroundColor,
    minHeight: 'calc(100vh - 90px - 120px)',
    width: '100%',
  },
  innerRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: "0.5rem",
    width: '100%',
    maxWidth: 400,
  },
  // avatar outline circle
  avatar: {
    width: 90,
    height: 90,
    border: "1px solid #fafafa",
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.5)",
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 600,
    marginTop: '0.5rem',
    marginBottom: '0.25rem',
    width: '100%',
  },
  // avatar image
  textField: {
    flexGrow: 1,
    minWidth: 300,
  },
  bioLength: {
    fontSize: '0.8rem',
    color: '#cccccc',
  },
  sendMessageButton: {
    marginTop: '1rem',
    minWidth: 180,
    backgroundColor: Colors.red,
  },
});


export default withStyles(styles)( TicketCreated );