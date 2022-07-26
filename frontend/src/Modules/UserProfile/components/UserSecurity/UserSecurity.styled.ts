import styled from 'styled-components';
import {
  StyledFlexColumnContainerAlignCenter,
  StyledFlexContainerAlignCenterSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledSecurityContainer = styled(StyledFlexColumnContainerAlignCenter)`
  width: 100%;
  height: max-content;
  padding: 2rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};

  & h6 {
    align-self: start;
    margin-bottom: 2rem;
  }
`;

export const StyledHorizontalField = styled(StyledFlexContainerAlignCenterSpaceBetween)`
  font-size: 1.6rem;
  width: 100%;
  padding: 1rem;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;
