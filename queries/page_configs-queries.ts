import gql from "graphql-tag";


export const INITIATE_PAGE_CONFIG = gql`
  mutation initiatePageConfig {
    initiatePageConfig {
      id
      name
      urlPath
      pageConfigSections {
        id
        pageConfigId
        viewAllPath
        hideViewAll
        promotedListId
        ## Call with another query using promotedListId
        # promotedList {
        #   id
        #   createdAt
        #   updatedAt
        #   numberOfSlots
        #   categoryFilterSlug
        #   cardsPerRow
        #   promotedSlotsConnection {
        #     id
        #   }
        # }
        isNewestList
        title
        position
      }
    }
  }
`;



export const GET_PAGE_CONFIG_BY_PATH = gql`
  query($urlPath: String!) {
    getPageConfig(urlPath: $urlPath) {
      id
      name
      urlPath
      pageConfigSections {
        id
        pageConfigId
        viewAllPath
        hideViewAll
        promotedListId
        ## Call with another query using promotedListId
        # promotedList {
        #   id
        #   createdAt
        #   updatedAt
        #   numberOfSlots
        #   categoryFilterSlug
        #   cardsPerRow
        #   promotedSlotsConnection {
        #     id
        #   }
        # }
        isNewestList
        title
        position
      }
    }
  }
`;