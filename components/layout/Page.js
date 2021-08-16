import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';
import Snackbar from './Snackbar';
import { useSnackbar } from '../../context/snackbarState';

const InnerStyles = styled.div`
  background-color: #e5e5e5;
  margin: 0 auto;
  padding: 2rem;
`;

const Page = ({ children }) => {
  const snackbar = useSnackbar();
  return (
    <div>
      <GlobalStyles />
      <Snackbar
        isOpen={snackbar.snackbarOpen}
        styleProp={snackbar.snackbarType}
        message={snackbar.snackbarMessage}
        dismissOnClick={snackbar.closeSnackbar}
        closeButton={snackbar.closeButton}
      />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
};

Page.propTypes = {
  //  for children, proptype is an array of nodes
  children: PropTypes.any,
};

export default Page;
