import styled from 'styled-components';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';

export const HeaderBody = styled.nav`
  width: 100%;
  height: 5rem;
  padding: 1rem;
  background-color: ${(props) => props.theme.surface};
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  z-index: 1200;

  & img {
    height: 4rem;
    margin-top: 0.5rem;
  }
`;

export const LoginContainer = styled(StyledFlexContainer)`
  margin-left: auto;
`;
