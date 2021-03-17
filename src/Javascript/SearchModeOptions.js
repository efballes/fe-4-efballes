import {default_instance as searchFilter} from "../Javascript/MovieFilters";
import {MovieSearchParams, default_instance as searchParams} from "../Javascript/MovieSearchParams";


const ALLOWED_MODES = ["Basic", "Browse", "Advanced"];
const [ BASIC, BROWSE, ADVANCED] = ALLOWED_MODES; 
let basicSearchOptions = [
    { 
        value: BASIC, 
        label: BASIC, 
        placeholder: "Search By Title (eg. \"The Avengers\")", 
    },
    { 
        value: BROWSE, 
        label:BROWSE, 
        placeholder: "By Keywords (eg. \"sequel,alien invasion,based on comic\")", 
    },
    { 
        value: ADVANCED, 
        label:ADVANCED, 
        placeholder: "Search By Title (eg. \"The Avengers\")",  
    }
];

export default class SearchModeOptions {
    static ALLOWED_MODES = ALLOWED_MODES;
    static BASIC = BASIC; 
    static BROWSE = BROWSE;
    static ADVANCED = ADVANCED;
    constructor( {data = basicSearchOptions, value = SearchModeOptions.BASIC, setterFunc = null} ) {
        this.setData(data);
        this.setCurrentByValue(value);
        this.setSetterFunc(setterFunc);
        this._initSearchParams();
        this._initFilter();
    }
    // * getters
    getData() { return this.data; }
    getByValue(value) { return this.data?.find((item) => (item.value === value) ); }
    getCurrent() { return this.current; }
    getCurrentValue() { return this.current?.value; }
    getCurrentLabel() { return this.current?.label;  } 
    getCurrentPlaceholder() { return this.current?.placeholder; }
    getSearchParams() { return this.search_params; }
    getFilter() { return this.search_filter; }
    
    // * setters
    setData(data) { this.data = data ? data : basicSearchOptions; }
    setCurrentByValue(value=BASIC) { this.current = this.getByValue(value); }
    setSetterFunc(setterFunc) {  this.setterFunc = setterFunc; }
    updateOffset(operator) { this.search_filter?.updateOffset(operator); }
    _initSearchParams() {
        const current_mode = this.getCurrentValue();
        if(ALLOWED_MODES.some(mode => mode === current_mode)) {
            this.search_params = searchParams;
            if( current_mode === BROWSE) { this.search_params.setType(MovieSearchParams.BROWSE); }
        } else { this.search_params = null; }
    }
    _initFilter() { this.search_filter = searchFilter; }
    setSearchType() {
        let new_mode = this.getCurrentValue();
        if(!new_mode || !this.search_params) { return; }
        const old_type = this.search_params?.type;
        let new_type = null;
        if( new_mode === BROWSE) { new_type = MovieSearchParams.BROWSE; }
        else if([BASIC, ADVANCED].some(mode => mode === new_mode)) { new_type = MovieSearchParams.SEARCH; }
        if(old_type !== new_type) { this.search_params.setType(new_type); }
        this.search_params.resetParams();
        this.search_filter.resetParams();
    }
    setState(value) {
        this.setCurrentByValue(value);
        this.setterFunc(value);
        this.setSearchType();
    }
    getPayload() { return {...this.search_params?.getValidatedParams(), ...this.search_filter?.getValidatedParams()}; }
    _append_and_return_query_string(payload, query) {
        payload.hidden && query.append("hidden", payload.hidden);
        payload.limit && query.append("limit", payload.limit);
        payload.offset && query.append("offset", payload.offset);
        payload.orderby && query.append("orderby", payload.orderby);
        payload.direction && query.append("direction", payload.direction);
        return query.toString();
    }
    getQueryString() {
        const type = this.search_params?.getType();
        const payload = this.getPayload();
        let query = new URLSearchParams();
        if(type === MovieSearchParams.SEARCH) {
            payload.title && query.append("title", payload.title);
            payload.year && query.append("year", payload.year);
            payload.director && query.append("director", payload.director);
            payload.genre && query.append("genre", payload.genre);
            if( query.toString() === "" ) { return query.toString(); }
            return this._append_and_return_query_string(payload,query);
        } else if(type === MovieSearchParams.BROWSE && payload.phrase) {
            return payload.phrase + "/?" + this._append_and_return_query_string(payload, query);
        } else { return query.toString(); }
    }
    getRequest() {
        let request_type = this.search_params?.getType();
        let query_string = this.getQueryString();
        if( typeof query_string !== "string" || 
            query_string.length === 0 ||
            !this.search_params?.getAllowedTypes()?.some(
                type => (type === request_type)
            )
        ) { query_string = null; }
        return { request_type, param: query_string };
    }

    // ? MISC
    processMovieList(movie_list) {
        let offset = this.search_filter?.getOffset();
        return movie_list?.map((movie,i) => ({index:offset+i+1, ...movie}));
    }

    getLastIndexFromMovies(movie_list) {
        return movie_list[movie_list.length-1]?.index || -1;
    }
};
const default_instance = new SearchModeOptions({});
export  {
    default_instance, SearchModeOptions
};