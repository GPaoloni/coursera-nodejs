var rect = require('./rectangle')

function solveRect(l, b) {
  rect(l, b, (err, rectangle) => {
    if (err) {
      console.log("Error: " + err.message)
    } else {
      console.log("Solved with l = " + l + " and b = " + b)
      console.log("Perimeter: " + rectangle.perimeter())
      console.log("Area: " + rectangle.area())
    }
  })
}

solveRect(2,4)
solveRect(3,5)
solveRect(0,5)
solveRect(-3,5)
