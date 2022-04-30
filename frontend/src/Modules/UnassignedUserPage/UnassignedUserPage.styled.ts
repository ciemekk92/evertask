import styled from 'styled-components';

export const StyledPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;

  & h5 {
    text-align: center;
    margin-bottom: 2rem;
  }

  & > p {
    font-size: 1.6rem;
    text-align: center;
  }
`;

export const StyledHorizontalContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;

  & > div {
    padding: 3rem;
  }
  & h6 {
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid ${(props) => props.theme.primary};
  }
`;

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  & form {
    width: 100%;

    & button {
      display: block;
      margin-left: auto;
    }
  }
`;

export const StyledInvitationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  & > p {
    font-size: 1.6rem;
  }
`;
