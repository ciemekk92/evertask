import styled from 'styled-components';
import { StyledFlexColumnContainerAlignCenter } from 'Shared/SharedStyles.styled';

export const StyledDialogContent = styled.div`
  width: 70rem;
`;

export const StyledMessageContainer = styled(StyledFlexColumnContainerAlignCenter)`
  & > p {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
  }
`;

export const StyledQrWarning = styled.p`
  color: ${(props) => props.theme.error};
`;
