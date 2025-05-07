export interface baseConfigType {
    driver: Storage
    isClearByGet?: boolean
}

export interface storageConfigType<DATA> extends baseConfigType {
    defaultValue?: DATA
}
