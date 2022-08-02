import styled from 'styled-components';
import {
  StyledFlexColumnContainer,
  StyledFlexColumnContainerAllCenter,
  StyledFlexContainer
} from 'Shared/SharedStyles.styled';

export const StyledPageWrapper = styled(StyledFlexColumnContainerAllCenter)`
  width: 100%;
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

export const StyledHorizontalContainer = styled(StyledFlexContainer)`
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

export const StyledFormContainer = styled(StyledFlexColumnContainer)`
  width: 50%;

  & form {
    width: 100%;

    & button {
      display: block;
      margin-left: auto;
    }
  }
`;

export const StyledInvitationsContainer = styled(StyledFlexColumnContainer)`
  width: 50%;

  & > p {
    font-size: 1.6rem;
  }
`;
