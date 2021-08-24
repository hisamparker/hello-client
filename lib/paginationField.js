import { PRODUCT_NUMBER_QUERY } from './api';

// when we delete a product, the product order on the pages will need to change / update and we need to handle that.
// we could refetch the queries, but we don't know what they are. We could delete all the products from the cache, but apollo doesn't have a clear way to do this
// you can't delete all items buy a certain type :/
export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    // read function: when apollo tries to query for allProducts, the first thing it does is ask the read function for those items
    // we can just return the items from the cache OR we can RETURN FALSE which tells apollo to go and check the network (database)
    // instead of the cache (so it'll get allProducts zonder the deleted ones, yay!) BUT, then we need to merge that back into the cache
    read(existing = [], { args, cache }) {
      // we get the existing items (products) - we set the defaults to an empty array
      // the second thing we get back is an object, we can destructure that object to grab the args we passed into our mutation
      // and the cache we already have
      // console.log({ existing, args, cache });
      // skip and first are the args we passed into PRODUCT_NUMBER_QUERY
      const { skip, first } = args;

      // Read the number of items (products) on the page from the cache
      // this is how we can pull data out of the apollow cache, we say cache.readQuery({ query: whateverQuery })
      const data = cache.readQuery({ query: PRODUCT_NUMBER_QUERY });
      // to get count, we want to check that the data is there, then if it is, we check if the Meta info is there, then
      // if the meta info is there, we specify that we want count (total number of items returned)
      const count = data?._allProductsMeta?.count;
      // now we do the same math we did in Products.js in order to set the number of items per page in our pagination component
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      // start at the skip value, and go until skip + first, we return those items so long as there are items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If
      // There are items
      // AND there aren't enough items to satisfy how many were requested
      // AND we are on the last page otherwise it breaks on the last page because we saying hey always show items equal to first, so if there are less that first items left we need this
      // THEN JUST SEND IT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items /  enough items (less that first), we must go to the network to fetch them
        return false;
      }

      // If there are items, just reutrn them from the cache, and we don't need to go to the network
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo`
        );
        return items;
      }
      // fall back to false just in case (this just means we check the network (db))
      return false; // fallback to network

      // First thing it does it asks the read function for those items.
      // We can either do one of two things:
      // First things we can do is return the items because they are already in the cache
      // The other thing we can do is to return false from here, (network request)
    },
    // this function tells apollo how to put the stuff it grabbed from the db back into the cache
    // we get existing, incoming and {args}
    // incoming is what apollo grabbed from the network (database), refs to the actual product, the value is in the cache
    merge(existing, incoming, { args }) {
      // so we can grab skip and first again!
      // eslint-disable-next-line no-unused-vars
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network with our product
      // console.log(`MErging items from the network ${incoming.length}`);
      // if there are existing items in the cache already, we grab them all, otherwise we make an empty array
      const merged = existing ? existing.slice(0) : [];
      // eslint-disable-next-line no-plusplus
      // but what if someone linked to a specific page? well, we need to know about the previous ones otherwise they might land on a page that no longer exists
      // we haven't fetched the items on the other pages, so we need to shove someblank spots back there in order to show the user what they want to see
      // so we say i = skip, then while i is less that skip + incoming.length, we increment i
      // (basically ++i returns the value after it is incremented, while i++ return the value before it is incremented, we need ++i)
      // eslint-disable-next-line no-plusplus
      for (let i = skip; i < skip + incoming.length; ++i) {
        // we make merged (the existing items) at i equal to the incoming items at i minus skip (how many items we want to skip which is the items per page times the page minus the items per page)
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      // Finally we return the merged items from the cache,
      // we go read, merge, read until we have items
      return merged;
    },
  };
}
