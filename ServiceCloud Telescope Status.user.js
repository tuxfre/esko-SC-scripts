// ==UserScript==
// @name        ServiceCloud Telescope Status
// @author      bevi@esko.com
// @namespace   com.esko.bevi.sctelescope
// @description Queries Telescope for latest update
// @downloadURL  https://github.com/tuxfre/esko-SC-scripts/raw/master/ServiceCloud%20Telescope%20Status.user.js
// @include     https://esko.my.salesforce.com/support/console/highlightpanel.apexp*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://openuserjs.org/src/libs/sizzle/GM_config.js
// @version     1
// @icon        data:image/gif;base64,R0lGODlhIAAgAKIHAAGd3K/CNOz4/aje8zGv3HLJ63PAsv///yH5BAEAAAcALAAAAAAgACAAQAPGeLrc/k4MQKu9lIxRyhaCIhBVYAZGdgZYCwwMKLmFLEOPDeL8MgKEFXBFclkIoMJxRTRmaqGedEqtigSFYmYgGRAInV3vlzGsDFonoCZSAlAAQyqeKrDUFK7FHCDJh3B4bBJueBYeNmOEX4hRVo+QkZKTV4SNBzpiUlguXxcamRFphhhgmgIVQSZyJ6NGgz98Jl9npFwTFLOlJqQ1FkIqJ4ZIZIAEfGi6amyYacdnrk8dXI6YXVlGX4yam9hHXJTWOuHk5RAJADs=
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_xmlhttpRequest
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

GM_config.init(
	{
		'id': 'sctelescopeConfig', // The id used for this instance of GM_config
		'title': 'TeleScope Status Global Configuration', // Panel Title
		'fields': // Fields object
		{
			'AlertInterval': // This is the id of the field
			{
				'label': 'Alert (red led) if report is older than (days)', // Appears next to field
				'type': 'int', // Makes this setting a text field
				'default': '7' // Default value if user doesn't change it
			},
			'WarnInterval': // This is the id of the field
			{
				'label': 'Warn (orange led) if report is older than (days)', // Appears next to field
				'type': 'int', // Makes this setting a text field
				'default': '4' // Default value if user doesn't change it
			}


		}
	});

var AlertInterval = GM_config.get('AlertInterval');
var WarnInterval = GM_config.get('WarnInterval');


var statusLed;
var difference;
var teleScopeURL = 'http://begesesgf001.esko-graphics.com/CS-Customers-SystemInfo-Gent/'+jQuery('.efhpFieldValue').last().text().trim()+'/systeminfo/html/Most_Recent.html';

