/* eslint-disable react/prop-types */
import styled from 'styled-components';

const CartTally = ({ count }) => (
  <>
    <Dot>{count}</Dot>
  </>
);

const Dot = styled.section`
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

export default CartTally;
