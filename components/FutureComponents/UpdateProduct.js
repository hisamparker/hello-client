import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { PRODUCT_BY_ID_QUERY, UPDATE_PRODUCT_MUTATION } from '../../lib/api';
import useForm from '../../lib/useForm';
import ErrorMessage from '../elements/ErrorMessage';
import Loader from '../elements/Loader';

const UpdateProduct = ({ id }) => {
  // grab the existing product info to populate form
  const { data, loading, error } = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: {
      id,
    },
  });
  // create our mutation to update the product data on submit
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);
  console.log(updateData);
  // if you navigate here via products, you'll get a loading === true because we need to fetch the data, but if you
  // refresh the page, you'll fetch from the data cache so the render happens on the client side and there's no load time (thanks apollo)
  if (loading || updateLoading) return <Loader />;
  // this needs to go after loading, otherwise js will try to destructure before data exists!
  //   const { Product } = data;
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct({
        variables: {
          id,
          name: inputs.name,
          description: inputs.description,
          price: inputs.price,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmitProduct}>
      {/* TODO fix error messaging, change error component to handle messaging on front end and change styling */}
      <ErrorMessage error={error || updateError} />
      {/* TODO style aria busy with loader */}
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
        <button type="submit">Update Product</button>
      </fieldset>
    </form>
  );
};

UpdateProduct.propTypes = {
  id: PropTypes.string,
};

export default UpdateProduct;
