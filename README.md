# Salary Hero

Basic implementation of a backend service according to the business requirements.

## Business Requirements

- Salary Hero can create/read/update/delete (CRUD) a company
- Salary Hero can add a client admin for a company
- A client admin can CRUD an employee for that company
- A client admin can import employees for that company
- An employee can request for a money transfer

## Technical Specifications

- GraphQL
- Express
- PostgreSQL
- Node.js

## Environment Setup

```
npm i
npm start
```

## Sample Queries - Company

```
mutation {
  addCompany(
    name: "Streich-Greenholt",
    about: "Triple-Buffered Regional Contingency",
    address: "600 Satterfield Avenue, Harberland, MT 17215"
  ) {
    name
    about
    address
    created
  }
}
```

```
query{
  getCompany(id: 1){
    name
    about
    address
  }
}
```

```
mutation {
  updateCompany(
    id: 9
    name: "Steuber and Sons",
    about: "Mandatory Needs-Based Middleware",
    address: "481 Maximillia Shores Apt. 799, Gislasonfurt, MN 43573"
  ) {
    name
    about
    address
    created
  }
}
```

```
mutation {
  deleteCompany(id: 8) {
    name
    about
    address
    created
  }
}
```

## Sample Queries - Employees

```
mutation {
  addEmployee(
    companyid: 6,
    firstname: "Araceli",
    lastname: "Johnston",
    jobtitle: "Tester",
    salary: 8500,
    addedby: 1
  ) {
    companyid,
    firstname,
    lastname,
    jobtitle,
    salary,
    addedby
  }
}
```

```
query {
  getEmployee(id:1) {
    companyid,
    firstname,
    lastname,
    jobtitle,
    salary,
    addedby
  }
}
```

```
mutation {
  updateEmployee(
    id: 4,
    companyid: 6,
    firstname: "Shaina ",
    lastname: "Berge",
    jobtitle: "Manager",
    salary: 15000,
    addedby: 1
  ) {
    companyid,
    firstname,
    lastname,
    jobtitle,
    salary,
    addedby
  }
}
```

```
mutation {
  deleteEmployee(
    id: 6,
    companyid: 6,
    addedby: 1
  ) {
    companyid,
    firstname,
    lastname,
    jobtitle,
    salary,
    addedby
  }
}
```

```
mutation {
  importEmployees(
    addedby: 1,
    companyid:1,
    employees: [
    {
      firstname: "Morris",
      lastname: "Smitham",
      jobtitle: "Supervisor",
      salary: 95000,
    },
    {
      firstname: "Leopoldo",
      lastname: "Schaden",
      jobtitle: "Tester II",
      salary: 85000,
    }])
  {
    firstname
    lastname
    jobtitle
    salary
  }
}
```
