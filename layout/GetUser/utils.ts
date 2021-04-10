// Typings
import { UserPrivate } from 'typings/gqlTypes';


interface QueryData {
  user: UserPrivate;
}

export const getUserDataFromGqlOrRedux = (
  data: QueryData,
  userRedux: UserPrivate
): QueryData => {
  if (data?.user?.id) {
    return data
  }
  if (userRedux?.id) {
    return { user: userRedux }
  } else {
    return data
  }
}
