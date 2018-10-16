var _path = require('path');
module.exports =[{

    name : "bundle",
    entry : {

        main : "./index.js",
        main : "./resim.js",
        main : "./effect.js",

       
    },
    output : {
        path : _path.resolve("./"),
        filename : "bundle.js"
    }

}
]