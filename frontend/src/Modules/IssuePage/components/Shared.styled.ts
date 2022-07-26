import styled from 'styled-components';
import { StyledFlexContainerAlignCenter, StyledTextEllipsis } from 'Shared/SharedStyles.styled';

export const StyledField = styled(StyledFlexContainerAlignCenter)`
  font-size: 1.6rem;
  padding: 1rem;
  width: 100%;
  height: 4rem;

  & > p {
    display: flex;
    align-items: center;

    & > span {
      margin-right: 1rem;
    }
  }

  & > a {
    &,
    &:visited,
    &:focus {
      color: ${(props) => props.theme.primaryText};
      ${StyledTextEllipsis};
    }
  }
`;

export const StyledFieldLabel = styled.strong`
  width: 50%;
  ${StyledTextEllipsis};
`;
