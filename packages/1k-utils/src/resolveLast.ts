const tasks: Record<string, number> = {}

export async function resolveLast<Func extends (...args: any) => Promise<any>>(
    key: string,
    func: Func
) {
    const index = (tasks[key] ?? -1) + 1
    tasks[key] = index
    const result = {
        isLast: false,
        result: void 0 as Awaited<ReturnType<Func>> | undefined,
        error: void 0 as string | undefined,
        isPending: true
    }
    try {
        result.result = await func()
    } catch (e: any) {
        result.error = e.message
    }
    result.isLast = tasks[key] === index
    if (result.isLast) {
        result.isPending = false
        delete tasks[key]
    }
    return result
}
