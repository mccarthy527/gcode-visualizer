var shell = require("mesh-viewer")()
var gc = require('interpret-gcode')
var sl = require("gcode-lines")
var fs = require("fs")

var data = fs.readFileSync("test.gcode")
var fileContent = data.toString()
var states = gc(fileContent)
var roads = sl(states)
var mesh

shell.on("viewer-init", function() 
{
	shell.gl.lineWidth(5)
	
	testMesh = segments2mesh(roads.lines)
	
	mesh = shell.createMesh(testMesh)
})

shell.on("gl-render", function() {
	mesh.draw()
})

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
	console.log("lines")
	console.log(lines)
	console.log("pts")
	console.log(pts)
	
	
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

