#### Contributing

## These commands will download and run the application

clone the repository

```
git clone https://github.com/freemasen/time.manager
```

Move into the newly created directory

```
cd time.manager
```

Install all of the dependencies
```
npm i
```

build the js files
```
webpack
```

#### alternatly
Build and start 3 watchers, 1 is for your ./app/ folder
any changes there will trigger webpack to compile the build
folder. The other two are for the ./styles/ folder, watching
for any changes to the theme sass files and re-compiling those
```
node ./watch.js
```

run the application

```
electron .
```


## File Structure

All angular files are included in the ./app folder. Each angular item 
is in its own folder with the filename of its types (i.e. component.ts, 
service.ts, template.html, style.css). 

The UI elements are all packaged via webpack, this results in the
index.html file in the project root and all packaged contents
in the ./build folder. 

sass and scss files live in the ./styles/ folder. More localized
files do still exist in each component forlder in a file called
styles.css

services and models are registered in ./app/models and ./app/services
for easier import statements

The Electron starting point is main.js. Any node modules are located in 
the ./src folder, with the electron windows in ./src/windows.

## Contribute

Feel free to open issues or create pull requests, I will do my best to respond to
any items posted here.