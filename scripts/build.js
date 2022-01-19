const { GulpTaskEngine, babel, ts, clear } = require('1k-tasks')

const task = new GulpTaskEngine()

;['esm', 'cjs'].forEach(format => {
    task.setConfig({
        outputDir: format
    })
    task.registry(`clear-${format}`, clear, {
        paths: [`./${format}`]
    })
    task.registry(`babel-${format}`, babel, {
        format,
        plugins: [
            [
                'import',
                {
                    libraryName: 'lodash',
                    libraryDirectory: '',
                    camel2DashComponentName: false
                },
                'lodash'
            ]
        ]
    })
    task.registry(`ts-${format}`, ts, {
        genJs: false
    })
})

task.run({
    sync: true
})
