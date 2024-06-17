const getInvestment = (months: number, investment: any) => {
  const monthlyTotal = investment.amount + investment.add * months;
  return monthlyTotal * getMonthlyPercent(investment.percent, months);
};
const getPayment = (months: number, investment: any) => {
  return -(investment.amount * months);
};
// TODO: Fix loan option
const getLoan = (months: number, investment: any) => {
  const monthlyTotal = investment.amount - investment.add * months;
  return -(monthlyTotal * getMonthlyPercent(investment.percent, months));
};

const investmentFunctions = {
  investment: getInvestment,
  payment: getPayment,
  loan: getLoan,
};

const getMonthlyPercent = (percent: number, months: number) =>
  Math.pow(1 + percent / 100 / 12, months) - 1;

const caulcuateInvestment = (months: number, investment: any) => {
  return investmentFunctions[
    investment.type as keyof typeof investmentFunctions
  ](months, investment);
};

export { caulcuateInvestment, getMonthlyPercent };
