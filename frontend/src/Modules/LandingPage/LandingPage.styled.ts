import styled from 'styled-components';
import { StyledIcon } from 'Shared/Elements/Icons/Shared.styled';
import {
  StyledFlexColumnContainer,
  StyledFlexColumnContainerAllCenter,
  StyledFlexContainer,
  StyledFlexContainerSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledLandingContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3rem;
  margin-top: 1rem;
  text-align: start;
  background-color: ${(props) => props.theme.surface};
  color: inherit;
  border-radius: 0.5rem;
  box-shadow: 0.2rem 0.3rem 0.5rem rgba(0, 0, 0, 0.2);

  & > div {
    padding: 3rem;
    background-color: ${(props) => props.theme.surfaceSecondary};
    border-radius: 0.3rem;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
`;

export const StyledHeroContainer = styled(StyledFlexContainerSpaceBetween)``;

export const StyledHeadlineContainer = styled(StyledFlexColumnContainer)`
  width: 60%;

  & h1 {
    margin-bottom: 2rem;
  }
`;
export const StyledButtonsContainer = styled(StyledFlexColumnContainerAllCenter)`
  width: 35%;
  padding: 2rem;

  & button {
    width: 26rem;
    height: 4rem;
    font-size: 2.4rem;

    &:first-child {
      margin-bottom: 3rem;
    }
  }
`;

export const StyledFeaturesContainer = styled(StyledFlexColumnContainer)`
  & h4 {
    margin-bottom: 2rem;
  }
`;

export const StyledTilesContainer = styled(StyledFlexContainer)`
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledFeatureTile = styled(StyledFlexContainer)`
  font-size: 2rem;
  padding: 3rem 1rem;
  flex: 0 0 auto;
  width: 30%;

  & ${StyledIcon} {
    margin-right: 2.6rem;
  }
`;
