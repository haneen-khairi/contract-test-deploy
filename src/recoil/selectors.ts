import { selector } from 'recoil';
import { errorsState } from './atoms';

export const hasErrorsSelector = selector<boolean>({
  key: 'hasErrorsSelector',
  get: ({ get }) => {
    const errors = get(errorsState);
    return Object.values(errors).some((value) => value === true);
  },
});
