import styled from 'styled-components';
import { TextInputErrorMessage } from 'Shared/Elements/TextInput';
import { StyledFlexContainerAlignCenter } from 'Shared/SharedStyles.styled';

export const StyledDialogContent = styled.div`
  width: 95rem;
  max-height: 80vh;
  padding: 0 2rem;

  & ${TextInputErrorMessage} {
    margin-bottom: 0;
  }
`;
export const StyledAssigneeField = styled(StyledFlexContainerAlignCenter)``;
export const StyledAssigneeLabel = styled.p`
  font-size: 1.6rem;
  margin-left: 1.2rem;
`;
