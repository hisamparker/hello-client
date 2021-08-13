import { gql } from '@apollo/client';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
    }
  }
`;

const DELETE_FROM_CART_MUTATION = gql`
  mutation DELETE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const CREATE_PRODUCT_MUTATION = gql`
  # we have to name it to make it flexible, a flexible mutation is a mutation that can accept variables / flexible data
  mutation CREATE_PRODUCT_MUTATION(
    # all the variables we're going to pass in, ! means required
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        # this it's its own type, via a relationship, so we need to nest the creation of the image within our query
        # so we create the relationship and the image at the same time
        image: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const ORDER_BY_ID_QUERY = gql`
  query ORDER_BY_ID_QUERY($id: ID!) {
    #   we can rename the product if we do - item: Product
    Order(where: { id: $id }) {
      id
      total
      user {
        id
        name
        email
      }
      items {
        id
        name
        description
        product {
          id
        }
        image {
          image {
            publicUrlTransformed
          }
        }
        price
      }
    }
  }
`;

const CURRENT_USER_ORDERS_QUERY = gql`
  query {
    # when we set up our config we said auth referencers the User schema but gql gives the option to auth anything
    # the authenticatedItem query returns a union, that's why there's the ... before User
    # this is incase you want to determine what type the auth is on in case we have subtypes https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
    authenticatedItem {
      ... on User {
        id
        email
        name
        orders {
          id
        }
      }
    }
  }
`;

const PRODUCT_NUMBER_QUERY = gql`
  query PRODUCT_NUMBER_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const USER_PRODUCTS_QUERY = gql`
  query {
    # when we set up our config we said auth referencers the User schema but gql gives the option to auth anything
    # the authenticatedItem query returns a union, that's why there's the ... before User
    # this is incase you want to determine what type the auth is on in case we have subtypes https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/
    authenticatedItem {
      ... on User {
        id
        email
        name
        orders {
          items {
            id
            product {
              id
              slug
            }
          }
        }
      }
    }
  }
`;

// because we named the page [id] it means anything the matches product/salfdjlasjflajdf will use this page ()
// we'll get the id for the product via props
const PRODUCT_BY_ID_QUERY = gql`
  query PRODUCT_BY_ID_QUERY($id: ID!) {
    #   we can rename the product if we do - item: Product
    Product(where: { id: $id }) {
      name
      price
      description
      id
      image {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ALL_PRODUCTS_QUERY = gql`
  # first accepts the var we pass called first, in gqp first is like slice, we pass an int to slice and that says return this number of objects from the query
  # in the graphql documentation there are other suggestions, but here's what we're using https://www.howtographql.com/graphql-js/8-filtering-pagination-and-sorting/
  #  TODO ask michael about skip another way? https://www.antstack.io/blog/graphql-pagination-with-apollo-v3-part-1/
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      price
      name
      description
      image {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    # these are the vars we need
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      #  pass in the vars to perfomr updatePriduct
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const CURRENT_USER_QUERY = gql`
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

//  https://keystonejs.com/docs/apis/session
const LOG_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

// keystone offers options for sending password reset to users, we need to handle email sending, they handle the token creating and redemption
// The mutation sendUserPasswordResetLink allows you to send a reset token to a user.
// We must set this option up in the keystone config when we create auth: https://keystonejs.com/docs/apis/auth
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    #   we pass a single value, email
    sendUserPasswordResetLink(email: $email) {
      # we retrieve a code a message if not successful
      # do not EVER put this in browser
      code
      message
    }
  }
`;

// The mutation redeemUserPasswordResetToken lets the user reset their password by redeeming the token.
// You need to provide a sendToken function which can be used by sendUserPasswordResetLink to send the generated token to the user.
// It is expected that you will use these mutations as part of a password reset workflow within your frontend application.
const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const LOG_IN_MUTATION = gql`
  mutation LOG_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export {
  LOG_IN_MUTATION,
  SIGNUP_MUTATION,
  RESET_MUTATION,
  REQUEST_RESET_MUTATION,
  LOG_OUT_MUTATION,
  ADD_TO_CART_MUTATION,
  DELETE_FROM_CART_MUTATION,
  CREATE_ORDER_MUTATION,
  CREATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
  ORDER_BY_ID_QUERY,
  USER_PRODUCTS_QUERY,
  PRODUCT_NUMBER_QUERY,
  PRODUCT_BY_ID_QUERY,
  ALL_PRODUCTS_QUERY,
  UPDATE_PRODUCT_MUTATION,
  CURRENT_USER_QUERY,
  CURRENT_USER_ORDERS_QUERY,
};
