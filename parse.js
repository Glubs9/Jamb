#!/usr/bin/env node

function find_unmatched(string, pos) {
	var needed = 1;
	for (let n = pos; n < string.length; n++) {
		if (needed == 0) { return n-1; } //-1 as it needs to return the position of the match, not the position after it
		else if (string[n] == "{") {needed++;}
		else if (string[n] == "}") {needed--;}
	}
	return string.length - 1; //maybe not -1
}

//i should be able to combine find unmatched, find match and find amb into higher order function?
//(wait find_unmatched and find matched is identical save for the brackets, lmao that makes sense i guess)
function find_match(string, pos) {
	var needed = 1; //ignoring the first position
	for (let n = pos+1; n < string.length; n++) {
		if (needed == 0) {return n-1;} //-1 as it needs to retunr the position of hte match not the position after it
		else if (string[n] == "(") {needed++;}
		else if (string[n] == ")") {needed--;}
	}
	throw new Error("no matching bracket found");
}

//finds the next amb after position
//note: finds amb(
function find_amb(string, start_pos) {
	let test_str = "";
	for (let n = start_pos; n < string.length-4; n++) {
		test_str = string.slice(n,n+4);
		if (test_str == "amb(") {
			return n;
		}
	}
	return -1; //maybe not -1
}

//should be able to combine with find_amb
//this function strictly enforces the need for a semi colon at the end of the line
function find_semicolon(string, start_pos) {
	for (let n = start_pos; n < string.length; n++) {
		if (string[n] == ";") {return n; }
	}
	throw new Error("No semi colon found");
}

//this functions takes the string amb function call and sepeartes it into the first arg and second arg
//amb( should be the first four characters of the string for this function to work and ) should be
//the last character
//i would return tuples but have to return array cause javascript
function split_args(string) {
	//amb();
	for (let n = 0; n < string.length; n++) {
		if (string[n] == ",") {
			let var_name = string.slice(4,n);
			let iterator = string.slice(n+1,string.length-1);
			return [var_name,iterator];
		}
	}
	throw new Error("no comma found in amb call: " + string);
}

//this function has come out to be quite ugly
function parse_amb(data) {
	let search_pos = 0;
	let not_ended = true;
	while (true) {
		let amb_pos = find_amb(data,search_pos);
		if (amb_pos == -1) {break;} //no amb found
		let end_pos = find_match(data,amb_pos+4);
		let amb_call = data.slice(amb_pos,end_pos+1);
		let args = split_args(amb_call);
		let var_name = args[0];
		let iterator = args[1];
		//should be using a template literal i thikn
		let new_call = "amb(" + iterator + ", (" + var_name + ") => {";
		//might be able to use string.replace here instead

		let end_of_scope = find_unmatched(data, amb_pos+5);
		let semicolon_pos = find_semicolon(data, end_pos);

		data = data.slice(0,amb_pos) + new_call + data.slice(semicolon_pos+1,end_of_scope) + "\n});" + data.slice(end_of_scope,data.length); //adds new amb to string

		search_pos = amb_pos + 4; //skips this amb call and searches for more ambs
	}
	return data;
}

const amb_functions = `
//this string is added to the top of any file that uses amb (i could do something fancy with
//modules and the like but tbh i can't be bothered this is just easier

const AmbError = new Error("AmbError");

//this function is a bit hacky and i'm not too proud of it
function amb(iterable, closure) {
	let it = iterable[Symbol.iterator]();

	for (const n of it) {
		try {
			return closure(n); //just in case the closure is a function that returns
		} catch (e) {
			if (e == AmbError) {
				continue;
			}
		}
	}

	throw AmbError;
}

function fail() {
	throw AmbError;
}

function assert(pred) {
	if (!(pred())) {
		fail();
	}
}

`;

function main() {
	const fs = require('fs');

	if (process.argv.length != 4) {throw new Error("jamb requires 2 arguments");}
	let file_name = process.argv[2];
	let out_file_name = process.argv[3];

	let data = fs.readFileSync(file_name, "utf8");
	//fs.writeFileSync(out_file_name, amb_functions);
	fs.writeFileSync(out_file_name, parse_amb(data)); //change to appendfilesync if uncomment prev line

}

main();
