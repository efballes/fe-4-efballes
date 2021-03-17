import React, { createContext, useState, useContext } from "react";
import {SearchModeOptions as searchModeClass, default_instance as options } from "../Javascript/SearchModeOptions";
import movie_services from "../services/Movies";
import default_movies from "../Javascript/default_movies.json";
import * as SecureStore from "expo-secure-store";

const SessionContext = createContext(null);
export const SessionProvider = ({ children }) => {
	async function save(key, value) {
		await SecureStore.setItemAsync(key, value);
	}
	
	function getValueFor(key) {
		SecureStore.getItemAsync(key)
			.then(result => {
				if (result) {
					console.log("🔐 Here's your value 🔐 \n" + result);
					return result;
				} else {
					console.log(`No values stored under key: ${key}`);
					return null;
				}
			})
			.catch(error =>{
				console.log("Error! Something wrong happened");
				console.log(error);
				return null;
			})
	}

	const [logged_in, logged_in_setter] = useState(getValueFor("logged_in")||"true");

	const [email, emailSetter] = useState(getValueFor("email") || "");
	const [password, passwordSetter] = useState(getValueFor("password") || "");
	const [session_id, session_id_setter] = useState(getValueFor("session_id") || "");
	const [transaction_id, transaction_id_setter] = useState(getValueFor("transaction_id") || "");

	// default_instance of searchOptions has value set to basic
	const [ searchMode, setSearchMode ] = useState(searchModeClass.BASIC);
    options.setSetterFunc(setSearchMode);

	// movies
	const [ movies, setMovies ] = useState(default_movies);
	const [ movie, setMovie ] = useState(null);

	const setters = {
		logged_in: logged_in_setter,
		email: emailSetter,
		password: passwordSetter,
		session_id: session_id_setter,
		transaction_id: transaction_id_setter
	};

	const set = (header, newValue) => {
		setters[header](newValue);
		save(header, newValue);
	}
	const unset_all = () => ( Object.keys(setters).forEach(key => set(key,null)) );

	const logout = () => {
		setters["session_id"](null);
		setters["logged_in"](null);
		SecureStore.deleteItemAsync("session_id");
		SecureStore.deleteItemAsync("logged_in");
	}
	
	const handleError = (error) => { alert(error); }

	const handle_movies_response = (request_type, response) => {
		if(request_type === "get"){
			if(	!response || response.resultCode !== 210) { setMovie(null); } 
			else { setMovie(response?.movie); }
		} else {
			if(response?.resultCode !== 210) { handleError(response?.message); }
			else { setMovies(options.processMovieList(response?.movies)); }
		}
	}

	const movies_request = ({request_type, param}) => {
		if(!request_type || !param) { handleError("Invalid Request"); }
		movie_services[request_type]( { email, session_id }, param)
            .then(response => handle_movies_response(request_type, response?.data))
            .catch(error => handleError(request_type, error));
	}

	const value = {
		email: { value: email, setter: (newVal) => set("email", newVal), },
		session: { id: session_id, setter: (newVal) => set("session_id", newVal), }, 
		login_status: { status: logged_in, setter: (newVal) => set("logged_in", newVal), },
		search_options: options,
		movies: {
			list:movies,
			setter:setMovies
		},
		movie: {
			selected: movie,
			setter: setMovie
		},
		unsetter: unset_all,
		logout,
		movies_request,
	};

	return (
		<SessionContext.Provider value={value}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => {
	const { email, session, login_status, movies, movie, search_options, logout, unsetter, movies_request } = useContext(SessionContext);

	return { email, session, login_status, movies, movie, search_options, logout, unsetter, movies_request };
};
