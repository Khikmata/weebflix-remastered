export const ColorRating = (score: Float32Array) => {
  if (Number(score) > 8.8) {
    return '#79F9F9';
  }
  if (Number(score) <= 8.8 && Number(score) > 7) {
    return '#ABE96E';
  }
  if (Number(score) <= 7 && Number(score) > 5) {
    return '#F0F0F0';
  }
  if (Number(score) < 4 && Number(score) > 0) {
    return '#F97979';
  }
  return '#F0F0F0';
};
