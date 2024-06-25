const getInvestment = (months: number, investment: any) => {
  const monthlyTotal = Math.abs(investment.amount) + investment.add * months;
  return monthlyTotal * getMonthlyPercent(investment.percent, months);
};
const getPayment = (months: number, investment: any) => {
  return -(investment.amount * months);
};
const getDebt = (months: number, investment: any) => {
  let total = 0;
  for (let m = 0; m < months; m++) {
    const monthlyTotal = Math.max(0, investment.amount - investment.add * m);
    total += monthlyTotal * (investment.percent / 12 / 100);
  }
  return -total;
};

const investmentFunctions = {
  investment: getInvestment,
  payment: getPayment,
  debt: getDebt,
};

const getMonthlyPercent = (percent: number, months: number) =>
  Math.pow(1 + percent / 100 / 12, months) - 1;

const caulcuateInvestment = (months: number, investment: any) => {
  return investmentFunctions[
    investment.type as keyof typeof investmentFunctions
  ](months, investment);
};

export { caulcuateInvestment, getMonthlyPercent };
