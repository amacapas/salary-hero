import { db } from "../../connect.js";
import { GraphQLID, GraphQLString, GraphQLInt, GraphQLFloat } from "graphql";
import { TransactionType } from "../types.js";

const transactionMutations = {
  moneyTransfer: {
    type: TransactionType,
    args: {
      employeeid: { type: GraphQLID },
      amount: { type: GraphQLFloat },
      account: { type: GraphQLInt },
      bankname: { type: GraphQLString },
    },
    async resolve(parent, args) {
      // get salary of current employee
      const sqlEmployee = `SELECT salary FROM employees WHERE id = ${args.employeeid}`;
      const resEmployee = await db.one(sqlEmployee);

      const { salary } = resEmployee;
      const half = salary / 2;

      // check if requested amount is not going to be over 50% of the salary
      let res = {
        employeeid: null,
        amount: null,
        account: null,
        bankname: null,
      };

      if (args.amount <= half) {
        const balance = salary - args.amount;
        const sqlUpdate = `UPDATE employees SET salary = ${balance} WHERE id = ${args.employeeid} RETURNING TRUE`;
        await db.one(sqlUpdate);

        const sql = `INSERT INTO transactions (employeeid, amount, account, bankname) VALUES ($1, $2, $3, $4) RETURNING *`;
        const params = [...Object.values(args)];
        res = await db.one(sql, params);
      }

      try {
        return res;
      } catch (err) {
        return err;
      }
    },
  },
};

export default transactionMutations;
