import styled from 'styled-components';
import { StyledLink } from '../StyledLink';

interface WrapperProps {
  readonly alignItems?: string;
}

export const VerticalPageWrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  padding: 2rem;
`;

export const HorizontalPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

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
  height: max-content;

  &,
  & > div {
    border-radius: 0.3rem;
  }
`;

export const StyledSectionHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  height: 4rem;
  border-bottom: 1px solid ${(props) => props.theme.primary};
`;

export const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.surface};
  padding: 1.6rem;

  & ${StyledLink} {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  & h6 {
    padding-bottom: 0.6rem;
  }

  & > p {
    font-size: 1.6rem;
    padding: 1rem;
  }
`;
