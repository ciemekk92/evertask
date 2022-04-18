import styled from 'styled-components';

export const StyledHorizontalContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.6rem;
`;

export const StyledSectionContainer = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.surface};
  padding: 1.6rem;

  &,
  & > div {
    border-radius: 0.3rem;
  }
`;

export const StyledInfoField = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.surfaceSecondary};

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  & > div {
    font-size: 1.8rem;
  }
`;

export const StyledInfoLabel = styled.div`
  font-weight: bold;
  margin-right: 1rem;
`;

export const StyledInfoContent = styled.div``;
