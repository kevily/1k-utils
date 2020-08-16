interface cacheType {
    session?: Storage;
    local?: Storage;
}
declare type storageType = keyof cacheType;
declare class Storage {
    private storage;
    constructor(type: storageType);
    get(key: string): any;
    set(key: string, val: any, before?: (oldVal: any, newVal: any) => any): any;
    remove(key: string): any;
}
export default function (type: storageType): Storage;
export {};
