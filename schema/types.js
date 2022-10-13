import {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
} from "graphql";

const CompanyType = new GraphQLObjectType({
  name: "Company",
  description: "Company Schema",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    about: { type: GraphQLString },
    address: { type: GraphQLString },
    created: { type: GraphQLString },
  },
});

// Admin Schema
const AdminType = new GraphQLObjectType({
  name: "Admin",
  description: "Admin Schema",
  fields: {
    id: { type: GraphQLID },
    companyid: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    emailadd: { type: GraphQLString },
    created: { type: GraphQLString },
  },
});

// Employee Schema
const employeeSchema = {
  id: { type: GraphQLID },
  companyid: { type: GraphQLString },
  firstname: { type: GraphQLString },
  lastname: { type: GraphQLString },
  jobtitle: { type: GraphQLString },
  salary: { type: GraphQLFloat },
  addedby: { type: GraphQLID },
  created: { type: GraphQLString },
  updated: { type: GraphQLString },
};

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  description: "Employee Schema",
  fields: { ...employeeSchema },
});

const EmployeeInput = new GraphQLInputObjectType({
  name: "EmployeeInput",
  description: "Employee Input",
  fields: { ...employeeSchema },
});

// Transactions Schema
const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  description: "Transaction Schema",
  fields: {
    id: { type: GraphQLID },
    employeeid: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    account: { type: GraphQLInt },
    bankname: { type: GraphQLString },
    created: { type: GraphQLString },
  },
});

export { CompanyType, AdminType, EmployeeType, EmployeeInput, TransactionType };
