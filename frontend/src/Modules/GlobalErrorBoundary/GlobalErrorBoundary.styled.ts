import styled from 'styled-components';
import { StyledFlexColumnContainerAllCenter } from 'Shared/SharedStyles.styled';

export const BoundaryWrapper = styled(StyledFlexColumnContainerAllCenter)`
  text-align: center;
  width: 60rem;
  margin: 10rem auto 0;
  padding: 5rem 0;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.primaryTransparent};
  transition: all 0.4s ease;

  & p {
    font-size: 1.4rem;
  }
`;
