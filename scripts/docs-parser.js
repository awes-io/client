import { parser } from '@vuese/parser'
import { Render } from '@vuese/markdown-render'
import fs from 'fs'
import path from 'path'
import { paramCase, capitalCase } from 'change-case'

const dirPathUi = path.dirname(path.resolve(__dirname)) + '/packages/ui/'
const dirPathComponents = dirPathUi + 'components/'
const dirPathDocs = dirPathUi + 'docs/'

try {
    if (fs.existsSync(dirPathComponents + 'index.js')) {
        //file exists
        console.log('File exists')
    }
} catch (err) {
    console.error(err)
    return
}

fs.readFile(dirPathComponents + 'index.js', 'utf8', function(err, content) {
    console.log(content)
    const matchAll = Array.from(content.matchAll(/\/Aw(.+?)\.vue/gim))
    matchAll.forEach(function(match) {
        const file = match[0].replace('/', '')
        const name = file.replace('.vue', '')
        // Do something with the file.
        // Read vue file content
        const source = fs.readFileSync(dirPathComponents + file, 'utf-8')

        // Parse and get the result using the parser function
        try {
            const parserRes = parser(source)

            const nameParamCase = paramCase(name)

            const docFilename = nameParamCase + '.md'

            const r = new Render(parserRes)
            // Basic rendering, the return value is an object
            const renderRes = r.render()
            // Render full markdown text, return value is markdown string

            if (fs.existsSync(dirPathDocs + docFilename)) {
                // file exists - read, parse, kill, radio
                const renderRes = r.render()

                fs.readFile(dirPathDocs + docFilename, 'utf8', function(
                    err,
                    content
                ) {
                    const typeArray = Object.keys(renderRes)
                    var index = typeArray.indexOf('mixIns')
                    if (index !== -1) typeArray.splice(index, 1)

                    typeArray.forEach(function(type) {
                        const currentHtmlCommentRE = new RegExp(
                            `<!--\\s*@vuese:(${
                                name ? name : '\\[name\\]'
                            }):(${type}):start\\s*-->[^]*<!--\\s*@vuese:\\1:\\2:end\\s*-->`
                        )

                        if (!currentHtmlCommentRE.test(content)) {
                            // do something here
                            content += `
## ${capitalCase(type)}
<!-- @vuese:${name}:${type}:start -->
${renderRes[type]}
<!-- @vuese:${name}:${type}:end -->

                            `
                        }

                        content = content.replace(
                            currentHtmlCommentRE,
                            (s, c1, c2) => {
                                if (renderRes[type]) {
                                    let code = `<!-- @vuese:${c1}:${c2}:start -->\n`
                                    code += renderRes[type]
                                    code += `\n<!-- @vuese:${c1}:${c2}:end -->\n`
                                    return code
                                }
                                return s
                            }
                        )
                    })

                    // update file
                    fs.writeFile(dirPathDocs + docFilename, content, function(
                        err
                    ) {
                        if (err) {
                            return console.log(err)
                        }
                        console.log(
                            '[Docs] The file (' + docFilename + ') was updated!'
                        )
                    })
                })

                return true
            }
            const markdownRes = r.renderMarkdown()

            // file doesn't exist - create file with default content
            fs.writeFile(
                dirPathDocs + docFilename,
                markdownRes.content,
                function(err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log('The file (' + docFilename + ') was saved!')
                }
            )
        } catch (e) {
            console.error(e)
        }
    })
})
