import styled from 'styled-components';
import {
  StyledFieldContainer,
  StyledFormLabel
} from 'Shared/Elements/Form/FormField/FormField.styled';
import { StyledReadonlyField, TextInput } from 'Shared/Elements/TextInput/TextInput.styled';
import { StyledButtonFilled } from 'Shared/Elements/Buttons/ButtonFilled/ButtonFilled.styled';
import {
  StyledFlexColumnContainer,
  StyledFlexContainer,
  StyledFlexContainerAlignCenterSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledUserInfoSettingsContainer = styled(StyledFlexColumnContainer)`
  width: 100%;
  padding: 2rem;
  background-color: ${(props) => props.theme.surface};
  height: max-content;
`;

export const StyledHeaderContainer = styled(StyledFlexContainerAlignCenterSpaceBetween)`
  margin-bottom: 1rem;
`;

export const StyledFormContainer = styled.div`
  & ${StyledFieldContainer} {
    padding: 0 1rem;
    width: 100%;

    & ${StyledFormLabel}, & ${TextInput}, & ${StyledReadonlyField} {
      width: 13rem;
      min-width: unset;
    }

    & ${TextInput}, & ${StyledReadonlyField} {
      width: 100%;
    }
  }
`;

export const StyledFooterContainer = styled(StyledFlexContainer)`
  justify-content: end;

  & ${StyledButtonFilled} {
    margin-right: 1rem;
  }
`;
