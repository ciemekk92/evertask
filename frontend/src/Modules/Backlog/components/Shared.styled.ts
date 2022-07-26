import styled from 'styled-components';
import { StyledFlexContainerAlignCenterSpaceBetween } from 'Shared/SharedStyles.styled';

export const StyledDroppableWrapper = styled.div`
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const StyledHeaderWrapper = styled(StyledFlexContainerAlignCenterSpaceBetween)`
  margin-bottom: 1rem;
`;
