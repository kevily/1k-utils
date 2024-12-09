export function fileToBase64(file: Blob | File) {
    if (!file) {
        return Promise.reject('File resolution failed')
    }
    return new Promise<string>((resolve, reject) => {
        const reader = new globalThis.FileReader()
        reader.onload = () => {
            resolve(reader.result as string)
            reader.onerror = reader.onload = null
        }
        reader.onerror = () => {
            reader.abort()
            reject('File resolution failed')
            reader.onerror = reader.onload = null
        }
        reader.readAsDataURL(file)
    })
}

/**
 * @param data file base64
 * @param fileName file name
 * @returns Blob
 */
export function base64ToBlob(data: string, fileName: string): Blob {
    try {
        const arr = data.split(',')
        const mime = (arr?.[0]?.match(/:(.*?);/) || [])[1]
        const bstr = globalThis.atob(arr[1])
        let n = bstr.length
        const u8arr = new globalThis.Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        const blob: any = new globalThis.Blob([u8arr], { type: mime })
        blob.lastModifiedDate = new globalThis.Date()
        blob.name = fileName
        return blob
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function download(file: Blob | File | string, fileName = 'download') {
    if (file instanceof Blob) {
        file = await fileToBase64(file)
    }
    const link = document.createElement('a')
    link.href = file
    link.download = fileName
    link.click()
}
