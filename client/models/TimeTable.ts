export interface TimesByDay {
    Mo: Array<string>,
    Tu: Array<string>,
    We: Array<string>,
    Th: Array<string>,
    Fr: Array<string>,
    Sa: Array<string>,
    Su: Array<string>,
}

type TimeTable = TimesByDay & {
    _id: string,
    [unit: string]: string|Array<string>
}



export default TimeTable;