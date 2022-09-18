export default function createPipeAsyncFunc(...tasks: Array<(arg: never) => any>) {
    return (arg: unknown) => {
        return tasks.reduce((prev, next) => prev.then(next), Promise.resolve(arg))
    }
}
