import { db } from "../../connect.js";
import { GraphQLList, GraphQLID } from "graphql";
import { CompanyType } from "../types.js";

const companyQueries = {
  getCompany: {
    type: CompanyType,
    args: { id: { type: GraphQLID } },
    async resolve(parent, args) {
      const sql = `SELECT * FROM companies WHERE id=$1`;
      const params = [...Object.values(args)];

      try {
        const res = await db.one(sql, params);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
  getCompanies: {
    type: new GraphQLList(CompanyType),
    async resolve(parent) {
      const sql = `SELECT * FROM companies`;

      try {
        const res = await db.many(sql, {});
        return res;
      } catch (err) {
        return err;
      }
    },
  },
};

export default companyQueries;
