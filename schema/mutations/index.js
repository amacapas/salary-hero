import adminMutations from "./admin.js";
import companyMutations from "./company.js";
import employeeMutations from "./employee.js";
import transactionMutations from "./transactions.js";

export default {
  ...adminMutations,
  ...companyMutations,
  ...employeeMutations,
  ...transactionMutations,
};
