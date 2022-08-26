import styled from 'styled-components';
import { StyledVerticalContainer } from 'Shared/PageWrappers';
import { StyledInputContainer } from 'Shared/Elements/SearchInput/SearchInput.styled';
import { StyledButton } from 'Shared/Elements/Buttons/IconButton/IconButton.styled';
import { StyledFlexContainerAllCenter } from 'Shared/SharedStyles.styled';

export const StyledBacklogContainer = styled(StyledVerticalContainer)``;

export const StyledSearchContainer = styled(StyledFlexContainerAllCenter)`
  margin-bottom: 2rem;

  & ${StyledInputContainer} {
    width: 80%;
  }

  & ${StyledButton} {
    margin-right: 2rem;
  }
`;
