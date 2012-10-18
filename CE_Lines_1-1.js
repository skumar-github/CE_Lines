var path;
var pathListList = new Array();
var maxPaths = 800;

var bgRect = new Rectangle(0,0, 1000, 1000);
var bgPath = new Path.Rectangle(bgRect);
bgPath.fillColor = 'black';

var textItem = new PointText(new Point(20, 55));
textItem.fillColor = 'white';
textItem.content = 'Click and drag to draw a line.';
textItem.scale(.5, .5);

var xMult = (Math.random()*2)-1;
var yMult = (Math.random()*2)-1;

window.onload = function ()
{
    
}
    
function onMouseDown(event) {
    
    //bgRect.fillColor = 'black';
    // If we produced a path before, deselect it:
    if (path) {
        path.selected = false;
    }

    // Create a new path and set its stroke color to black:
    path = new Path();
    path.add(event.point);
    path.strokeColor = 'grey';

    // Select the path, so we can see its segment points:
    //path.fullySelected = true;
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
    path.add(event.point);

    // Update the content of the text item to show how many
    // segments it has:
    textItem.content = 'Segment count: ' + path.segments.length;
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
    var segmentCount = path.segments.length;
    
    new RgbColor(1, 0, 0);
    // When the mouse is released, simplify it:
    path.simplify(100);
    var pathList = new Array();
    var currColor = new RgbColor(0, 0, 0);
    xMult += (Math.random()*.4)-.2;
    yMult += (Math.random()*.4)-.2;
    
    for (j=0; j<maxPaths; j++){
        newPath = path.clone();
        newPath.opacity = .2;
        newPath.strokeColor = new RgbColor(1-(j/maxPaths/2), 1-(j/maxPaths/2), 1);
        newPath.strokeWeight = 1;
        
        for (i=0; i<newPath.segments.length; i++){
            if (j>0){
                newPath.segments[i].point.x = pathList[j-1].segments[i].point.x + xMult * Math.floor((Math.random()*5));
                newPath.segments[i].point.y = pathList[j-1].segments[i].point.y + yMult * Math.floor((Math.random()*5));


            }
            else{
              newPath.segments[i].point.x += xMult * Math.floor((Math.random()*10)+1);
              newPath.segments[i].point.y += yMult * Math.floor((Math.random()*10)+1);  
            }
        }
        //newPath.simplify(500);
        pathList.push(newPath);
    }

    pathListList.push(pathList);
    // Select the path, so we can see its segments:
    //path.selected = false;
    path.remove();

}// JavaScript Document