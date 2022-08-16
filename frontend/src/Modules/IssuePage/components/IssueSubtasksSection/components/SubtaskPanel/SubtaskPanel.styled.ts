import styled from 'styled-components';
import { StyledFlexContainerAlignCenter } from 'Shared/SharedStyles.styled';

export const StyledPanelContainer = styled(StyledFlexContainerAlignCenter)`
  background-color: ${(props) => props.theme.surfaceSecondary};
  color: ${(props) => props.theme.primaryText};
  border-radius: 0.3rem;
  padding: 0.6rem 1rem;
  transition: all 0.4s ease;
  cursor: pointer;

  & > div,
  & > span {
    margin-right: 0.6rem;
    cursor: pointer;
  }

  & > div:last-child {
    margin-right: 0;
    margin-left: auto;
  }

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    color: ${(props) => props.theme.textOnPrimary};
  }
`;

export const StyledIssueTitle = styled.p`
  font-size: 1.6rem;

  & strong {
    margin-right: 0.8rem;
  }
`;
