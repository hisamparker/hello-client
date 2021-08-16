import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { perPage } from '../../config';
import { PRODUCT_NUMBER_QUERY } from '../../lib/api';

// exporting this so we can use it in paginationField set up for deleting cache when a product is deleted
const Pagination = ({ page }) => {
  const { error, loading, data } = useQuery(PRODUCT_NUMBER_QUERY);
  // TODO go over all of these and create loader and messaging and error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error... {error}</p>;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(+count / +perPage);
  return (
    <div>
      <Head>
        {/* now the tab will say exactly what's in the title instead of just something random */}
        <title>
          hello tutorials || Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <StyledA disabled={page <= 1} aria-disabled={page <= 1}>
          back
        </StyledA>
      </Link>
      <p>
        page {page} of {pageCount}
      </p>
      <p>{count} items in total</p>
      <Link href={`/products/${page + 1}`}>
        <StyledA disabled={page >= pageCount} aria-disabled={page >= pageCount}>
          next
        </StyledA>
      </Link>
    </div>
  );
};

export default Pagination;

const StyledA = styled.a`
  ${(props) =>
    props.disabled &&
    css`
      color: gray;
      pointer-events: none;
    `}
`;

Pagination.propTypes = {
  page: PropTypes.any,
};
