// ==UserScript==
// @name        ServiceCloud Clean View Dropdown
// @author      bevi@esko.com
// @namespace   com.esko.bevi.scviewdrop
// @description Cleans the view selection dropdown
// @include     /^http(s)?:\/\/(esko\.my\.salesforce\.com)\/([0-9A-Z]+\?)(.*)$/
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://openuserjs.org/src/libs/sizzle/GM_config.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     2
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

GM_config.init(
	{
		'id': 'scviewdrop', // The id used for this instance of GM_config
		'title': 'ServiceCloud Clean View Dropdown Configuration', // Panel Title
		'fields': // Fields object
		{
			'ExcludeList': // This is the id of the field
			{
				'label': 'Hide items containing (list of words, separated by a comma)', // Appears next to field
				'type': 'text', // Makes this setting a text field
				'default': 'Remote, CW, Agents, eSupport, Global, All, FIQ, GCH, Japan, Korea, LA, NA, OCE, SA, SEA, Invalid, 1.' // Default value if user doesn't change it
			}
		}
	});



var ExcludeList = GM_config.get('ExcludeList').split(/,\s?/);

waitForKeyElements ("select[id$='_listSelect']", hide);

function hide() {
	jQuery('div.controls').prepend("<a href=\"#\" id=\"scviewdropConfigIcon\" style=\"float: left;\"><img alt=\"Configure hidden items\" title=\"Configure hidden items\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGAqSSwoyGFhYGDIzSspCnJ3UoiIjFJgv8PAzcDDIMRgxSCemFxc4BgQ4MOAE3y7xsAIoi/rgsxK8/x506a1fP4WNq+ZclYlOrj1gQF3SmpxMgMDIweQnZxSnJwLZOcA2TrJBUUlQPYMIFu3vKQAxD4BZIsUAR0IZN8BsdMh7A8gdhKYzcQCVhMS5AxkSwDZAkkQtgaInQ5hW4DYyRmJKUC2B8guiBvAgNPDRcHcwFLXkYC7SQa5OaUwO0ChxZOaFxoMcgcQyzB4MLgwKDCYMxgwWDLoMjiWpFaUgBQ65xdUFmWmZ5QoOAJDNlXBOT+3oLQktUhHwTMvWU9HwcjA0ACkDhRnEKM/B4FNZxQ7jxDLX8jAYKnMwMDcgxBLmsbAsH0PA4PEKYSYyjwGBn5rBoZt5woSixLhDmf8xkKIX5xmbARh8zgxMLDe+///sxoDA/skBoa/E////73o//+/i4H2A+PsQA4AJHdp4IxrEg8AAAICaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpggtEZAAACA0lEQVQ4EWP8DwQMVARMVDQLbNTgN5CFGC+vOv2C4cvPPwymigIMutI8eLXgNPDWy28M0gLsDMxMjAwzDz4GG/L+2x+wgdeefWGQF+Fk4GZjxjAcq4EHb71naNl8h0Gcj51BXYIbrunYnfcMf//9Z9h15Q2DlhQPQ2eoOgMnK2o0oPKgWndeec0A1Mfw/ONPhgM338EN/AB04U6gYaB0dhXoytsvv8LlYAysBha5KcLkwTQXGxOKS0GCjhpCDHoyvCjqQBxG9IS99MRzBlAYnbj3AazYQJaXoSVIDey1K0+/MOQvvw4WF+BiYXDVEmGwVRNk0AZ6HwYwwnDekScwOTAdYCQODycdYAyDXHXpyWcGkPdXn3kBDlNkAzG8zM6CKnT/9Xe4BX+AAfv43Q84H8RgZWZE4WN4GRQZN198ZchZeg2skIedmSHCXJJBXZybYeOFVwxHbr8HixvL8zGUeigyiPCyMSAbieFlYLJjePX5F9zWLz//Msw5hBoMIMlnH34ycALTIbJhIHFU/4FEgODAjbcQBh4SlKRuPMdMNhguBJlR7qnE8P3XHQZDoLdAEZG3DBKzoAgpAXqzf9cDcLIxUeDDsBIjDNFVgBKxz8SzDD9+/2OItpBkSLKRQVeCwidoIEj1rz//Gf4Cy2FQCgCFMT5AlIH4DECXwxop6IpI4QMALrGua1Hvj10AAAAASUVORK5CYII=\"></a>");
	jQuery('#scviewdropConfigIcon').click(function(){GM_config.open();});
	for (var i = 0; i < ExcludeList.length; i++) {
		jQuery("select[id$='_listSelect'] option").each(function(index,element){
			var re = new RegExp('.*'+escapeRegExp(ExcludeList[i])+'.*','gi');
			var result = element.text.match(re);
			if (result !== null) {
				jQuery("select[id$='_listSelect'] option[value='"+ element.value +"']").remove();
			}
		});
	}
}

function escapeRegExp(stringToGoIntoTheRegex) {
	return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

