import React from "react";
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
// MUI expander
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import { Colors } from "layout/AppTheme";



const TipExpander: React.FC<ReactProps> = (props) => {

  const {
    title,
    classes,
    children,
    defaultExpanded = false
  } = props

  return (
    <ExpansionPanel
      defaultExpanded={defaultExpanded}
      classes={{
        root:
          (classes && classes.sellingTips)
          ? classes.sellingTips
          : null,
      }}
      elevation={0} // remove box-shadow
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{
          expanded: classes.expanded,
          content: classes.content,
        }}
      >
        <Typography
          variant="body1"
          style={{
            width: '100%',
            marginRight: '1rem',
            marginBottom: '0.5rem',
            backgroundColor: "#fefefe",
          }}
        >
          {title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          {children}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  defaultExpanded?: boolean;
}

const styles = (theme: Theme) => createStyles({
  sellingTips: {
    padding: '0.5rem 0rem 0rem 0rem',
    marginLeft: '0rem',
    marginBottom: '1rem',
    border: '1px solid #eaeaea',
    borderRadius: '4px',
    backgroundColor: Colors.foregroundColor,
  },
  expanded: {
    margin: 0,
    minHeight: '2rem',
  },
  content: {
    minHeight: '2rem',
    margin: 0,
  },
});


export default withStyles(styles)( TipExpander );