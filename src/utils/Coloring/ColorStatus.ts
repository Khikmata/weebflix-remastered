import { IData } from '../../types/FetchTypes';

export const ColorStatus = (item: string) => {
  if (item === 'Онгоинг') {
    return '#79F9F9';
  }
  if (item === 'Вышло') {
    return '#ABE96E';
  }
  if (item === 'Еще не вышло') {
    return '#F97979';
  }
  return '#F0F0F0';
};
