export class TodoModel {
    id? : number;
    title : string;
    description : string;
    finished : boolean;

    constructor(title:string, description:string, finished:boolean){
        this.title = title;
        this.description = title;
        this.finished = finished;
    }
}