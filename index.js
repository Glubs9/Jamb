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

module.exports = {
	amb, fail, assert}
