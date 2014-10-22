var shell = require("mesh-viewer")()
var mesh

myMesh = {
		positions: [[0, 0, 0], [10, 0, 0], [0, 10, 0]],
		cells: [ [0,1,2]],
		pointSize: 16
    }

shell.on("viewer-init", function() {
  mesh = shell.createMesh(myMesh)
})

shell.on("gl-render", function() {
  mesh.draw()
})

