import styled from 'styled-components';
import { StyledLinkButton } from 'Shared/Elements/Buttons/ButtonLikeLink/ButtonLikeLink.styled';
import { StyledSectionWrapper } from 'Shared/PageWrappers';
import { StyledEditorWrapper } from 'Shared/WysiwygEditor/WysiwygEditor.styled';

export const StyledCommentsSectionWrapper = styled(StyledSectionWrapper)`
  & ${StyledEditorWrapper} {
    margin-bottom: 1rem;
  }

  & ${StyledLinkButton} {
    margin-bottom: 0.8rem;
  }
`;
