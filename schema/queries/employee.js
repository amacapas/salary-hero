import { db } from "../../connect.js";
import { GraphQLList, GraphQLID } from "graphql";
import { EmployeeType } from "../types.js";

const employeeQueries = {
  getEmployee: {
    type: EmployeeType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      const sql = `SELECT * FROM employees WHERE id=$1`;
      const params = [...Object.values(args)];

      try {
        const res = await db.one(sql, params);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
  getEmployees: {
    type: new GraphQLList(EmployeeType),
    async resolve(parent) {
      const sql = `SELECT * FROM employees`;

      try {
        const res = await db.many(sql, {});
        return res;
      } catch (err) {
        return err;
      }
    },
  },
};

export default employeeQueries;
