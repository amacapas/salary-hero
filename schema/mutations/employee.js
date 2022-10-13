import { db } from "../../connect.js";
import { GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } from "graphql";
import { EmployeeType, EmployeeInput } from "../types.js";

const employeeMutations = {
  addEmployee: {
    type: EmployeeType,
    args: {
      companyid: { type: GraphQLID },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      jobtitle: { type: GraphQLString },
      salary: { type: GraphQLFloat },
      addedby: { type: GraphQLID },
    },
    async resolve(parent, args) {
      const sql = `INSERT INTO employees (companyid, firstname, lastname, jobtitle, salary, addedby) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const params = [...Object.values(args)];

      try {
        const res = await db.one(sql, params);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
  updateEmployee: {
    type: EmployeeType,
    args: {
      id: { type: GraphQLID },
      companyid: { type: GraphQLID },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      jobtitle: { type: GraphQLString },
      salary: { type: GraphQLFloat },
      addedby: { type: GraphQLID },
    },
    async resolve(parent, args) {
      const sql = `UPDATE employees SET firstname = $3, lastname = $4, jobtitle = $5, salary = $6 WHERE id = $1 AND companyid = $2 AND addedby = $7 RETURNING *`;
      const params = [...Object.values(args)];

      try {
        const res = await db.one(sql, params);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
  deleteEmployee: {
    type: EmployeeType,
    args: {
      id: { type: GraphQLID },
      companyid: { type: GraphQLID },
      addedby: { type: GraphQLID },
    },
    async resolve(parent, args) {
      const sql = `DELETE FROM employees WHERE id = $1 AND companyid = $2 AND addedby = $3 RETURNING *`;
      const params = [...Object.values(args)];

      try {
        const res = await db.one(sql, params);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
  importEmployees: {
    type: new GraphQLList(EmployeeType),
    args: {
      addedby: { type: GraphQLID },
      companyid: { type: GraphQLID },
      employees: { type: new GraphQLList(EmployeeInput) },
    },
    async resolve(parent, args) {
      const data = JSON.parse(JSON.stringify(args.employees));

      let values = [];
      for (const el of data) {
        values.push(
          `(${args.companyid}, '${el.firstname}', '${el.lastname}', '${el.jobtitle}', ${el.salary}, ${args.addedby})`
        );
      }

      const fields = values.join(", ");

      const sql = `INSERT INTO employees (companyid, firstname, lastname, jobtitle, salary, addedby) VALUES ${fields} RETURNING *`;

      try {
        const res = await db.many(sql);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
};

export default employeeMutations;
