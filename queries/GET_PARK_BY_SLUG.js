import gql from 'graphql-tag';

export const GET_PARK_BY_SLUG = gql`
  query GET_PARK_BY_SLUG($slug: String!, $resortSlug: String!) {
    parks(
      where: {
        slug: { equals: $slug }
        resort: { slug: { equals: $resortSlug } }
      }
    ) {
      id
      name
      slug
      latitude
      longitude
      timezone
      rides(orderBy: { name: asc }) {
        id
        name
        slug
        category
        type
        area
        heightRestriction
        fastPass
        riderSwap
        singleRider
        waitTime {
          timestamp
          active
          status
          amount
        }
      }
      resort {
        name
      }
    }
  }
`;
