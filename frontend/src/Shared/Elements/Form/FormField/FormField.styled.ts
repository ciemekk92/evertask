import styled from 'styled-components';

export const StyledFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  & input {
    margin-bottom: 0;
  }
`;

export const StyledValidationMessage = styled.p`
  color: ${(props) => props.theme.error};
  font-size: 1.7rem;
  margin: 0.5rem 0;
`;
