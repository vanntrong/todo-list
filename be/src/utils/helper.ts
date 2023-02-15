import { IUser } from '@/modules/users/users.interface';
import { omit } from 'lodash';

export const toUserResponse = (user: IUser) => {
  return omit(user, ['password', 'is_deleted']);
};
