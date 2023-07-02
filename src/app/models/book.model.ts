export class BookModel {
    constructor(
        public ISBN: number = 0,
        public title: string = "",
        public author: string = "",
        public plot: string = "",
        public plot_start: string = "",
        public plot_end: string = "",
        public cover_url: string = "",
        public pages: number = 0,
        public bookmark_page: number = 0,
        public readings_counter: number = 0,
        public opinion: string = "",
        public review: string = ""
    ){}
};