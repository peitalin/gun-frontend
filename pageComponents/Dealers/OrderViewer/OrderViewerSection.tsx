import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";

const OrderViewerSection: React.FC<OrderViewerSectionProps> = ({
  classes,
  title,
  ...props
}) => {
  return (
    <div className={classes.orderViewerSection}>
      {
        title &&
        <Typography color={"primary"} variant="h5" gutterBottom>
          {title}
        </Typography>
      }
      <div className={classes.titleSpacer}>
        {props.children}
      </div>
    </div>
  )
}

interface OrderViewerSectionProps extends WithStyles<typeof styles> {
  title?: string;
}


const styles = (theme: Theme) => createStyles({
  orderViewerSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  titleSpacer: {
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
});


export default withStyles(styles)( OrderViewerSection );



