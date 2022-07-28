import styled from 'styled-components';

export const StyledEditorWrapper = styled.div`
  width: 100%;

  & .rdw-editor-wrapper {
    background: ${(props) => props.theme.surfaceSecondary};
    border-radius: 0.3rem;
    padding: 0 0.5rem;

    & .rdw-image-alignment-options-popup {
      width: revert;
      background: ${(props) => props.theme.surfaceTertiary};
      border: none;

      & .rdw-image-alignment-option {
        padding: 0.5rem;
      }
    }

    & .rdw-image-modal {
      width: 35rem;
      background: ${(props) => props.theme.surfaceTertiary};
      border: none;
      box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.4);

      & .rdw-image-modal-header,
      & .rdw-image-modal-size {
        display: none;
      }

      & .rdw-image-modal-btn-section {
        display: flex;
      }

      & .rdw-image-modal-btn {
        background-color: ${(props) => props.theme.primaryDark};
        border: none;
        font-size: 1.6rem;
        height: 3.2rem;
        min-width: 16rem;
        padding: 0 0.5rem;
        border-radius: 0.5rem;
        color: ${(props) => props.theme.textOnPrimary};
        box-shadow: 0 0.3rem 0.4rem rgba(0, 0, 0, 0.3);
        transition: all 0.4s ease;
        cursor: pointer;

        &:hover {
          background-color: ${(props) => props.theme.primary};
        }

        &:disabled {
          background-color: ${(props) => props.theme.disabled};
        }
      }
    }

    & .rdw-editor-toolbar {
      border: none;
      border-bottom: 1px solid #cc8a22;
      background: ${(props) => props.theme.surfaceSecondary};
    }

    & .rdw-option-wrapper {
      background: ${(props) => props.theme.surfaceTertiary};
      padding: 0.3rem;
      font-family: 'Font Awesome 6 Free', sans-serif;
      font-weight: 900;
      transition: all 0.4s ease;

      &,
      &:active,
      &:hover {
        border: none;
      }

      &:hover,
      &:active {
        box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.4);
        background-color: ${(props) => props.theme.primary};
        color: ${(props) => props.theme.textOnPrimary};
      }

      & > img {
        display: none;
      }

      &[title='Bold']::after,
      &[title='Pogrubienie']::after {
        content: '\\F032';
      }

      &[title='Italic']::after,
      &[title='Kursywa']::after {
        content: '\\F033';
      }

      &[title='Underline']::after,
      &[title='Podkreślenie']::after {
        content: '\\F0CD';
      }

      &[title='Strikethrough']::after,
      &[title='Przekreślenie']::after {
        content: '\\F0CC';
      }

      &[title='Unordered']::after,
      &[title='Lista nieuporządkowana']::after {
        content: '\\F0CA';
      }

      &[title='Ordered']::after,
      &[title='Lista uporządkowana']::after {
        content: '\\F0CB';
      }

      &[title='Left']::after,
      &[title='Do lewej']::after {
        content: '\\F036';
      }

      &[title='Center']::after,
      &[title='Do środka']::after {
        content: '\\F037';
      }

      &[title='Right']::after,
      &[title='Do prawej']::after {
        content: '\\F038';
      }

      &[title='Justify']::after,
      &[title='Wyjustuj']::after {
        content: '\\F039';
      }

      &[title='Image']::after,
      &[title='Obrazek']::after {
        content: '\\F03E';
      }
    }

    & .rdw-option-active {
      box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.4);
      background-color: ${(props) => props.theme.primary};
    }

    & .rdw-editor-main {
      height: 25rem;
      padding: 1rem;
      font-size: 1.6rem;

      & .DraftEditor-editorContainer {
        height: revert;
      }
    }

    & .rdw-dropdown-selectedtext {
      &:hover {
        background: ${(props) => props.theme.primary};
        color: ${(props) => props.theme.textOnPrimary};
      }
    }

    & .rdw-dropdown-wrapper {
      background: ${(props) => props.theme.surfaceTertiary};
      border: none;
      height: 26px;
      transition: all 0.4s ease;

      &:hover {
        box-shadow: revert;
      }

      & .rdw-dropdown-carettoclose,
      & .rdw-dropdown-carettoopen {
        top: 40%;
        border-top-color: ${(props) => props.theme.primaryText};
      }

      & .rdw-dropdown-optionwrapper {
        overflow-y: unset;
        border: none;
        box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.4);
        width: 99%;

        & li {
          transition: all 0.4s ease;
        }

        & .rdw-dropdownoption-default {
          background-color: ${(props) => props.theme.surfaceTertiary};
        }

        & .rdw-dropdownoption-highlighted {
          background-color: ${(props) => props.theme.primary};
          color: ${(props) => props.theme.textOnPrimary};
        }
      }
    }
  }
`;
