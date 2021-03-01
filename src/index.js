process.chdir(__dirname)
const { fork } = require('child_process')
const fs = require('fs')
const path = require('path')

/* **************************************************************************************************** *\
Functions
\* **************************************************************************************************** */
/**
 * Lists the files in a directory.
 * @param {string} dir The directory that you want to get a list of files from.
 * @param {string} filter The file type you want to get. IE: `js`
 * @return {Array<string>} Returns all the file names.
 */
const listFiles = (dir, filter) => {
  const files = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isFile())
  if (filter) {
    return files.filter(file => file.endsWith(`.${filter}`))
  } else {
    return files
  }
}

listFiles('./compilers').forEach(c => {
  fork(`./compilers/${c}`)
})
