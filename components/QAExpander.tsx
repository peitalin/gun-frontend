import React from "react";
// MUI expander
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";


const QAExpander = ({ question, answer }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          variant="body1"
          style={{
            width: '100%',
            marginRight: '1rem',
            marginBottom: '0.5rem',
            backgroundColor: "#fefefe",
          }}
        >
          {question}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          {answer}
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}


export default QAExpander;