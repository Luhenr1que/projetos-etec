const MONTHS = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
function getSignIndex(day, month) {
  const m = MONTHS.indexOf(month), d = Number(day);
  const lengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (m < 0 || !Number.isInteger(d) || d < 1 || d > lengths[m]) return null;
  const starts = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const before = [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  return d < starts[m] ? before[m] : (before[m] + 1) % 12;
}
module.exports = { getSignIndex };
