filetypes = {
	js: { mimetype: 'application/javascript', mode: 'ace/mode/javascript'},
	html:{ mimetype: 'text/html', mode:'ace/mode/html'},
	css:{ mimetype: 'text/css', mode: 'ace/mode/css'}
};



getMode= function(fileName){							//gives back the ace mode

	var type= (fileName).replace(/^.*\.([^.]+)$/, '$1');

	if(type == "css"){
		return filetypes.css.mode;
    }
    else if (type == "html"){
    	return filetypes.html.mode;
    }
    else if (type =="js"){
    	return filetypes.js.mode;
    }
    else {
    	//console.log("getMode error");
    }
} 



getMime= function(fileName){							//returns the MIME type

	var type= (fileName).replace(/^.*\.([^.]+)$/, '$1');

	if(type == "css"){
		return filetypes.css.mimetype;
    }
    else if (type == "html"){
    	return filetypes.html.mimetype;
    }
    else if (type =="js"){
    	return filetypes.js.mimetype;
    }
    else {
    	//console.log("getMime error");
    }
} 

