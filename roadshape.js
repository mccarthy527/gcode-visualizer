//var shell = require("mesh-viewer")()
var gc = require('interpret-gcode')
var sl = require("gcode-lines")
var fs = require("fs")

var data = fs.readFileSync("flowexperiment.gcode")
var fileContent = data.toString()
var states = gc(fileContent)
var paths = sl(states)
classifyPaths(paths)
testMesh = segments2mesh(paths.lines)


//testMesh.positions = 


//console.log(testMesh.positions)
//console.log(Object.prototype.toString.call(testMesh.positions))

var positions = [[0, 0], [1, 0], [0, 1]]
var cells = [ [0,1], [1,2]]
console.log(positions)
console.log(Object.prototype.toString.call(positions))

myMesh = {
		positions: [[0, 0], [1, 0], [0, 1]],
		cells: [ [0,1], [1,2]],
		pointSize: 16
    }

	console.log(testMesh)
console.log(myMesh)
	
	
function segments2mesh(lines)	//note: removes 'undefined' entries so could mess up indexing!
{

	var pts = []
	for(var i = 0; i < lines.length; i++)
	{
		if(lines[i] != undefined)
		{
			pts = pts.concat(lines[i]);
		}	
	}
	
	
	var allMoves = []
	for(var i=0; i<pts.length/2; i++)
	{
		allMoves[i] = [2*i, 2*i+1]
	}
	
	return {
		positions: pts,
		cells: allMoves,
		pointSize: 16
    }
}

function classifyPaths(paths)
{	
	paths.width = []
	paths.height =[]
	for(var i = 0; i < paths.extruded.length; i++)
	{
		if(paths.lines[i] != undefined && paths.extruded[i] > 0)
		{
			//paths.lines[i];
		}	
	}
}


