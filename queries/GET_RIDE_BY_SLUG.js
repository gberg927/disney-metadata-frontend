import gql from 'graphql-tag';

export const GET_RIDE_BY_SLUG = gql`
  query GET_RIDE_BY_SLUG(
    $slug: String!
    $parkSlug: String!
    $resortSlug: String!
  ) {
    rides(
      where: {
        slug: { equals: $slug }
        park: {
          slug: { equals: $parkSlug }
          resort: { slug: { equals: $resortSlug } }
        }
      }
    ) {
      id
      name
      slug
      category
      type
      longitude
      latitude
      area
      openedOn
      heightRestriction
      duration
      fastPass
      singleRider
      riderSwap
      waitTime {
        timestamp
        active
        status
        amount
      }
      park {
        name
        timezone
        resort {
          name
        }
      }
    }
  }
`;
