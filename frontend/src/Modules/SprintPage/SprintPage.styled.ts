import styled from 'styled-components';
import { StyledSectionContainer } from 'Shared/PageWrappers';
import { StyledInfoField, StyledInfoLabel } from 'Shared/Elements/InfoField/InfoField.styled';

export const StyledSmallSectionContainer = styled(StyledSectionContainer)`
  width: 28%;

  ${StyledInfoField} {
    &:not(:last-child) {
      align-items: center;
    }
  }

  ${StyledInfoLabel} {
    width: 30%;
  }
`;

export const StyledLargeSectionContainer = styled(StyledSectionContainer)`
  width: 68%;
`;
