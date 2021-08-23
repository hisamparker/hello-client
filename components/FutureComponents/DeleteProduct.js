import { useMutation } from '@apollo/client';
import React from 'react';
import Button from '../elements/Button';
import { DELETE_PRODUCT_MUTATION } from '../../lib/api';

// eslint-disable-next-line react/prop-types
const DeleteProduct = ({ id, children }) => {
  // could add a click count here to make sure they really want to
  // clear deleted product from cache https://www.apollographql.com/docs/react/caching/garbage-collection/
  // apollo has an api called cache.evict() which removes objects from the cache cache.evict({id: ''objectId})
  // OR you can remove a single field from the cache by specifying the field: cache.evict({id: 'objectId', filedName: 'my-field-name'})
  // Evicting an object can make other cached objects unreachable, so call cache.gc after doing it
  // TODO ask michael about why I need cache.identify https://www.apollographql.com/docs/react/caching/cache-interaction/#using-cachemodify
  const update = (cache, payload) => {
    const deletedItem = payload.data.deleteProduct;
    cache.evict(cache.identify(deletedItem));
    cache.gc();
  };
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      // we can provide an update function to useMutation to get access to the apollo cache and to the payload
      // (what we choose to return from the mutaion), here that's id and name (see lines 8 + 9)
      // https://www.apollographql.com/docs/react/data/mutations/ to see other ways to use this (cache.modify looks cool)
      update,
    }
  );
  const handleDelete = () => {
    try {
      // TODO change this into a toast
      // eslint-disable-next-line no-restricted-globals
      if (confirm('are you sure?')) {
        deleteProduct(id);
      }
    } catch (err) {
      console.log(err.message, error);
    }
  };
  return (
    <div>
      <Button
        variant="secondary"
        disabled={loading}
        onClick={handleDelete}
        type="button"
      >
        {children}
      </Button>
    </div>
  );
};

export default DeleteProduct;
