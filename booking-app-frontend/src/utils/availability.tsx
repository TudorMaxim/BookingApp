const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const hours = Array.from(Array(12).keys()).map((hour) => {
  let mapped = `${hour + 7}:00`;
  if (hour < 3) {
    mapped = `0${mapped}`;
  }
  return mapped;
});

const matrixInit = (): boolean[][] => {
  const matrix: boolean[][] = [];
  for (let i = 0; i < hours.length; i += 1) {
    const line: boolean[] = [];
    for (let j = 0; j < days.length; j += 1) {
      line.push(false);
    }
    matrix.push(line);
  }
  return matrix;
};

const matrixCopy = (src?: boolean[][]): boolean[][] => {
  const matrix = matrixInit();
  if (!src) {
    return matrix;
  }
  for (let i = 0; i < src.length; i += 1) {
    for (let j = 0; j < src[i].length; j += 1) {
      matrix[i][j] = src[i][j];
    }
  }
  return matrix;
};

const matrixSet = (src: boolean[][], value: boolean, line: number, column: number): boolean[][] => {
  const matrix = matrixCopy(src);
  if (line >= 0 && line < hours.length && column >= 0 && column < days.length) {
    matrix[line][column] = value;
  }
  return matrix;
};

const getAvailability = (matrix?: boolean[][]): string => {
  if (!matrix) {
    return '';
  }
  let minHour = Infinity;
  let maxHour = -Infinity;
  let minDay = Infinity;
  let maxDay = -Infinity;
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      if (matrix[i][j] && i < minHour) {
        minHour = i;
      }
      if (matrix[i][j] && i > maxHour) {
        maxHour = i;
      }
      if (matrix[i][j] && j < minDay) {
        minDay = j;
      }
      if (matrix[i][j] && j > maxDay) {
        maxDay = j;
      }
    }
  }
  let availableDays = days[minDay];
  if (minDay !== maxDay) {
    availableDays += `-${days[maxDay]}`;
  }
  let availableHours = hours[minHour];
  if (minHour !== maxHour) {
    availableHours += `-${hours[maxHour]}`;
  }
  return `${availableDays}, ${availableHours}GMT`;
};

const availabilityUtils = {
  days,
  hours,
  matrixInit,
  matrixCopy,
  matrixSet,
  getAvailability,
};

export default availabilityUtils;
