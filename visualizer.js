var shell = require("mesh-viewer")()
var gc = require('gcode-parser')
var sl = require("gcode-lines")
var fs = require("fs")

var data = fs.readFileSync("test.gcode")
var fileContent = data.toString()
var states = gc(fileContent)
var paths = sl(states)
var mesh

shell.on("viewer-init", function() 
{
	shell.gl.lineWidth(5)
	
	console.log(paths)
	classifyPaths(paths)
	testMesh = segments2mesh(paths.lines)
	
	mesh = shell.createMesh(testMesh)
})

shell.on("gl-render", function() {
	mesh.draw()
})

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