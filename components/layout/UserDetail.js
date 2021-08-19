import styled from 'styled-components';

const UserDetail = ({ user, classProp }) => {
  const { name, email } = user;
  if (!user) <div>Who are you?</div>;
  return (
    <StyledArticle className={classProp}>
      <h2>Account Info:</h2>
      <p>
        Hi {name}, the email we have on file for you is {email}!
      </p>
    </StyledArticle>
  );
};

const StyledArticle = styled.article`
  h2,
  p {
    margin: 0;
  }
`;

export default UserDetail;
