const {amb, assert, fail, natural_numbers, prefixes, permutations} = require("./index.js");
//simple test file for amb
//add more to it later

//basic amb iteration testing
amb(i2, [1,2,3,4,5]);
console.log(i2);
if (i2 != 4) {
	fail();
}

amb(i, [false, true]);
if (i) { console.log("amb succeeded"); }
else {fail();}

//scope handling testing

//note: this is a good example of the scope problems with my implementation
	//as the amb dies once the scope of the function ends (it exists on the call stack) you
	//cannot return it and expect the same behaviour, once the scope dies, the
	//non-determinism is locked
	//to hold the scope (thanks to no tail call optimization) you can just use continuation
	//passing style and all is well
//note: this also works as a demonstration on how to add a yield to amb
//note: this is an overcomplicated way of handling this but you know
function amb_range(low, high, c) {
	var test_func = function* (){
		for (let n = low; n < high; n++) {
			yield n;
		}
	}
	amb(n, test_func());
	c(n);
	if (n != high-1) {fail();}
}

amb_range(1,11,console.log); //should print 1 .. 10 to the console

//final testing
//this bit of code is the amb practice thing in rosetta code.

//using n1 and n2 as argument names to show that the scope works properly
function test(n1,n2) {
	if (n1[n1.length-1] == n2[0]){return;}
	fail();
}

amb(n1,["the", "that", "a"]);
amb(n2,["frog","elephant","thing"]);
test(n1,n2);
amb(n3,["walked","treaded","grows"]);
test(n2,n3);
amb(n4,["slowly","quickly"]);
test(n3,n4);
console.log([n1,n2,n3,n4]);

//example of more logic programming esque problem solving
//(very very slow)

function is_prime(n) {
	for (var i = 2; i < n; i++) {
		if (n % i == 0) {
			return false;
		}
	}
	return true;
}

amb(num, natural_numbers());

assert(num > 370261); //(this number is chosen cause there is a big gap between it and the next biggest)
assert(is_prime(num));

console.log("num is " + num); //num is now the smallest prime number above 370261

amb(list, prefixes([1,2,3,4,5]));

console.log("next is list" + list);
if (list.length != 5) {fail();}

function sorted(arr) {
	for (let n = 0; n < arr.length - 1; n++) {
		if (arr[n] > arr[n+1]) { return false; }
	}
	return true;
}

//used to demonstrate the power of logic programming
	//but it is very slow and memory is bad
function slow_sort(arr) {
	amb(test_arr, permutations(arr));
	console.log("this is test_arr " + test_arr);
	assert(sorted(test_arr));
	return test_arr;
}

// console.log(slow_sort([5,1,4,3,29])); //(doesn't work cause permutations doesnt work)


/*
4 colour graph colouring attempt
problem taken from this page https://www.metalevel.at/prolog/optimization

the graph is defined as (bidirectional adjacency list)
a -> {b,c,d,f}
b -> {c,d}
c -> {d,e]
d -> {e, f}
e -> {f}
f -> {}

*/

const colours = ["red", "green", "blue", "yellow"];

amb(a, colours);
amb(b, colours);
amb(c, colours);
amb(d, colours);
amb(e, colours);
amb(f, colours);

let adj = [
	[a, [b,c,d,f]],
	[b, [c,d]],
	[c, [d,e]],
	[d, [e,f]],
	[e, [f]]
];

for (const n of adj) {
	assert(!(n[1].includes(n[0])));
}

//printing is probably not the most cleanest
//it also works! (the same solution as prolog finds!)
console.log("a is " + a);
console.log("b is " + b);
console.log("c is " + c);
console.log("d is " + d);
console.log("e is " + e);
console.log("f is " + f);
