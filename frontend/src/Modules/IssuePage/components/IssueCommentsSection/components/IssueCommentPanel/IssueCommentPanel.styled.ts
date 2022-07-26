import styled from 'styled-components';
import { Form } from 'Shared/Elements/Form';
import { StyledLinkButton } from 'Shared/Elements/Buttons/ButtonLikeLink/ButtonLikeLink.styled';
import {
  StyledFlexColumnContainer,
  StyledFlexContainerAlignCenter,
  StyledFlexContainerSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledCommentWrapper = styled(StyledFlexColumnContainer)`
  font-size: 1.6rem;
  padding: 0.3rem 1rem;

  & ${Form} {
    margin-top: 0.4rem;
  }

  & > ${StyledFlexColumnContainer} {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
  }

  & ${StyledLinkButton} {
    margin-top: 0.4rem;
  }
`;

export const StyledSingleCommentWrapper = styled(StyledFlexColumnContainer)`
  background-color: ${(props) => props.theme.surfaceSecondary};
  padding: 1rem;
  border-radius: 0.3rem;
`;

export const StyledCommentHeadingRow = styled(StyledFlexContainerSpaceBetween)`
  margin-bottom: 1rem;
`;

export const StyledCommentContent = styled.div`
  margin-bottom: 1rem;

  & ol,
  & ul {
    margin-left: 1.6rem;
  }
`;

export const StyledUserField = styled(StyledFlexContainerAlignCenter)`
  & > p {
    margin-left: 1rem;
  }
`;
