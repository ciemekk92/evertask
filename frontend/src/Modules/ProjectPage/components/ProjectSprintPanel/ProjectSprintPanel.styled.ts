import styled from 'styled-components';

export const StyledSprintPanel = styled.div`
  display: flex;
  padding: 0.4rem 1.2rem;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 0.3rem;
  font-size: 1.6rem;
  transition: all 0.4s ease;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.textOnPrimary};
    transform: translateY(-0.2rem);
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const StyledDateLabel = styled.p`
  margin-left: auto;
  margin-right: 1rem;
  font-size: 1.3rem;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  & > a {
    margin: unset !important;
  }

  & > button:last-child {
    margin-left: 0.6rem;
  }

  & > button:first-child {
    margin-right: 0.6rem;
  }
`;
