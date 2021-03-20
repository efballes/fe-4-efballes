

// ! DEFAULT: ALLOWABLES ! //
export default class MovieFilters {
    static ALLOWED_LIMITS = ["10", "25", "50", "100"];
    static ALLOWED_ORDERBYS = ["title", "year", "rating"];
    static ALLOWED_DIRECTIONS = ["asc", "desc"];
    static DEFAULT_LIMIT = "10";
    static DEFAULT_OFFSET = "0";
    static DEFAULT_ORDERBY = "title";
    static DEFAULT_DIRECTION = "asc";

    constructor({
            limit = MovieFilters.DEFAULT_LIMIT,
            offset = MovieFilters.DEFAULT_OFFSET, 
            orderby = MovieFilters.DEFAULT_ORDERBY,
            direction = MovieFilters.DEFAULT_DIRECTION }) {
        this.setter("LIMIT", limit);
        this.setter("OFFSET", offset);
        this.setter("ORDERBY", orderby);
        this.setter("DIRECTION", direction);
    }

    getAllowedLimits() { return MovieFilters.ALLOWED_LIMITS; }
    getAllowedOrderbys() { return MovieFilters.ALLOWED_ORDERBYS; }
    getAllowedDirection() { return MovieFilters.ALLOWED_DIRECTIONS; }

    // ! I'm going to assume these always return a valid value
    getLimit() { return parseInt(this.limit); }
    getOffset() { return parseInt(this.offset); }
    getOrderby() { return this.orderby; }
    getDirection() { return this.direction; }

    getPageNum() { return Math.floor(this.getOffset() / this.getLimit()); }

    ensure_is_string(val) { return typeof val === "string"; }
    ensure_is_int(val) { return Number.isInteger(val); }
    ensure_is_number(val) { return this.ensure_is_int(val) || (this.ensure_is_string(val) && !Number.isNaN(parseInt(val))); }
    ensure_valid_string(val) { return this.ensure_is_string(val) && val.length > 0; }
    ensure_valid_number(val) { return this.ensure_is_number(val) && parseInt(val) >= 0; }

    check_limit(lim = MovieFilters.DEFAULT_LIMIT) {
        if(!this.ensure_valid_number(lim)) { return false; }
        return MovieFilters.ALLOWED_LIMITS.some((allowed) => (parseInt(allowed) === parseInt(lim)));
    }
    check_offset(offset = "0") {
        if(!this.ensure_valid_number(offset)) { return false; }
        return offset === MovieFilters.DEFAULT_OFFSET || (parseInt(offset) % parseInt(this.limit) === 0);
    }
    check_orderby(rating = MovieFilters.DEFAULT_ORDERBY) {
        if(!this.ensure_valid_string(rating)) { return false; }
        return MovieFilters.ALLOWED_ORDERBYS.some((allowed) => (rating.toLowerCase() === allowed));
    }
    check_direction(direction = MovieFilters.DEFAULT_DIRECTION) {
        if(!this.ensure_valid_string(direction)) { return false; }
        return MovieFilters.ALLOWED_DIRECTIONS.some((allowed) => (direction.toLowerCase() === allowed));
    };
    setter(field, value) {
        switch (field?.toLowerCase()) {
            case "limit": this.limit = this.check_limit(value) ? value: MovieFilters.DEFAULT_LIMIT; break;
            case "offset": this.offset = this.check_offset(value) ? value: MovieFilters.DEFAULT_OFFSET; break;
            case "orderby": this.orderby = this.check_orderby(value) ? value: MovieFilters.DEFAULT_ORDERBY; break;
            case "direction": this.direction = this.check_direction(value) ? value: MovieFilters.DEFAULT_DIRECTION; break;
            default: return false;
        }
    }
    getter(field) {
        switch (field?.toLowerCase()) {
            case "limit": return `${this.limit}`;
            case "offset": return `${this.offset}`;
            case "orderby": return `${this.orderby}`;
            case "direction": return `${this.direction}`;
            default: return null;
        }
    }
    updateOffset(operator) {
        let lim = this.getLimit();
        let current = this.getOffset();
        switch(operator) {
            case "-": lim *= -1; break;
            case "+": lim *= 1; break;
            default: lim *= 0;
        }
        this.setter("offset", current+lim);
    }
    resetParams() {
        const defaults = [
            { field:"limit", value: MovieFilters.DEFAULT_LIMIT },
            { field:"offset", value: MovieFilters.DEFAULT_OFFSET },
            { field:"orderby", value: MovieFilters.DEFAULT_ORDERBY },
            { field:"direction", value: MovieFilters.DEFAULT_DIRECTION },
        ] 
        defaults.forEach(({field, value}) => this.setter(field, value));
    }

    forForm() {
        return [
            { label: "limit", name:"Limit", options:this.getAllowedLimits().map(option=>({label:option, value:option})) },
            { label: "orderby", name:"Orderby", options:this.getAllowedOrderbys().map(option=>({label:option, value:option})) },
            { label: "direction", name:"Direction", options:this.getAllowedDirection().map(option=>({label:option, value:option})) },
        ];
    }
    getValidatedParams() {
        return { 
            limit: parseInt(this.limit),
            offset: parseInt(this.offset),
            orderby: this.orderby,
            direction: this.direction
        };
    }
}
const default_instance = new MovieFilters({}); 
export { default_instance, MovieFilters };