/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

// this cannot be an arrow function
function CartStateProvider({ children }) {
  // This is our own custom provider! We will store data (state) and functionality (updaters) in here and anyone can access it via the consumer!

  // Closed cart by default
  const [cartOpen, setCartOpen] = useState(false);

  // function for toddling the cart open and closed
  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  // function to close cart
  function closeCart() {
    setCartOpen(false);
  }

  // function to open cart
  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{
        cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useCart() {
  // We use a consumer here to access the local state
  // useContext is the consumer for the local state, wherever you have a provider, you have a consumer
  const all = useContext(LocalStateContext);
  return all;
}
export { CartStateProvider, useCart };
