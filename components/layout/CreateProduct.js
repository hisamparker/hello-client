// The useMutation React hook is the primary API for executing mutations in an Apollo application.
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';
import useForm from '../../lib/useForm';
import ErrorMessage from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

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
// gui with nextjs for creating product in keystone
export const CreateProduct = () => {
  // custom hook for handling the form
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: 'cute',
    image: '',
    price: 100,
    description: 'i love hello',
  });

  // To execute a mutation, you first call useMutation within a React component and pass it the mutation you want to execute
  // figure out how to construct the mutation in the gql playground, then you can pass in any additional data that you want to add
  // https://www.apollographql.com/docs/react/data/mutations/
  // useMutation returns the same stuff as useQuery, data, error, loading PLUS a function that fires of the mutation
  // this variables are 'reactive' so they'll update to match the current state, which means we can grab them and use them!
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      // like a dependencies array for useEffect, you can say, hey when we perform this mutation, also refetch the specified queries! then wherever this query is being performed will rerender to show updated info!
      // if the query needs a variable/ vairables, then you'll need to add that too
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  // TODO check with Michael re-try catch
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      // the result of the axios call will be the same as the vars created with useMutation, so we don't really need to grab the result, BUT the variables are reactive so if we want to capture the result and hang on to it, probably best to make a ref
      // BUT if I try to use data here, it doesn't work beacause data is undefined...
      const res = await createProduct();
      clearForm();
      console.log(data);
      // TODO push user to created product
      Router.push({
        // you can pass other stuff including query params and stuff
        // TODO create slug for product https://nextjs.org/docs/routing/dynamic-routes EXAMPLE: https://github.com/wesbos/Syntax/tree/master/pages how to nest slug https://github.com/wesbos/Syntax/blob/master/components/Show.js npm package for creating slug : https://www.npmjs.com/package/speakingurl
        pathname: `/product/${res.data.createProduct.id}`,
        // look below for object and how to reference the returned data
      });
    } catch (err) {
      console.error(err);
    }
  };
  // data will return something like "createProduct: Object { id: "61069027039701526bcf6559", price: 100, description: "i love hello", … }
  // __typename: "Product"
  // description: "i love hello"
  // id: "61069027039701526bcf6559"
  // name: "cute"
  // price: 100"

  return (
    // your inputs must contain an onChange prop with a function the handle changes
    // if you don't, your input will be imutible (you can't change it) becuase React wants 1 source of truth
    // if you have state stored from an input, but you also have state changing directly in that input, then the input's state exists in 2 places at once
    <form onSubmit={handleSubmitProduct}>
      {/* TODO fix error messaging, change error component to handle messaging on front end and change styling */}
      <ErrorMessage error={error} />
      {/* TODO style aria busy with loader */}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          NAME
          <input
            type="text"
            name="name"
            id="name"
            // value is dynamic, comes from our hook
            value={inputs.name}
            placeholder="Name"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="image">
          IMAGE
          <input type="file" name="image" id="image" onChange={handleChange} />
        </label>
        <label htmlFor="price">
          PRICE
          <input
            // html inputs always return a string... so be careful!
            type="number"
            name="price"
            id="price"
            value={inputs.price}
            placeholder="Price"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="description">
          DESCRIPTION
          <textarea
            name="description"
            id="description"
            value={inputs.description}
            placeholder="description"
            onChange={handleChange}
            required
          />
        </label>
        {/* eslint-disable-next-line react/button-has-type */}
        <button type="button" onClick={clearForm}>
          Clear form
        </button>
        <button type="button" onClick={resetForm}>
          Reset form
        </button>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </form>
  );
};
