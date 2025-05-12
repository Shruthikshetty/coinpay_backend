// to get date after a certain years default 5
export const dateAfterYears = (years = 5) => {
  const now = new Date();
  const futureDate = new Date();
  futureDate.setFullYear(now.getFullYear() + years);
  return futureDate.toISOString();
};
