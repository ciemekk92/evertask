import * as Yup from 'yup';
import { START_END_SPRINT_DIALOG_MODES } from '../fixtures';
import { TFunction } from 'react-i18next';

export const getValidationSchema = (
  mode: START_END_SPRINT_DIALOG_MODES,
  t: TFunction<'translation'>
) => {
  if (mode === START_END_SPRINT_DIALOG_MODES.START) {
    return Yup.object().shape({
      startDate: Yup.date().required(t('sprintDialog.validation.startDate.required')),
      finishDate: Yup.date()
        .min(Yup.ref('startDate'), t('sprintDialog.validation.finishDate.min'))
        .required(t('sprintDialog.validation.finishDate.required')),
      sprintId: Yup.string().nullable()
    });
  } else {
    return Yup.object().shape({
      finishDate: Yup.date().required(t('sprintDialog.validation.finishDate.required')),
      sprintId: Yup.string(),
      sprintIdToMoveTo: Yup.string().nullable()
    });
  }
};