try {
	GM_xmlhttpRequest({
		method: "GET",
		url: teleScopeURL,
		onload: function(response) {
			try {
				var teleScopeData = /^Config_([A-Za-z0-9]{4,6})_([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})\.html$/g.exec($('<div>'+response.responseText+'</div>').find('a').attr('href'));
				var teleScopeUpdate = new Date(teleScopeData[2],teleScopeData[3]-1,teleScopeData[4]);
				difference = Math.floor((Date.now()-teleScopeUpdate)/(1000*60*60*24));
				if (difference > AlertInterval) {
					//red
					statusLed = "data:image/gif;base64,R0lGODlhIAAPAPf1AAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDcwKbK8JkAAMQAJv9mZv+Zmf/MzFMAXYFUkKWGs9S+3gAoVgA9hFxqpo+SwMzM/wBBawBjpFmEvY+n0cbW8wAAiAAAqjOZ/47N8Nnu+SRNDDJsEU2mGYzAbLPTm0RZAF99AJLAALjSa9HfnFBQHmZmM5mZZszMmf//1nlwAKqdAOjSWP/rAP/wnm5HAJpkAP9mAP+ZAPezV//MM1Y1DW5KIKZ+Tsefbf/Mmebm5tnZ2b+/v6amppmZmYyMjGZmZkBAQG+MnP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////78KCgpICAgP8AAAD/AP//AAAA//8A/wD//wAAACH5BAEAAP0ALAAAAAAgAA8AQAirAPsJHEiwoMGDBAEEyMcw38IAAPoBOHIkicUNQ5JEnFjxYsaIGgOIhJhkoEaKFAGUFHgSpUqTAGK+JKhR5kqYNhHq3HnwyEIlShw6PCKRYpKOG45sNIpUaUihIl+eTIJxg8aSU6te5cm1q9ev/WrGvMlS5kycY8suhCqV49GjbZnCfQqUYdSiby8qxduRqlKfUB0GIDrxrdalhodYBalw5NmpFR8XjkwWbNeAADs=";
				} else if (difference > WarnInterval)  {
					//orange
					statusLed ="data:image/gif;base64,R0lGODlhIAAPAPf1AAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDcwKbK8JkAAMQAJv9mZv+Zmf/MzFMAXYFUkKWGs9S+3gAoVgA9hFxqpo+SwMzM/wBBawBjpFmEvY+n0cbW8wAAiAAAqjOZ/47N8Nnu+SRNDDJsEU2mGYzAbLPTm0RZAF99AJLAALjSa9HfnFBQHmZmM5mZZszMmf//1nlwAKqdAOjSWP/rAP/wnm5HAJpkAP9mAP+ZAPezV//MM1Y1DW5KIKZ+Tsefbf/Mmebm5tnZ2b+/v6amppmZmYyMjGZmZkBAQG+MnP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////78KCgpICAgP8AAAD/AP//AAAA//8A/wD//wAAACH5BAEAAP0ALAAAAAAgAA8AQAirAPsJHEiwoMGDBAEcOZKk4YYhSQD0A6Bjn8V9FXVIVMjQIUSJERcuBJBkYEQdKDWWFBhSJEmTAGK+LChzJkyZKxHq3ElzYZKOG45IPFJRiRKMGI9M9AlUaMgkDzdEXEkRKcqXT6NO5cm1q9ev/SLiNFjToNiYK1v+/DmzKtIBWDmudapwrUOhE4sexahxqV2oQusy1Do0o1UdSgVDHSIVpGKbJ1NCfpwTrNeAADs=";
				} else {
					//green
					statusLed = "data:image/gif;base64,R0lGODlhIAAPAPf1AAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDcwKbK8JkAAMQAJv9mZv+Zmf/MzFMAXYFUkKWGs9S+3gAoVgA9hFxqpo+SwMzM/wBBawBjpFmEvY+n0cbW8wAAiAAAqjOZ/47N8Nnu+SRNDDJsEU2mGYzAbLPTm0RZAF99AJLAALjSa9HfnFBQHmZmM5mZZszMmf//1nlwAKqdAOjSWP/rAP/wnm5HAJpkAP9mAP+ZAPezV//MM1Y1DW5KIKZ+Tsefbf/Mmebm5tnZ2b+/v6amppmZmYyMjGZmZkBAQG+MnP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////78KCgpICAgP8AAAD/AP//AAAA//8A/wD//wAAACH5BAEAAP0ALAAAAAAgAA8AQAixAPsJHEiwoMGDBAEcOZKk4YYhSQD0U8jQIUSJAATo26hPowCJERcuBJBkYEiRJE1mFMAypcCIAGKWJAhTZsGaLhHq3FmQYpKKG45gXPjTodB+RzQqUdKxI0OFSR5uiFgyZNQhU1NG9Njx40yeYMOKFYvz68uYNmmidXmyqNCqPhm+7bd1o0eSUCtGPZq34V6MSpl2jSn3ataJhaVGRMrVo4AjdPvmtPr061aWXsdqFhgQADs=";
				}
			} catch (e) {
				//grey
				statusLed = "data:image/gif;base64,R0lGODlhIAAPAPf1AAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDcwKbK8JkAAMQAJv9mZv+Zmf/MzFMAXYFUkKWGs9S+3gAoVgA9hFxqpo+SwMzM/wBBawBjpFmEvY+n0cbW8wAAiAAAqjOZ/47N8Nnu+SRNDDJsEU2mGYzAbLPTm0RZAF99AJLAALjSa9HfnFBQHmZmM5mZZszMmf//1nlwAKqdAOjSWP/rAP/wnm5HAJpkAP9mAP+ZAPezV//MM1Y1DW5KIKZ+Tsefbf/Mmebm5tnZ2b+/v6amppmZmYyMjGZmZkBAQG+MnP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////78KCgpICAgP8AAAD/AP//AAAA//8A/wD//wAAACH5BAEAAP0ALAAAAAAgAA8AQAiiAPsJHEiwoMGDBAEcOXLAyAEiQw4A6KeQoUOIEikubPgw4kQjFRcCMDIQ5EKRJAWaPDlyIBEAMCcWfBnTIE2YCHPqRFjxgEUiRyb2/BlUI0OiAF4yhEgkYz+lHZvKhMrU6c6rWLNqvSmTIFebMbsqPepz6tCyAsf6RKtwrREjQIWSfRtXo1u4QdsuHSLV7t6+eqNmNLm2pcrAhvsRZphYq9aAADs=";
			}
			jQuery('.efhpFieldValue').last().append("<a href=\""+ teleScopeURL +"\" target=\"_blank\"><img id=\"teleScopeLed\" src=\""+ statusLed +"\" title=\"Latest TeleScope report is "+ difference +" days old\"></a>");
		}
	});
} catch (e) {
	statusLed = "data:image/gif;base64,R0lGODlhIAAPAPf1AAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDcwKbK8JkAAMQAJv9mZv+Zmf/MzFMAXYFUkKWGs9S+3gAoVgA9hFxqpo+SwMzM/wBBawBjpFmEvY+n0cbW8wAAiAAAqjOZ/47N8Nnu+SRNDDJsEU2mGYzAbLPTm0RZAF99AJLAALjSa9HfnFBQHmZmM5mZZszMmf//1nlwAKqdAOjSWP/rAP/wnm5HAJpkAP9mAP+ZAPezV//MM1Y1DW5KIKZ+Tsefbf/Mmebm5tnZ2b+/v6amppmZmYyMjGZmZkBAQG+MnP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////78KCgpICAgP8AAAD/AP//AAAA//8A/wD//wAAACH5BAEAAP0ALAAAAAAgAA8AQAiiAPsJHEiwoMGDBAEcOXLAyAEiQw4A6KeQoUOIEikubPgw4kQjFRcCMDIQ5EKRJAWaPDlyIBEAMCcWfBnTIE2YCHPqRFjxgEUiRyb2/BlUI0OiAF4yhEgkYz+lHZvKhMrU6c6rWLNqvSmTIFebMbsqPepz6tCyAsf6RKtwrREjQIWSfRtXo1u4QdsuHSLV7t6+eqNmNLm2pcrAhvsRZphYq9aAADs=";
	jQuery('.efhpFieldValue').last().append("<a href=\""+ teleScopeURL +"\" target=\"_blank\"><img id=\"teleScopeLed\" src=\""+ statusLed +"\" title=\"No TeleScope report found / Error!\"></a>");
}
jQuery('.efhpFieldValue').last().append("<a href=\"#\" id=\"sctelescopeConfigIcon\"><img alt=\"Configure max allowed TeleScope Report age\" title=\"Configure max allowed TeleScope Report age\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABfGlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGAqSSwoyGFhYGDIzSspCnJ3UoiIjFJgv8PAzcDDIMRgxSCemFxc4BgQ4MOAE3y7xsAIoi/rgsxK8/x506a1fP4WNq+ZclYlOrj1gQF3SmpxMgMDIweQnZxSnJwLZOcA2TrJBUUlQPYMIFu3vKQAxD4BZIsUAR0IZN8BsdMh7A8gdhKYzcQCVhMS5AxkSwDZAkkQtgaInQ5hW4DYyRmJKUC2B8guiBvAgNPDRcHcwFLXkYC7SQa5OaUwO0ChxZOaFxoMcgcQyzB4MLgwKDCYMxgwWDLoMjiWpFaUgBQ65xdUFmWmZ5QoOAJDNlXBOT+3oLQktUhHwTMvWU9HwcjA0ACkDhRnEKM/B4FNZxQ7jxDLX8jAYKnMwMDcgxBLmsbAsH0PA4PEKYSYyjwGBn5rBoZt5woSixLhDmf8xkKIX5xmbARh8zgxMLDe+///sxoDA/skBoa/E////73o//+/i4H2A+PsQA4AJHdp4IxrEg8AAAICaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpggtEZAAACA0lEQVQ4EWP8DwQMVARMVDQLbNTgN5CFGC+vOv2C4cvPPwymigIMutI8eLXgNPDWy28M0gLsDMxMjAwzDz4GG/L+2x+wgdeefWGQF+Fk4GZjxjAcq4EHb71naNl8h0Gcj51BXYIbrunYnfcMf//9Z9h15Q2DlhQPQ2eoOgMnK2o0oPKgWndeec0A1Mfw/ONPhgM338EN/AB04U6gYaB0dhXoytsvv8LlYAysBha5KcLkwTQXGxOKS0GCjhpCDHoyvCjqQBxG9IS99MRzBlAYnbj3AazYQJaXoSVIDey1K0+/MOQvvw4WF+BiYXDVEmGwVRNk0AZ6HwYwwnDekScwOTAdYCQODycdYAyDXHXpyWcGkPdXn3kBDlNkAzG8zM6CKnT/9Xe4BX+AAfv43Q84H8RgZWZE4WN4GRQZN198ZchZeg2skIedmSHCXJJBXZybYeOFVwxHbr8HixvL8zGUeigyiPCyMSAbieFlYLJjePX5F9zWLz//Msw5hBoMIMlnH34ycALTIbJhIHFU/4FEgODAjbcQBh4SlKRuPMdMNhguBJlR7qnE8P3XHQZDoLdAEZG3DBKzoAgpAXqzf9cDcLIxUeDDsBIjDNFVgBKxz8SzDD9+/2OItpBkSLKRQVeCwidoIEj1rz//Gf4Cy2FQCgCFMT5AlIH4DECXwxop6IpI4QMALrGua1Hvj10AAAAASUVORK5CYII=\"></a>");
$('#sctelescopeConfigIcon').click(function(){GM_config.open();});



