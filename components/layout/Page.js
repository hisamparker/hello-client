/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';
import Snackbar from './Snackbar';
import { useSnackbar } from '../../context/snackbarState';
import Footer from './Footer';

const Page = ({ children }) => {
  const snackbar = useSnackbar();
  return (
    <>
      <GlobalStyles />
      <StyledGridContainer>
        {snackbar && (
          <Snackbar
            isOpen={snackbar.snackbarOpen}
            styleProp={snackbar.snackbarType}
            message={snackbar.snackbarMessage}
            dismissOnClick={snackbar.closeSnackbar}
            closeButton={snackbar.closeButton}
          />
        )}
        <Header />
        <section className="content">{children}</section>
        <Footer />
      </StyledGridContainer>
    </>
  );
};

const StyledGridContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'header header header header'
    'content content content content'
    'footer footer footer footer';
  header {
    grid-area: header;
  }

  .content {
    width: 95%;
    display: grid;
    justify-items: center;
    grid-area: content;
    min-height: 60vh;
    background-color: #e5e5e5;
    margin: 0 auto;
    padding: 4rem;
    border-radius: 3rem;
  }

  footer {
    grid-area: footer;
  }
`;

export default Page;
