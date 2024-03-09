currentTableID = 0

// function popUp() {
//     var popup = document.getElementById("myPopup");
//     popup.classList.toggle("show");
// }
  const $ = go.GraphObject.make;

  const diagram =
  new go.Diagram("roomDiagram",
    { 
      "draggingTool.isEnabled": false,
      "panningTool.isEnabled": false,
      "dragSelectingTool.isEnabled": false,
      "maxSelectionCount": 0,
      "allowHorizontalScroll": false,
      "allowVerticalScroll": false,
      "allowZoom": false
    });



function toggleColor(id) {
  var model = diagram.model;
  // all model changes should happen in a transaction
  model.startTransaction("toggleColor");
  var data = model.nodeDataArray[id];  // get the first node data
  model.setDataProperty(data, "available", !data.available);
  model.commitTransaction("toggleColor");
}    

function handleClick(id, obj) {
  currentTableID = id;
  document.getElementById("roomDiagram").style.width = "73vw"
  toggleColor(id-1);
  popup();
}

function tableStyle() {
  return [
    { background: "transparent" },
    { layerName: "Background" },
    { locationSpot: go.Spot.Center, locationObjectName: "TABLESHAPE" },
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  ];
}

// RECTANGULAR TABLE
diagram.nodeTemplateMap.add("Rectangle Table",
$(go.Node, "Spot", tableStyle(),
  $(go.Panel, "Spot",
    $(go.Shape, "Rectangle",
      { name: "TABLESHAPE", desiredSize: new go.Size(160, 80), fill: "green", stroke: null },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
      new go.Binding("fill", "available", function(v) { return v ? "red" : "green"; }),
      {
        click: (e, obj) => handleClick(obj.part.data.key, obj)
      }),
    $(go.TextBlock, { editable: true, font: "bold 11pt Verdana, sans-serif" },
      new go.Binding("text", "name").makeTwoWay(),
      new go.Binding("angle", "angle", n => -n))
  ),
));

// SQUARE TABLE
diagram.nodeTemplateMap.add("Square Table",
$(go.Node, "Spot", tableStyle(),
  $(go.Panel, "Spot",
    $(go.Shape, "Rectangle",
      { name: "TABLESHAPE", desiredSize: new go.Size(100, 100), fill: "green", stroke: null },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
      new go.Binding("fill", "available", function(v) { return v ? "red" : "green"; }),
      {
        click: (e, obj) => handleClick(obj.part.data.key, obj)
      }),
    $(go.TextBlock, { editable: true, font: "bold 11pt Verdana, sans-serif" },
      new go.Binding("text", "name").makeTwoWay(),
      new go.Binding("angle", "angle", n => -n))
  ),
));



// CIRCLE TABLE
diagram.nodeTemplateMap.add("Circle Table",
$(go.Node, "Spot", tableStyle(),
  $(go.Panel, "Spot",
    $(go.Shape, "Circle",
      { name: "TABLESHAPE", desiredSize: new go.Size(150, 150), fill: "green", stroke: null },
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
      new go.Binding("fill", "available", function(v) { return v ? "red" : "green"; }),
      {
        click: (e, obj) => handleClick(obj.part.data.key, obj)
      }),
      
    $(go.TextBlock, { editable: true, font: "bold 11pt Verdana, sans-serif" },
      new go.Binding("text", "name").makeTwoWay(),
      new go.Binding("angle", "angle", n => -n))
  ),
));



diagram.model = new go.GraphLinksModel(
  [ //layout
    { "key": 1, "category": "Square Table", "name": "1", "loc": "20 175", "fill": "lightblue" },
    { "key": 2, "category": "Square Table", "name": "2", "loc": "20 325" },
    { "key": 3, "category": "Square Table", "name": "3", "loc": "20 475" },
    { "key": 4, "category": "Square Table", "name": "4", "loc": "20 625" },
    

    { "key": 5, "category": "Circle Table", "name": "5", "loc": "200 250" },
    { "key": 6, "category": "Circle Table", "name": "6", "loc": "200 550" },

    { "key": 7, "category": "Circle Table", "name": "6", "loc": "670 250" },
    { "key": 8, "category": "Circle Table", "name": "7", "loc": "670 550" },

    { "key": 9, "category": "Square Table", "name": "8", "loc": "850 175" },
    { "key": 10, "category": "Square Table", "name": "9", "loc": "850 325" },
    { "key": 11, "category": "Square Table", "name": "10", "loc": "850 475" },
    { "key": 12, "category": "Square Table", "name": "11", "loc": "850 625" },
  ]);

  function setTable() {
    var popup = document.getElementById("popup");
    // tables.table1.status = document.getElementById("status").value;
    // tables.table1.notes = document.getElementById("textboxnote").value;
    // if (tables.table1.status == 'consolidate') {
    //     tables.table1.lightOn = true;
    // }
    document.getElementById("roomDiagram").style.width = "100vw";
    popup.style.visibility = "hidden";
}

function popup() {
    var popup = document.getElementById("popup");
    popup.style.visibility = "visible";
}


