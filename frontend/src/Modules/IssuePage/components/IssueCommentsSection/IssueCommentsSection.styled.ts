import styled from 'styled-components';
import { StyledSectionWrapper } from 'Shared/PageWrappers';
import { StyledEditorWrapper } from 'Shared/WysiwygEditor/WysiwygEditor.styled';

export const StyledCommentsSectionWrapper = styled(StyledSectionWrapper)`
  & ${StyledEditorWrapper} {
    margin-bottom: 1rem;
  }
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-bottom: 1rem;
  padding: 0 1rem;

  & > button:first-child {
    margin-right: 1rem;
  }
`;
