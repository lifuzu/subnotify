###TODO
1. to implement agreement: check-box selection, and click the button;
```
"agreement": {
  			"check": {
  				"pattern": "",
  				"click": true
  			},
  			"button": {
  				"pattern": "",
  				"click": true
  			}
  		},
```
2. to implement the template with the hook variables;

```
	    	"updated": [
		    	{
		    		"name": "maven",
		    		"version": "3.1.1",
		    		"downloadUrl": "xxx.",
		    		"md5sum": ""
		    	}
	    	],
```
3. to implement script hook, after getting some update information;
```
	    "scripts": [
	    	"other.js"
	    ]
```
4. to implement sqlite interface based on node, save cache, criterion, patterns' value in db;