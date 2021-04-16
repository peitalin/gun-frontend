import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";


const Section: React.FC<SectionProps> = ({
  classes,
  title,
  ...props
}) => {
  return (
    <div className={clsx(classes.flexCol, classes.sectionRoot)}>
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


interface SectionProps extends WithStyles<typeof styles> {
  title: string;
}



const styles = (theme: Theme) => createStyles({
  sectionRoot: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  titleSpacer: {
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
});

export default withStyles(styles)( Section );



