// Typings
import { UserPrivate } from 'typings/gqlTypes';


interface QueryData {
  user: UserPrivate;
}

export const getUserDataFromGqlOrRedux = (
  data: QueryData,
  userRedux: UserPrivate
): QueryData => {
  if (data?.user?.dealer?.id) {
    return data
  }
  if (userRedux?.dealer?.id) {
    return { user: userRedux }
  } else {
    return data
  }
}
