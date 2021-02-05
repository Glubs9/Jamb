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
			} else {
				throw e;
			}
		}
	}

	throw AmbError;
}

function fail() {
	throw AmbError;
}

// Asert function must have a comparison
function assert(bool) {
	if (typeof(bool) != "boolean") {
                  throw new TypeError("Assert function must take a bool");
	} if (!bool) {
		fail();
	}
}

function* natural_numbers() {
	for (let n = 1; ;n++) {
		yield n;
	}
}

function* range(low, high) {
	for (let n = low; n < high; n++) {
		yield n;
	}
}

function* prefixes(arr) {
	for (let n = 0; n <= arr.length; n++) {
		yield arr.slice(0,n);
	}
}

function* suffixes(arr) {
	for (let n = 0; n < arr.length; n++) {
		yield arr.slice(n,arr.length+1); //might error
	}
}

function remove_at(arr, n) {
	if (n === arr.length -1) {return arr.slice(0,arr.length-1);}
	else {return arr.slice(0,n) + arr.slice(n,arr.length-1);}
}

//might be able to clean up this with higher order functions
//this is actually pretty fast
//but it doesn't work man i'm very mad
function* permutations(arr) {
	console.log("in permutations" + arr);
	if (arr.length == 1) {yield arr;}
	else {
		console.log("else");
		for (let n = 0; n < arr.length; n++) {
			console.log("in inital for loop");
			let tmp = remove_at(arr,n);
			console.log("tmp is now " + tmp);
			for (const i of permutations(tmp)) {
				console.log("in for of loop with " + i);
				yield [arr[n]] + i;
			}
		}
	}
}

module.exports = {AmbError, amb, fail, assert, natural_numbers, range, prefixes, suffixes, permutations};
