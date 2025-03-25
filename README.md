## Homework. Topic 4. REST API

> Write a REST API to work with a collection of contacts. Use [Postman] to work with the REST API.

#### Specifications:

The REST API should support next routes:

GET /api/contacts

-   Calls the listContacts service function to work with the contacts.json file
-   Returns an array of all contacts in json format with status 200


GET /api/contacts/:id

-   Calls the getContactById service function to work with the contacts.json file
-   If the contact by id is found, returns a contact object in json format with status 200
-   If the contact by id is not found, returns a json of format {“message”: “Not found"} with status 404


DELETE /api/contacts/:id

-   Calls the removeContact service function to work with the contacts.json file
-   If the contact by id is found and deleted, returns the deleted contact object in json format with status 200
-   If the contact by id is not found, returns a json of format {“message”: “Not found"} with status 404

POST /api/contacts

-   Gets the body in json format with the fields {name, email, phone}. All fields are required - for validation, create a schema in the contactsSchemas.js file (located in the schemas folder) using the joi package
-   If the body does not contain any required fields (or the passed fields have an invalid value), returns a json of the format {“message”: error.message} (where error.message is a meaningful message with the essence of the error) with status 400
-   If the body is valid, calls the addContact service function to work with the contacts.json file, passing it data from the body
-   As a result of the function, it returns a newly created object with the fields {id, name, email, phone} and status 201