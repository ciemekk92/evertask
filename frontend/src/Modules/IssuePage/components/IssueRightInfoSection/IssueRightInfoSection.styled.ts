import styled from 'styled-components';
import { StyledFlexContainerAlignCenter, StyledTextEllipsis } from 'Shared/SharedStyles.styled';

export const StyledUserContainer = styled(StyledFlexContainerAlignCenter)`
  width: 60%;
  padding: 0.5rem;
  border-radius: 0.3rem;
`;

export const StyledAssigneeContainer = styled(StyledUserContainer)`
  & > span {
    margin-left: auto;
    cursor: pointer;
  }
`;

export const StyledUserName = styled.p`
  margin-left: 1rem;
  ${StyledTextEllipsis};
`;
