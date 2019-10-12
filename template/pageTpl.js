const fs = require('fs');
const dirName = process.argv[2]
const upDirName = dirName.substring(0,1).toUpperCase() + dirName.substring(1)
const lowDirName = dirName.toLowerCase()

if(!upDirName || upDirName === '') {
	console.log('未命令文件名')
	process.exit(0)
}
// tsx 模板页
const pageTpl = `
import React from 'react'
import './scss'
type IProps = {

}
const ${upDirName}: React.FC<IProps> = (props) => {
	return (
		<div className="fx-page-${lowDirName}">
			我是${upDirName}页面
		</div>
	)
}

export default ${upDirName}
`

// scss模板页
const scssTpl = `
.fx-page-${lowDirName} {
	width: 100%;
}
`

// mobx store 模板页
const storeTpl = `
import { observable } from 'mobx'
class ${upDirName} {

}

export default new ${upDirName}()
`

fs.mkdirSync(`./src/pages/${upDirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync(`index.tsx`, pageTpl); //tsx
fs.writeFileSync(`index.scss`,scssTpl); // scss
fs.writeFileSync(`store.ts`, storeTpl); // store

process.exit(0);


