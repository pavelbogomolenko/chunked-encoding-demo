jsonpipe.flow('http://127.0.0.1:1400', {
    success: function(data) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode("id: " + data.id + " name: " + data.title);
        node.appendChild(textnode);
        document.getElementById("chunkedData").appendChild(node);
    },
    error: function(errorMsg) {
    },
    complete: function(statusText) {
    },
    timeout: 20000,
    method: "GET"
});