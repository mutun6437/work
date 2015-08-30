function createList(result){
    var aNode = document.getElementById("list");
    for (var i =aNode.childNodes.length-1; i>=0; i--) {
    aNode.removeChild(aNode.childNodes[i]);
    }
    for(i=0;i<result.length;i++){
        console.log(result[i]);

/*        var table = document.createElement("table");
        table.style.border = "1px solid #000";
*/
        

/*        //名前
        var _name = document.createElement("tr");
        var key = document.createElement("td");
        key.innerHTML = "会社名";
        _name.appendChild(key);
        var name = document.createElement("td");
        name.innerHTML = result[i].name;
        _name.appendChild(name);
        table.appendChild(_name);

        //案件名
        var _project = document.createElement("tr");
        var key = document.createElement("td");
        key.innerHTML = "案件名";
        _project.appendChild(key);
        var project = document.createElement("td");
        name.innerHTML = result[i].project;
        _project.appendChild(project);
        table.appendChild(_project);
*/
        var _project = document.createElement("div");
        _project.innerHTML = JSON.stringify(result[i]);
        _project.style.border = "1px solid #000";




        document.getElementById("list").appendChild(_project);




        








    }
}