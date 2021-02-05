const {amb, assert, fail} = require("./index.js");
//simple test file for amb
//add more to it later

//basic amb iteration testing
amb( [1,2,3,4,5], (i2) => {
console.log(i2);
if (i2 != 4) {
	fail();
}

amb( [false, true], (i) => {
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
	amb( test_func(), (n) => {
	c(n);
	if (n != high-1) {fail();}

});}

amb_range(1,11,console.log); //should print 1 .. 10 to the console

//final testing
//this bit of code is the amb practice thing in rosetta code.

//using n1 and n2 as argument names to show that the scope works properly
function test(n1,n2) {
	if (n1[n1.length-1] == n2[0]){return;}
	fail();
}

amb(["the", "that", "a"], (n1) => {
amb(["frog","elephant","thing"], (n2) => {
test(n1,n2);
amb(["walked","treaded","grows"], (n3) => {
test(n2,n3);
amb(["slowly","quickly"], (n4) => {
test(n3,n4);
console.log([n1,n2,n3,n4]);


function* gen() {
	for (var n = 2; true; n++) {
		yield n;
	}
}

amb( gen(), (num) => {

assert(num % 2 == 0);
assert(num % 5 == 0);
assert(num !== 5);
console.log(num);






});});});});});});});
