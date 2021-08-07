import styled from 'styled-components';
import PropTypes from 'prop-types';

const Dot = styled.div`
  background: var(--Primary);
  color: var(--OnMidground);
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const CartTally = ({ count }) => (
  <>
    <Dot>{count}</Dot>
  </>
);

export default CartTally;

CartTally.propTypes = {
  count: PropTypes.number,
};
