import styled from 'styled-components';
import {
  StyledFlexColumnContainer,
  StyledFlexContainerAlignCenter,
  StyledFlexContainerSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledCommentWrapper = styled(StyledFlexColumnContainer)`
  font-size: 1.6rem;
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surfaceSecondary};

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const StyledCommentHeadingRow = styled(StyledFlexContainerSpaceBetween)`
  margin-bottom: 1rem;
`;

export const StyledUserField = styled(StyledFlexContainerAlignCenter)`
  & > p {
    margin-left: 1rem;
  }
`;
