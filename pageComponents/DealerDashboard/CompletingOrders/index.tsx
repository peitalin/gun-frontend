import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import {
  UserPrivate,
} from "typings/gqlTypes";
// Graphql
import Loading from 'components/Loading';
// Components
import CompletingOrdersTable from "./CompletingOrdersTable";





const CompletingOrders: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const d = new Date();
  // get current month + year
  const [month, setMonth] = React.useState<any>(d.getMonth() + 1);
  const [year, setYear] = React.useState<any>(d.getUTCFullYear());

  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.spaceBetween}>
        <CompletingOrdersTable
          dealer={props.dealer}
        />
        <Loading fixed loading={isLoading} delay={'200ms'}/>
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  dealer: UserPrivate
}



const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: '1rem',
    padding: '0.5rem',
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});


export default withStyles(styles)( CompletingOrders );