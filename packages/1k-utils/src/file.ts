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
 * @param dataurl file base64
 * @param fileName file name
 * @returns Blob
 */
export function base64ToBlob(dataurl: string, fileName: string): Blob {
    try {
        const arr = dataurl.split(',')
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
    } catch (error: any) {
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

export function loadImage(src: string) {
    return new Promise<HTMLImageElement>(res => {
        const image = new Image()
        image.src = src
        image.onload = () => {
            res(image)
        }
    })
}

export async function getImageData(src: string) {
    const image = await loadImage(src)
    const width = image.naturalWidth
    const height = image.naturalHeight
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx?.drawImage(image, 0, 0)
    return {
        data: ctx?.getImageData(0, 0, width, height),
        width,
        height
    }
}
