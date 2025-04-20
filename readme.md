# APIs

All APIs for this backend

## Company

- Get all companies (GET: /party/company)
- Create company (POST: /party, body: {email1, email2, email3, phone1, phone2, phone3, nameFull, nameShort, address, type})
- Get Single Company (GET: /party/:id)

## Customer

- Get all customers (GET: /party/customer)
- Create customer (POST: /party, body: {email1, email2, email3, phone1, phone2, phone3, nameFull, nameShort, address, areaName, salesmanID, type})
- Get Single customer (GET: /party/:id)

## Salesman

- Get all salesman (GET: /party/salesman)
- Create salesman (POST: /party, body: {email1, email2, email3, phone1, phone2, phone3, nameFull, nameShort, address, type})
- Get Single salesman (GET: /party/:id)
- Get all salesman customers (GET: /:salesmanID/:customerID)

## Items

- Get all items (GET: /item)
- Create new item (POST: /item, body: {companyID, nameFull, nameShort, purchasePrice, salePrice, unitsInCarton})
- Get Single Item (GET: /item/:id)
- Update Item (PUT: /item/:id)

# Types

## Party

- CUSTOMER: 1
- SALESMAN: 2
- COMPANY: 3