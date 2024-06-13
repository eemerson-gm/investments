const getInvestment = (months: number, investment: any) => {
  const additions = investment.add * months;
  return (
    (investment.amount + additions) *
      Math.pow(1 + investment.percent / 100 / 12, months) -
    (investment.amount + additions)
  );
};

const getSalary = (months: number, investment: any) => {
  return investment.amount * months;
};

const getPayment = (months: number, investment: any) => {
  return -(investment.amount * months);
};

const investmentFunctions = {
  investment: getInvestment,
  salary: getSalary,
  payment: getPayment,
};

const caulcuateInvestment = (months: number, investment: any) => {
  console.log(investment);
  return investmentFunctions[
    investment.type as keyof typeof investmentFunctions
  ](months, investment);
};

export { caulcuateInvestment };
