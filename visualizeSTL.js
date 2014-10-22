var shell = require("mesh-viewer")()
var stl = require('stl')
var fs = require("fs")

var stlfile = stl.toObject(fs.readFileSync('cube.stl'));
console.log(stlfile)
//create facets
facetList = stlfile.facets[0].verts 	//first triangle
for (var i=1; i<stlfile.facets.length; i++)
{
	facetList = facetList.concat(stlfile.facets[i].verts)
}


//create cells
var cellList = []
for(var i=0; i<stlfile.facets.length; i++)
{
	cellList[i] = [3*i, 3*i+1, 3*i+2]
}

//create mesh
stlMesh = {
	positions: facetList,
	cells: cellList,
	pointSize: 16
}

//check
myMesh = {
		positions: [[0, 0, 0], [10, 0, 0], [0, 10, 0]],
		cells: [ [0,1,2]],
		pointSize: 16
}

	
var mesh



shell.on("viewer-init", function() {
  mesh = shell.createMesh(stlMesh)
})

shell.on("gl-render", function() {
  mesh.draw()
})

