import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  color: var(--PrimaryDark);
  width: 100%;
  margin-bottom: 2rem;
  h2 {
    margin: 0;
  }
  button {
    width: 80%;
    align-self: center;
  }
`;

export const StyledFieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;
export const StyledInput = styled.input`
  height: 4rem;
  padding: 0 1rem;
  margin-bottom: 2rem;
`;
