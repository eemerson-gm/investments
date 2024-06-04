const getInvestment = (months: number, investment: any) => {
  return (
    investment.amount * Math.pow(1 + investment.percent / 100 / 12, months)
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
