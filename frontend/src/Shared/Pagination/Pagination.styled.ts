import styled from 'styled-components';
import {
  StyledFlexContainer,
  StyledFlexContainerAlignCenter,
  StyledFlexContainerAllCenter
} from '../SharedStyles.styled';

interface ButtonProps {
  readonly disabled?: boolean;
  readonly selected?: boolean;
}

export const StyledRow = styled(StyledFlexContainerAlignCenter)`
  width: 100%;
  margin-bottom: 2rem;
`;

export const StyledPaginationContainer = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  margin: 0 auto;
  width: 60rem;
  font-size: 2rem;
  background-color: ${(props) => props.theme.surfaceSecondary};
`;

export const StyledPaginationLabel = styled.div``;
export const StyledPaginationButtonsContainer = styled(StyledFlexContainer)`
  padding: 1rem;
  margin-left: 3rem;
`;

export const StyledPaginationButton = styled(StyledFlexContainerAllCenter)<ButtonProps>`
  width: 3rem;
  height: 3rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.primary};
  margin: 0 0.5rem;
  cursor: pointer;
`;

export const StyledArrowButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  margin-top: 0.4rem;
  cursor: pointer;

  &::before {
    position: relative;
    content: '';
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    border-right: 0.36rem solid ${(props) => props.theme.textOnPrimary};
    border-top: 0.36rem solid ${(props) => props.theme.textOnPrimary};
  }
`;

export const StyledPreviousButton = styled(StyledArrowButton)<ButtonProps>`
  transform: translateY(-0.35rem) rotate(-135deg);
`;

export const StyledNextButton = styled(StyledArrowButton)<ButtonProps>`
  transform: rotate(45deg);
`;

export const StyledDotsButton = styled.div``;
