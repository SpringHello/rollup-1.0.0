var fs = require('fs')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')


var banner = '/*!\n' +
    ' * app.js \n' +
    ' * (c) ' + new Date().getFullYear() + ' TCW\n' +
    ' * Released under the MIT License.\n' +
    ' */'

rollup.rollup({
    entry: 'src/entry.js',
    plugins:[
        babel()
    ]
}).then(function (bundle) {
    return write('dist/app.js',
        bundle.generate({
            format: 'cjs',
            banner: banner
        }).code)
})


function write(dist, code) {
    new Promise(function (resolve, reject) {
            fs.writeFile(dist, code, function (err) {
                if (err) return reject(err)
                console.log(blue('app.js')+' '+getSize(code))
                resolve()
            })
        }
    )
}

function getSize(code){
    return code.length/1024 + 'kb'
}
function blue(info){
    return '\x1b[1m\x1b[34m' + info + '\x1b[39m\x1b[22m'
}