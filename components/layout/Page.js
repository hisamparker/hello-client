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
            variant={snackbar.snackbarType}
            message={snackbar.snackbarMessage}
            dismissOnClick={snackbar.closeSnackbar}
            closeButton={snackbar.closeButton}
          />
        )}
        <Header />
        <StyledPageContent>{children}</StyledPageContent>
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
  footer {
    grid-area: footer;
  }
`;

const StyledPageContent = styled.article`
  width: 95%;
  display: grid;
  justify-items: center;
  grid-area: content;
  min-height: 60vh;
  background-color: #e5e5e5;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 3rem;
  @media (max-width: 414px) {
    background-color: var(--Background);
    padding: 1rem;
  }
`;

export default Page;
