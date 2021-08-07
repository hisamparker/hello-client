import { useQuery, gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    # when we set up our config we said auth referencers the User schema but gql gives the option to auth anything
    # the authenticatedItem query returns a union, that's why there's the ... before User
    # this is incase you want to determine what type the auth is on in case we have subtypes https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            image {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

const useUser = () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error}</p>;
  return data?.authenticatedItem;
};

export default useUser;
