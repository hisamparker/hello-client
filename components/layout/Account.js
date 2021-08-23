import styled from 'styled-components';
import useUser from '../auth/User';
import OrdersWithMutation, { StyledModalContainer } from './OrdersWithMutation';
import UserDetail from './UserDetail';
import RequestReset from '../auth/RequestReset';
import MyTutorials from './MyTutorials';
import InfoModal from '../elements/InfoModal';

const Account = () => {
  const user = useUser();
  return !user ? (
    <StyledModalContainer>
      <InfoModal message="Hey, you don't have an account, why you here?" />
    </StyledModalContainer>
  ) : (
    <StyledContainer>
      <StyledTitle>Hello {user.name}!</StyledTitle>
      <UserDetail user={user} classProp="account" />
      <RequestReset classProp="password" />
      <MyTutorials classProp="tutorials">
        <h2>My Tutorials</h2>
      </MyTutorials>
      <OrdersWithMutation notPage classProp="orders" />
    </StyledContainer>
  );
};

const StyledTitle = styled.h1`
  color: var(--Primary);
  text-transform: capitalize;
  font-size: 5rem;
  margin-bottom: 0;
`;

const StyledContainer = styled.article`
  color: var(--PrimaryDark);
  display: grid;
  max-height: 100%;
  max-width: 95%;
  grid-gap: 4rem;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'title title'
    'account password'
    'tutorials tutorials'
    'orders orders';
  h1 {
    grid-area: title;
  }
  h2 {
    margin-top: 0;
  }
  .account {
    grid-area: account;
    max-width: 80vw;
  }
  .password {
    grid-area: password;
    max-width: 80vw;
  }
  .tutorials {
    grid-area: tutorials;
    max-width: 80vw;
    text-align: center;
  }
  .orders {
    grid-area: orders;
    max-width: 80vw;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'tutorials'
      'account'
      'password'
      'orders';
  }
`;

export default Account;
