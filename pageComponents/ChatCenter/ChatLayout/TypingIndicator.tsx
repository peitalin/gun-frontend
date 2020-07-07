import React from 'react';
// Styles
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useSubscription } from '@apollo/client';
import { Users_Typing } from "typings/gqlTypes";
import gql from 'graphql-tag';


const GET_USER_TYPING = gql`
  subscription ($selfId: String) {
    users_typing (
      where: { id: { _neq: $selfId } },
      limit: 2
      order_by: {lastTyped:desc}
    ){
      lastTyped
      id
      firstName
      lastName
      email
    }
  }
`;


const  TypingIndicator: React.FC<ReactProps> = (props) => {

  const {
    classes
  } = props;

  const { data, loading, error } = useSubscription<SubsData, SubsVars>(
    GET_USER_TYPING, {
      variables: {
        selfId: null
        // selfId: props.userId
      }
    }
  )

  const renderTypingIndicator = () => {
    if (loading) {
      return "";
    } else if (error) {
      return "";
    } else if (data.users_typing.length === 0) {
      return "";
    } else {
      return `${option(data).users_typing[0].firstName()} is typing ...`;
    }
  }

  return (
    <div className={classes.typingIndicator}>
      <Typography variant="caption">
        {renderTypingIndicator()}
      </Typography>
    </div>
  )
};



interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
}
interface SubsData {
  users_typing: Users_Typing[]
}
interface SubsVars {
  selfId: string;
}

const styles = (theme: Theme) => createStyles({
  typingIndicator: {
    textAlign: 'left',
    paddingBottom: '10px',
    paddingLeft: '1%',
    background: "transparent",
    position: 'absolute',
    top: '-1rem',
    width: '100%',
  },
})


export default withStyles(styles)( TypingIndicator );