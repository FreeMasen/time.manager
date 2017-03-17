# Time Manager

#### An electron application for managing todo's and billable client hours 


## Front End

#### Angular2 and Material2

``` yml 
    There are two main windows:
      - Taskbar window for quickly switching the user's current workflow 
      - Task Manager window for adding todo's and assigning them to the billable category
```

## Backend

#### Electron and NodeJs 6.10

```yml
    All components are located in the src folder:
        - data.js:
          - Abstraction of the Nedb interface to allow for function definition storage in Nedb
          - Limitted operations include insert, find, findOne, update, and delete
        - functionSerializer.js:
          - "static" class that will split a function into a storable object
          - the serialization calls the Function.prototype.toString() method and then parses the string and places elements into 3 JSON properties:
            - name: function signature
            - args: array of argument names
            - body: the function body not including the curly braces
```
## Shared

#### Writen in Typescript, _id property assigned by MongoDb

```yml 
    Models:
      - Work:
        - properties:
            - _id: string
            - start: Date
            - duration: number
        - computed properties:
      - Task:
        - properties:
            - _id: string
            - description: string
            - work: Work[]
            - category: Category
      - Category:
        - properties:
            - _id: string
            - name: string
            - client: Client
      - Client:
        - properties:
            - _id: string
            - name: string
            - active: boolean
      
```