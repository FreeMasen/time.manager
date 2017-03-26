# Time Manager

[![Build Status](https://travis-ci.org/FreeMasen/time.manager.svg?branch=master)](https://travis-ci.org/FreeMasen/time.manager)

#### An electron application for managing todo's and billable client hours 


## Front End

> Angular2 and Material2

###### Main windows

 - [ ] Taskbar window for quickly switching the user's current workflow 

 - [ ] Task Manager window for adding todo's and assigning them to the billable category

 - [ ] Category/Client manager window for adding/removing/modifying Categories and Clients

## Backend

> Electron and NodeJs 6.10


 - [ ] data.js:
  - Abstraction of the Nedb interface to allow for function definition storage in Nedb
  - Limitted operations include insert, find, findOne, update, and delete
 - [ ] functionSerializer.js:
  - "static" class that will split a function into a storable object
  - the serialization calls the Function.prototype.toString() method and then parses the string and places elements into 3 JSON properties:
    - name: function signature
    - args: array of argument names
    - body: the function body not including the curly braces

## Models

> Writen in Typescript, _id property assigned by Nedb

- Task:
  - properties:
      - _id: string (Nedb assigned)
      - objective: string (actual task description)
      - notes: string[] (any notes about the task)
      - work: Work[] (time spent working on this task)
  - computed properties
    - get completed(): string (returns the date completed as a string or "Not yet complete")
    - isComplete(): boolean (returns if the task is complete or not)
  - methods
    - complete(): void (sets the completion date)
    - uncomplete(): void (removes the completion date)
  - TODO:
    - define the Client/Category relationship
    - define method for returning total time of all work
- Work:
  - properties:
      - _id: string (Nedb assigned)
      - start: Date (start date and time)
      - duration: number (number of minutes spent working)
- Category:
  - properties:
      - _id: string (Nedb assigned)
      - name: string (category name)
      - tasks: Task[] (list of all task in this category)
      - isQuickCategory: boolean (if displayed on the quick choice menu)
  - computed properties
  - methods
  - TODO
    - implement a method for getting the total of work per day
- [ ] Client:
  - properties:
      - _id: string
      - name: string
      - categories: Category[] (list of categories for this client)
      - isQuickClient: boolean (if this client should appear in the quick client menu)
  - computed properties
  - methods
  - TODO
    - implement a method for getting a total of work per category per day