# Jamb
A command line javascript preprocessor for an amb-like function in javascript

# Installation
(you need to have node and npm to be installed)                   
npm install -g "@glubs9/jamb" (sudo needed on linux)                       

# Usage
to use the functions described later on you need to import them using the function,                 
const {[function names separated by commas]} = require("@glubs9/jamb");             
and then to allow for it to work properly, you need to compile your file with the jamb command line tool                
with this command "jamb [file_Name] [out_file_name]" and then you can run out_file with node like normal.                            

# basic explanation
This package attempts to describe a function (and some utility helper functions) akin to the classic amb function in scheme.                  
I would recommend an understanding of logic programming and amb before using this library but don't let me stop you!.                           
The way I have defined amb is that it takes two arguments, the first being the name of the variable and the second being an iterable.                      
The variable is then set to the first item in the iterator. The file then continue from there but if it fails (using the function fail()) the interpreter will restart from amb with the variable being set to the next item in the iterator. it then continues again in much the same fashion as before.                  
if the iterator runs out of items it then fails itself!                                      
I would recommend looking at test.js to see how this is used as a text explanation won't get you all the way there (note: test.js require("index.js") which is the amb function library local file, using jamb in your own code please require("@glubs9/jamb")).            
also importantly the amb call *MUST* end with a semi colon.                           

# other functions 
I have also attempted to define other functions that are helpful in coding with amb.                      
assert([bool]) takes a boolean and fails if that bools is false.                   
natural_numbers() is a generator that yields every natural number (useful for clp).        
range(low,high) is a generator that yields every integer between low (inclusive) and high (exclusive).                       
prefixes(array) is a generator that generates all the prefixes of the array passed to it (similar to prologs append).                
suffixes(array) is a generator that generates all the suffixes of the array passed to it (similar to prologs append).                     
permutations(array) is a (not yet working) generator that generates all the permutations of the array passed to it.                         

# important notes
amb works by inserting a closure from the call to the end of the scope. I am bad at programming so I defined the end of scope as when I find an unmatched curly bracket. This means amb won't work sometimes when you think it will. Importantly amb within a function does not retain it's ambigiousness once the function returns (it will return properly though don't worry). If you want this property to be retained, please pass a continuation to the function in order for it to work.                   
something really fun is that the assert function is logically pure and the amb function is not. This kinda half solves a problem with prolog in that logical purity is not enforced and logical purity and impurity is mixed without any complaining on the part of prolog. (this assume functional purity within assert).                                 
# examples
You can find examples of how this library can be used in test.js             
I am particularly fond of the map colouring and the prime finding algorithms (the prime finding algorithm is kinda like constraing logic programming and the map colouring algorithm is pretty elegant).          
