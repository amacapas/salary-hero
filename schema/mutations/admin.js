import { db } from "../../connect.js";
import { GraphQLID, GraphQLString } from "graphql";
import { AdminType } from "../types.js";

const adminMutations = {
  addAdmin: {
    type: AdminType,
    args: {
      companyid: { type: GraphQLID },
      firstname: { type: GraphQLString },
      lastname: { type: GraphQLString },
      emailadd: { type: GraphQLString },
    },
    async resolve(parent, args) {
      const sql = `INSERT INTO admins (companyid, firstname, lastname, emailadd) VALUES ($1, $2, $3, $3) RETURNING companyid, firstname, lastname, emailadd`;
      const params = [...Object.values(args)];

      try {
        const res = await db.one(sql, params);
        return res;
      } catch (err) {
        return err;
      }
    },
  },
};

export default adminMutations;
