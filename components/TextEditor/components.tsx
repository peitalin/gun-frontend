
import React from 'react'
import clsx from "clsx";
import { WithStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";
import { fontFam, Colors } from "layout/AppTheme";

import { useSlate } from 'slate-react'
import Icon from 'react-icons-kit';
import {
  useSelected,
  useFocused,
} from 'slate-react'
import {
  isMarkActive,
  isBlockActive,
  toggleBlock,
  toggleMark,
} from "./helpersEditorToggles";
import {
  isLinkActive,
  insertLink,
  toggleLink,
} from "./helpersLinks";



interface SlateComponent extends WithStyles<typeof styles> {
  className?: any;
  active?: any;
  reversed?: any;
  onMouseDown?(args: any): void;
  style?: any;
}

export const styles = (theme: Theme) => createStyles({
  button: {
    cursor: 'pointer',
    "&:hover": {
      color: Colors.secondary,
      backgroundColor: Colors.uniswapLightNavy,
    },
    padding: '0.5rem',
  },
  icon: {
    fontSize: '1.1rem',
    verticalAlign: 'text-bottom',
  },
  menu: {
    "& > *": {
      display: "inline-block",
    },
    "& > * + *": {
      marginLeft: '0.5rem',
    }
  },
  toolbar: {
    position: 'relative',
    padding: '0rem 0.5rem',
    borderBottom: `1px solid ${Colors.uniswapGrey}`,
    marginBottom: '1rem',
  },
})


export const Button = withStyles(styles)(
  React.forwardRef<any, SlateComponent>(
    ({ className, active, reversed, ...props }, ref) => (
      <span
        {...props}
        ref={ref}
        className={clsx(
          className,
          props.classes.button
        )}
        style={{
          color: active
            ? Colors.gradientUniswapBlue1
            : Colors.uniswapLighterGrey,
        }}
      />
    )
))


export const Menu = withStyles(styles)(
  React.forwardRef<any, SlateComponent>(
    ({ className, ...props }, ref) => (
      <div
        {...props}
        ref={ref}
        className={clsx(
          className,
          props.classes.menu
        )}
      />
    )
))

export const Toolbar = withStyles(styles)(
  React.forwardRef<any, SlateComponent>(
    ({ className, ...props }, ref) => {
      return (
        <Menu
          {...props}
          ref={ref}
          className={
            props.classes.toolbar
          }
        />
      )
    }
))


export const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon icon={icon}/>
    </Button>
  )
}

export const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon icon={icon}/>
    </Button>
  )
}


export const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      {children}
      <img
        src={element.url}
        style={{
          display: 'block',
          maxWidth: '100%',
          maxHeight: '20em',
          boxShadow: `${selected && focused ? '0 0 0 2px blue;' : 'none'}`,
        }}
      />
    </div>
  )
}


export const LinkButton = ({ icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault()
        toggleLink(editor)
      }}
    >
      <Icon icon={icon}/>
    </Button>
  )
}
