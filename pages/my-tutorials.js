import styled from 'styled-components';
import MyTutorials from '../components/layout/MyTutorials';

const myTutorialsPage = () => (
  <StyledTutorialsContainer>
    <MyTutorials>
      <StyledTitle>My Tutorials</StyledTitle>
    </MyTutorials>
  </StyledTutorialsContainer>
);

const StyledTutorialsContainer = styled.section`
  width: 100%;
  display: grid;
  align-content: center;
  max-width: var(--MaxWidth);
`;
const StyledTitle = styled.h1`
  text-align: center;
  font-size: 5rem;
  color: var(--Primary);
  margin: 4rem;
  line-height: 1.25em;
`;
export default myTutorialsPage;
