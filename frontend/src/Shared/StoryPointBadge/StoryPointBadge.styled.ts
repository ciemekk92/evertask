import styled from 'styled-components';
import { StyledFlexContainerAllCenter } from 'Shared/SharedStyles.styled';

export const StyledBadge = styled(StyledFlexContainerAllCenter)`
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.textOnPrimary};
  height: 2.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 0.1rem 0.6rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
`;
