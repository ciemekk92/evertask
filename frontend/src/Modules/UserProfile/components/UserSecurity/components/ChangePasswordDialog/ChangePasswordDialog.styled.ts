import styled from 'styled-components';
import { TextInput } from 'Shared/Elements/TextInput';
import { StyledFlexContainerAlignCenterSpaceBetween } from 'Shared/SharedStyles.styled';

export const StyledInputContainer = styled(StyledFlexContainerAlignCenterSpaceBetween)`
  & ${TextInput} {
    width: 80%;
    margin-bottom: 1rem;

    &:first-child {
      margin-top: 1rem;
    }
  }
`;
