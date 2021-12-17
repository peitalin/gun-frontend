
import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark, BoxShadows } from "layout/AppTheme";
// MUI
import CollectionsIcon from '@material-ui/icons/Collections';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const FilterAccordionRow: React.FC<ReactProps> = (props) => {

  const {
    classes,
    openInitially = true,
  } = props;

  const [expanded0, setExpanded0] = React.useState(openInitially)

  return (
    <Accordion
      className={classes.accordion}
      expanded={expanded0 === true}
      onChange={
        props.disabled
        ? () => {}
        : () => setExpanded0(s => !s)
      }
    >
      <AccordionSummary
        className={expanded0 && classes.accordionHeader}
        expandIcon={<ExpandMoreIcon />}
        // aria-controls="panel1bh-content"
        // id="panel1bh-header"
      >
        { props.titleIcon && props.titleIcon }
        {
          props.disabled
          ? <span className={classes.menuTextDisabled}>{props.title} [Disabled]</span>
          : <span className={classes.menuText}>{props.title}</span>
        }
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
}

const AccordionSummary = withStyles({
  root: {
    marginBottom: 0,
    minHeight: 56,
    '&$expanded': {
      marginBottom: 0,
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
    },
  },
  expanded: {
  },
})(MuiAccordionSummary);

interface ReactProps extends WithStyles<typeof styles> {
  title: string
  titleIcon?: React.ReactNode
  openInitially?: boolean
  disabled?: boolean
}


export const styles = (theme: Theme) => createStyles({
  accordion: {
    boxShadow: 'unset',
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    margin: '0px !important',
  },
  accordionHeader: {
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    margin: '0px !important',
  },
  accordionDetails: {
    backgroundColor: isThemeDark(theme)
      ? `${Colors.uniswapMediumNavy}`
      : `${Colors.slateGrey}`,
  },
  menuIcon: {
    marginRight: "0.5rem",
    color: isThemeDark(theme)
      ? Colors.lightGrey
      : Colors.black,
  },
  menuItem: {
    height: 50,
    "&:hover": {
      backgroundColor: isThemeDark(theme)
        ? Colors.uniswapNavy
        : Colors.slateGreyDarker,
      color: Colors.cream,
    },
  },
  menuText: {
    color: isThemeDark(theme)
      ? Colors.lightGrey
      : Colors.black,
    fontSize: "1rem",
    fontWeight: 500,
  },
  menuTextDisabled: {
    color: isThemeDark(theme)
      ? Colors.uniswapGrey
      : Colors.slateGreyDarkest,
    fontSize: "1rem",
    fontWeight: 500,
  },
});

export default withStyles(styles)( FilterAccordionRow );



