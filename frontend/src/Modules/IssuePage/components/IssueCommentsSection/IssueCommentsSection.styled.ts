import styled from 'styled-components';
import { StyledSectionWrapper } from 'Shared/PageWrappers';
import { StyledEditorWrapper } from 'Shared/WysiwygEditor/WysiwygEditor.styled';

export const StyledCommentsSectionWrapper = styled(StyledSectionWrapper)`
  & ${StyledEditorWrapper} {
    margin-bottom: 1rem;
  }
`;
