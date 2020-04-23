import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// Icons
import Tick from "components/Icons/Tick";
import Avatar from "@material-ui/core/Avatar";
import { Colors } from "layout/AppTheme";
import Link from "next/link";
import QAExpander from "components/QAExpander";




const Tip: React.FC<TipProps> = ({ classes, bulletType, children }) => {

  const renderBullet = (bulletType: number | 'tick') => {
    switch (bulletType) {
      case 'tick':
        return (
          <Tick className={classes.bullet}
            size={30}
            color={Colors.green}
            disableBackground={true}
          />
        );
      default:
        return (
          <Avatar className={classes.numberPoint}>
            <Typography style={{ color: Colors.darkGrey }} variant="body2">
              {bulletType}
            </Typography>
          </Avatar>
        );
    }
  }

  return (
    <div className={classes.tip}>
      { renderBullet(bulletType) }
      <Typography color={"primary"} variant="body2" style={{ fontWeight: 400 }}>
        {children}
      </Typography>
    </div>
  )
}

interface TipProps extends WithStyles<typeof styles> {
  bulletType: number | 'tick';
}

const styles = (theme: Theme) => createStyles({
  bullet: {
    marginRight: '0.25rem',
  },
  tip: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  numberPoint: {
    height: 20,
    width: 20,
    marginRight: '0.5rem',
    backgroundColor: 'rgba(200,200,200,0)',
    border: `2px solid ${Colors.darkGrey}`,
  },
});


export default withStyles(styles)( Tip );