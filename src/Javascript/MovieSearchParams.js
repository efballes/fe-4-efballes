

const ALLOWED_TYPES = ["search", "browse"];
const [SEARCH, BROWSE] = ALLOWED_TYPES;
export default class MovieSearchParams {
    static ALLOWED_TYPES = ALLOWED_TYPES;
    static SEARCH = SEARCH;
    static BROWSE = BROWSE;
    constructor({type=SEARCH, phrase="", title="", year="", director="", genre=""}) {
        this.setType(type);
        this.setPhrase(phrase);
        this.setTitle(title);
        this.setYear(year);
        this.setDirector(director);
        this.setGenre(genre);
    }
    // taken from MovieSearchParams
    ensure_is_string(val) { return typeof val === "string"; }
    ensure_is_int(val) { return Number.isInteger(val); }
    ensure_is_number(val) { return this.ensure_is_int(val) || (this.ensure_is_string(val) && !Number.isNaN(parseInt(val))); }
    ensure_valid_string(val) { return this.ensure_is_string(val) && val.length > 0; }
    ensure_valid_number(val) { return this.ensure_is_number(val) && parseInt(val) > 0; }
    // I'm going to assume this always gets passed the right parameters
    getAllowedTypes() { return ALLOWED_TYPES; }
    setType(type = SEARCH) {
        if( typeof type === "string" && 
            MovieSearchParams.ALLOWED_TYPES.some(allowed => allowed === type.toLowerCase())) {
            this.type = type;
        } else { this.type = SEARCH; } 
    }
    setMainInput(value) {
        if(this.type === MovieSearchParams.SEARCH) { this.setTitle(value); }
        else { this.setPhrase(value); }
    }
    getMainInput() {
        if(this.type === MovieSearchParams.SEARCH) { return this.title; }
        else { return this.phrase; }
    }
    setPhrase(phrase = "") { this.phrase = phrase; }
    setTitle(title = "" ) { this.title = title; }
    setYear(year = "" ) { this.year = year; }
    setDirector(director = "") { this.director = director; }
    setGenre(genre = "") { this.genre = genre; }

    setter(field,value) {
        switch (field?.toLowerCase()) {
            case "phrase": this.ensure_valid_string(value) && this.setPhrase(value); break;
            case "title": this.ensure_valid_string(value) && this.setTitle(value); break;
            case "year": this.ensure_valid_number(value) && this.setYear(value); break;
            case "director": this.ensure_valid_string(value) && this.setDirector(value); break;
            case "genre": this.ensure_valid_string(value) && this.setGenre(value); break;
            case "clear": this.resetParams(); break;
            default: return false;
        }
    }
    resetParams() {
        this.setPhrase();
        this.setTitle();
        this.setYear();
        this.setDirector();
        this.setGenre();
    }

    getType() { return this.type; }
    getPhrase() { return this.phrase; }
    getTitle() { return this.title; }
    getYear() { return this.year; }
    getDirector() { return this.director; }
    getGenre() { return this.genre; }

    forForm() {
        return [
            { label: "Director", name: "director", type:"text", },
            { label: "Genre", name: "genre", type:"text", },
            { label: "Year", name: "year", type:"number", },
        ];
    }

    getParams() {
        if(this.type === BROWSE) { return { phrase: this.phrase }; }
        if (this.type === SEARCH) { return { title: this.title, year: this.year, director: this.director }; }
        return null;
    }
    getValidatedParams() {
        let params = this.getParams();
        if(params === null) { return null; }
        if( params.hasOwnProperty("phrase") && this.ensure_valid_string(params.phrase)) { return params; }
        else {
            let output = {};
            if(params.hasOwnProperty("title") && this.ensure_valid_string(params.title)) { output.title = params.title; }
            if(params.hasOwnProperty("year") && this.ensure_valid_number(params.year)) { output.year = parseInt(params.year); }
            if(params.hasOwnProperty("director") && this.ensure_valid_string(params.director)) { output.director = params.director; }
            if(params.hasOwnProperty("genre") && this.ensure_valid_string(params.genre)) { output.genre = params.genre; }
            return output;
        }
    }
}

const default_instance = new MovieSearchParams({}); 
export { default_instance, MovieSearchParams };