const fs = require('fs')

function removeAllDbs() {
    var dataPath = 'app/data'
    fs.readdir(dataPath, (err, files) =>  {
        if (err) throw err;
        files.forEach(fileName => {
            if (fileName.substr(-2) == 'db') {
                
                var pathToRemove = `${dataPath}/${fileName}`;
                console.log(`removing ${pathToRemove}`)
                fs.unlinkSync(`${dataPath}/${fileName}`)
            }
            //
        })
    })
}

removeAllDbs();