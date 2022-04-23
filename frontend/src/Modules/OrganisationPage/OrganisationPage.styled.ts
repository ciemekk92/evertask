import styled from 'styled-components';

export const StyledHorizontalContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.6rem;
  justify-content: space-evenly;
`;

export const StyledSectionContainer = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.surface};
  padding: 1.6rem;
  height: max-content;

  &,
  & > div {
    border-radius: 0.3rem;
  }
`;
