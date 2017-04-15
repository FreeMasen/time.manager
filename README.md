# Time Manager

[![Build Status](https://travis-ci.org/FreeMasen/time.manager.svg?branch=master)](https://travis-ci.org/FreeMasen/time.manager)

#### An electron application for managing todo's and billable client hours 

![creating a new task](https://robertmasen.pizza/img/new%20task.gif)

![quick viewing task details](https://robertmasen.pizza/img/new%20task%202.gif)

#### Installing/Contributing
> note: this project is a work in progress, not all functionallity is complete

```
git clone https://github.com/freemasen/time.manager
cd time.manager
npm i
electron .
```

###### File Structure
All angular files are included in the ./app folder. Each angular item 
is in its own folder with the filename of its types (i.e. component.ts, 
service.ts, template.html, style.css). 

The UI elements are all packaged via webpack, this results in the
index.html file in the project root and all packaged contents
in the ./build folder. 

The Electron starting point is main.js. Any node modules are located in 
the ./src folder, with the electron windows in ./src/windows.

