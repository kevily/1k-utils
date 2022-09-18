import createPipeAsyncFunc from '../src/createPipeAsyncFunc'

test('createPipeAsyncFunc', async () => {
    const pipeFunc = createPipeAsyncFunc(a => a + 1, async a => a + 1)
    const result = await pipeFunc(1)
    expect(result).toBe(3)
})
