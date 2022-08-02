import styled from 'styled-components';
import { StyledFlexContainerSpaceBetween } from 'Shared/SharedStyles.styled';

export const LandingContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  margin-top: 10rem;
  text-align: center;
  background-color: ${(props) => props.theme.surface};
  color: inherit;
  border-radius: 0.5rem;
  box-shadow: 0.2rem 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
`;

export const ButtonsContainer = styled(StyledFlexContainerSpaceBetween)`
  width: 30rem;
  margin-top: 2rem;
`;
