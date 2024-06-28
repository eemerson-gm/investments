const getEarnedInvestment = (months: number, investment: any) => {
  const monthlyTotal = Math.abs(investment.amount) + investment.add * months;
  return monthlyTotal * getMonthlyPercent(investment.percent, months);
};
const getEarnedDebt = (months: number, investment: any) => {
  return -Array.from({ length: months }, (_, m) =>
    Math.max(0, investment.amount - investment.add * m)
  ).reduce(
    (total, monthlyTotal) =>
      total + monthlyTotal * (investment.percent / 12 / 100),
    0
  );
};
const getTotalInvestment = (months: number, investment: any) => {
  return getEarnedInvestment(months, investment) + investment.amount;
};
const getTotalDebt = (months: number, investment: any) => {
  return Math.min(
    getEarnedDebt(months, investment) -
      investment.amount +
      investment.add * months,
    0
  );
};

const earnedFunctions = {
  earned: {
    investment: getEarnedInvestment,
    debt: getEarnedDebt,
  },
  total: {
    investment: getTotalInvestment,
    debt: getTotalDebt,
  },
};

const getMonthlyPercent = (percent: number, months: number) =>
  Math.pow(1 + percent / 100 / 12, months) - 1;

const caulcuateInvestment = (
  months: number,
  investment: any,
  option: keyof typeof earnedFunctions
) => {
  return earnedFunctions[option][
    investment.type as keyof typeof earnedFunctions.earned
  ](months, investment);
};

export { caulcuateInvestment, getMonthlyPercent };
