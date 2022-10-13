import { db } from "../../connect.js";
import { GraphQLID, GraphQLString } from "graphql";
import { CompanyType } from "../types.js";

const companyMutations = {
  addCompany: {
    type: CompanyType,
    args: {
      name: { type: GraphQLString },
      about: { type: GraphQLString },
      address: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const sql = `INSERT INTO companies (name, about, address) VALUES ($1, $2, $3) RETURNING  *`;
      const params = [args.name, args.about, args.address];

      try {
        const res = await db.one(sql, params);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
  updateCompany: {
    type: CompanyType,
    args: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      about: { type: GraphQLString },
      address: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const sql = `UPDATE companies SET name = $2, about = $3, address = $4 WHERE id = $1 RETURNING *`;
      const params = [args.id, args.name, args.about, args.address];

      try {
        const res = await db.one(sql, params);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
  deleteCompany: {
    type: CompanyType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent, args) {
      const sql = `DELETE FROM companies WHERE id = $1 RETURNING  *`;
      const params = [args.id];

      try {
        const res = await db.one(sql, params);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
};

export default companyMutations;
