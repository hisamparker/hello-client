import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';

const InnerStyles = styled.div`
  max-width: var(--MaxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

const Page = ({ children }) => (
  <div>
    <GlobalStyles />
    <Header />
    <InnerStyles>{children}</InnerStyles>
  </div>
);

Page.propTypes = {
  //  for children, proptype is an array of nodes
  children: PropTypes.any,
};

export default Page;
