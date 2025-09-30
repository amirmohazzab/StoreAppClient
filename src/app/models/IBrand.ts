export interface IBrand {
    id: number,
    created?: Date,
    createdBy?: string,
    lastModified?: Date,
    lastModifiedBy?: string,
    title: string,
    description?: string,
    isActive?: boolean,
    isDelete?: boolean,
    summary?: string,
}