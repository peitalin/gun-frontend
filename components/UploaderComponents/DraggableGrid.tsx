
import React, { Component } from 'react';
import {
  arrayMove,
  SortableElement,
  SortableContainer,
  SortEnd,
  SortableContainerProps,
} from 'react-sortable-hoc';
import { Colors, BorderRadius } from "layout/AppTheme";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";



export const Grid = SortableContainer((props: GridProps) => {

  const {
    numColumns = 3,
    classes,
    children
  } = props;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
        gridGap: '12px',
        // maxWidth: 'calc(5 * 88px)',
      }}
    >
      {
        children &&
        children.length &&
        children.map((child, index) =>
          <GridItem
            key={`item-${index}`}
            index={index}
            child={child}
            classes={classes}
          />
        )
      }
    </div>
  )
});

export const GridItem = SortableElement((props) => {
  const {
    classes,
    child
  } = props;
  return (
    <div className={classes.gridItem}>
      {child}
    </div>
  )
});



interface GridProps extends WithStyles<typeof styles>, SortableContainerProps {
  numColumns?: number;
  items?: string[];
  onSortEnd?({ oldIndex, newIndex }): void;
  axis?: "xy" | "x" | "y";
  children?: React.ReactNode[];
}
interface GridItemProps extends WithStyles<typeof styles> {
  child?: React.ReactNode;
}

export const styles = (theme: Theme) => createStyles({
  gridItem: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: fade(Colors.black, 0.15),
    borderRadius: `${BorderRadius}px`,
    "&:hover": {
      cursor: "grab",
      // backgroundColor: fade(Colors.blue, 0.4),
    }
  },
})

export default withStyles(styles)(Grid);