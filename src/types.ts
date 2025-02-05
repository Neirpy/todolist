export type Task = {
    id:number,
    content:string,
    createdAt: Date,
    completedAt?:Date,
    status:"todo"|"doing"|"done"
}