import styled from 'styled-components';
import { StyledLink } from '../StyledLink';
import {
  StyledFlexColumnContainer,
  StyledFlexContainer,
  StyledFlexContainerAlignCenterSpaceBetween
} from '../SharedStyles.styled';

interface WrapperProps {
  readonly alignItems?: string;
  readonly justifyContent?: string;
}

export const HorizontalPageWrapper = styled(StyledFlexContainer)<WrapperProps>`
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'center')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'center')};
  padding: 2rem;
`;

export const VerticalPageWrapper = styled(HorizontalPageWrapper)`
  flex-direction: column;
`;

export const StyledHorizontalContainer = styled(StyledFlexContainer)`
  width: 100%;
  margin-top: 1.6rem;
  justify-content: space-evenly;
`;

export const StyledVerticalContainer = styled(StyledFlexColumnContainer)`
  width: 100%;
  margin-top: 1.6rem;
`;

export const StyledSectionContainer = styled(StyledFlexColumnContainer)`
  width: 48%;
  height: max-content;

  &,
  & > div {
    border-radius: 0.3rem;
  }
`;

export const StyledSectionHeaderRow = styled(StyledFlexContainerAlignCenterSpaceBetween)`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  height: 4rem;
  border-bottom: 1px solid ${(props) => props.theme.primary};
`;

export const StyledSectionWrapper = styled(StyledFlexColumnContainer)`
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
