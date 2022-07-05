import styled from 'styled-components';

export const StyledColumnHeader = styled.div`
  margin-bottom: 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.primary};
`;

export const StyledColumnContainer = styled.div`
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};
  min-height: 82vh;
  width: 100%;
`;

export const StyledDroppableWrapper = styled.div`
  height: 100%;
`;
