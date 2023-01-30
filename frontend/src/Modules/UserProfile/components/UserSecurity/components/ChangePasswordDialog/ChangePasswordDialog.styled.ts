import styled from 'styled-components';
import { TextInput } from 'Shared/Elements/TextInput';
import { StyledFlexColumnContainerAlignCenter } from 'Shared/SharedStyles.styled';

export const StyledInputContainer = styled(StyledFlexColumnContainerAlignCenter)`
  & ${TextInput} {
    width: 80%;
    margin-bottom: 1rem;

    &:first-child {
      margin-top: 1rem;
    }
  }
`;
