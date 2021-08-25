import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { perPage } from '../../config';
import { PRODUCT_NUMBER_QUERY } from '../../lib/api';
import Loader from '../elements/Loader';

// exporting this so we can use it in paginationField set up for deleting cache when a product is deleted
const Pagination = ({ page }) => {
  const { error, loading, data } = useQuery(PRODUCT_NUMBER_QUERY);
  // TODO go over all of these and create loader and messaging and error
  if (loading) return <Loader />;
  if (error) return <p>Error... {error}</p>;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(+count / +perPage);
  return (
    <>
      <Head>
        {/* now the tab will say exactly what's in the title instead of just something random */}
        <title>
          Hello Tutorials | Page {page} of {pageCount}
        </title>
      </Head>
      <StyledContainer>
        <Link href={`/products/${page - 1}`}>
          <StyledA
            className="back"
            disabled={page <= 1}
            aria-disabled={page <= 1}
          >
            back
          </StyledA>
        </Link>
        <p className="page">
          Page {page} of {pageCount} ({count} items total)
        </p>
        <Link href={`/products/${page + 1}`}>
          <StyledA
            className="next"
            disabled={page >= pageCount}
            aria-disabled={page >= pageCount}
          >
            next
          </StyledA>
        </Link>
      </StyledContainer>
    </>
  );
};

export default Pagination;

const StyledA = styled.a`
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  ${(props) =>
    props.disabled &&
    css`
      color: gray;
      pointer-events: none;
    `}
  &:hover,
  &:focus {
    border: 0;
    text-decoration: none;
  }
  &:hover::after,
  &:focus::after {
    text-decoration: none;
    content: '';
    border-bottom: 2px solid var(--Primary);
    position: absolute;
    width: 20%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;
const StyledContainer = styled.section`
  color: var(--PrimaryDark);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: 'back page next';
  align-items: center;
  text-align: center;
  .back {
    grid-area: back;
  }
  .next {
    grid-area: next;
  }
  p {
    grid-area: page;
    @media (max-width: 380px) {
      display: none;
    }
  }
  @media (max-width: 615px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'page page'
      'back next';
  }
`;
