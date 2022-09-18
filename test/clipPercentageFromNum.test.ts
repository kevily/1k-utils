import clipPercentageFromNum from '../src/clipPercentageFromNum'

test('clipPercentageFromNum', () => {
    expect(clipPercentageFromNum(65, 5)).toEqual([20, 20, 20, 5, 0])
})
