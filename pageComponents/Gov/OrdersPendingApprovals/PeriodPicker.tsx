import * as React from "react";
import { oc as option } from "ts-optchain";
import { FunctionComponent } from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// MUI
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";




const PeriodPicker: FunctionComponent<ReactProps> = (props) => {

  const {
    classes,
    month,
    setMonth,
    year,
    setYear,
  } = props;

  return (
    <Paper className={classes.root}>
      <div className={clsx(classes.dateInputContainer)}>
        <div className={classes.sideBarSpacer}/>
        <FormControl style={{ width: '100px' }}>
          <InputLabel htmlFor="month-simple">Month</InputLabel>
          <Select
            value={month}
            onChange={(e) => {
              setMonth(e.target.value)
            }}
            classes={{
              root: classes.monthSelect
            }}
            inputProps={{
              name: 'month',
              id: 'month-simple',
            }}
          >
            <MenuItem value={1}>Jan</MenuItem>
            <MenuItem value={2}>Feb</MenuItem>
            <MenuItem value={3}>Mar</MenuItem>
            <MenuItem value={4}>Apr</MenuItem>
            <MenuItem value={5}>May</MenuItem>
            <MenuItem value={6}>Jun</MenuItem>
            <MenuItem value={7}>Jul</MenuItem>
            <MenuItem value={8}>Aug</MenuItem>
            <MenuItem value={9}>Sep</MenuItem>
            <MenuItem value={10}>Oct</MenuItem>
            <MenuItem value={11}>Nov</MenuItem>
            <MenuItem value={12}>Dec</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={{ width: '100px' }}>
          <InputLabel htmlFor="year-simple">Year</InputLabel>
          <Select
            value={year}
            onChange={(e) => {
              setYear(e.target.value)
            }}
            classes={{
              root: classes.yearSelect
            }}
            inputProps={{
              name: 'year',
              id: 'year-simple',
            }}
          >
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
          </Select>
        </FormControl>
          {props.children}
      </div>
    </Paper>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  year: number;
  setYear(y: any): void;
  month: number;
  setMonth(m: any): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    background: '#fff',
    bottom: 0,
    right: 0,
    width: '100%',
    borderTop: '1px solid #dadada',
    borderRadius: 0,
    zIndex: 1,
    boxShadow: '1px -2px -2px 0 #dadada',
  },
  sideBarSpacer: {
    width: 190,
    height: 40,
  },
  dateInputContainer: {
    margin: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  monthSelect: {
    padding: '1rem',
  },
  yearSelect: {
    padding: '1rem',
  },
});


export default withStyles(styles)( PeriodPicker );
