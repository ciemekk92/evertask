import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { toolbarConfig } from './fixtures';
import { UserModel } from 'Models/UserModel';
import { StyledEditorWrapper } from './WysiwygEditor.styled';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

interface Props {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export const WysiwygEditor = ({ initialValue, onChange }: Props): JSX.Element => {
  const [editorState, setEditorState] = React.useState<EditorState>(EditorState.createEmpty());

  React.useEffect(() => {
    if (!initialValue) {
      return;
    }
    const contentBlock = htmlToDraft(initialValue);

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const stateWithContent = EditorState.createWithContent(contentState);

      setEditorState(stateWithContent);
    }
  }, [initialValue]);

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);

    if (onChange) {
      const html = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));

      onChange(html);
    }
  };

  return (
    <StyledEditorWrapper>
      <Editor
        toolbar={toolbarConfig}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        locale={UserModel.currentUserValue.userSettings.interfaceLanguage.toLowerCase()}
      />
    </StyledEditorWrapper>
  );
};
