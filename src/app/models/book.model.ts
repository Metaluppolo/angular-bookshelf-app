export class BookModel {
    constructor(
        public ISBN: number = 0,
        public title: string = "",
        public author: string = "",
        public plot: string = "",
        public plot_start: string = "",
        public plot_end: string = "",
        public cover_url: string = "",
        public readings_counter: number = 0,
        public isReccommended: string = "",
        public review: string = ""
    ){}
};