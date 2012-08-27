	//    <script type = "text/javascript">
	//<![CDATA[
	//from panbs.html
	boxIndex = "10";
	boxFactor = "undefined";
	debugTxt = "Debug Information<br>";

	function bw() {
		contentID = document.getElementById("contentID");
		peakBandwidth = document.getElementById("peakBandwidth");

		effectiveTP = parseInt(contentID.value) * parseInt(peakBandwidth.value); // rough approximation of needs, multiply BW *2 if using TP
		debugTxt = (debugTxt + "<br>effectiveTP = " + effectiveTP);

		if (parseInt(contentID.value) == 1) {
			boxFactor = ('<ul><li>Peak throughput</li>');
		} else if (parseInt(contentID.value) == 2) {
			boxFactor = ('<ul><li>Peak throughput</li><li>Use of Content ID</li>');
		}
		debugTxt = (debugTxt + "<br>Initial boxIndex = " + boxIndex);

		if (effectiveTP < 50) {
			boxIndex = "10";
		} else if (effectiveTP < 250) {
			boxIndex = "20";
		} else if (effectiveTP < 500) {
			boxIndex = "30";
		} else if (effectiveTP < 1000) {
			boxIndex = "40";
		} else if (effectiveTP < 4000) {
			boxIndex = "70";
		} else if (effectiveTP < 10000) {
			boxIndex = "80";
		} else if (effectiveTP <= 20000) {
			boxIndex = "90";
		} else if (effectiveTP > 20000) {
			boxIndex = "100";
		} //end if 	
	} // end function bw()   

	function users() {
		userCount = document.getElementById("users");
		debugTxt = (debugTxt + "<br>userCount = " + userCount.value + " boxindex = " + boxIndex);

		if (parseInt(userCount.value) <= 40) {
			userIndex = "10";
		} else if (parseInt(userCount.value) == 0) {
			userIndex = "10";
		} else if (parseInt(userCount.value) <= 100) {
			userIndex = "20";
		} else if (parseInt(userCount.value) <= 500) {
			userIndex = "30";
		} else if (parseInt(userCount.value) <= 900) {
			userIndex = "40";
		} else if (parseInt(userCount.value) <= 2000) {
			userIndex = "70";
		} else if (parseInt(userCount.value) <= 5000) {
			userIndex = "80";
		} else if (parseInt(userCount.value) <= 10000) {
			userIndex = "90";
		} else if (parseInt(userCount.value) > 10000) {
			userIndex = "100";
		} //end if 	
		debugTxt = (debugTxt + "<br>userIndex = " + userIndex + " boxindex = " + boxIndex);
		if (userIndex > boxIndex) {
			boxIndex = userIndex;
			boxFactor = ('<ul><li>Number of users</li>')
		} else if (userIndex == boxIndex) {
			boxFactor = (boxFactor + "<li>Number of users</li>")
		}


	} // end function users()   

	function qos() {
		qosBW = document.getElementById("qos");
		debugTxt = (debugTxt + "<br>qosBW = " + qosBW.value + " boxindex = " + boxIndex)
		if (parseInt(qosBW.value) <= 25) {
			qosIndex = "10";
		} else if (parseInt(qosBW.value) <= 50) {
			qosIndex = "20";
		} else if (parseInt(qosBW.value) <= 100) {
			qosIndex = "30";
		} else if (parseInt(qosBW.value) > 100) {
			qosIndex = "70";
		}
		debugTxt = (debugTxt + "<br>qosIndex = " + qosIndex + " boxindex = " + boxIndex)

		if (qosIndex > boxIndex) {
			boxIndex = qosIndex;
			boxFactor = ('<ul><li>QoS requirements</li>');
		} else if (qosIndex == boxIndex) {
			boxFactor = (boxFactor + '<li>QoS requirements</li>');
		}

	} //end func qos

	function sessions() {

		sessionIndex = document.getElementById("maxSessions");
		debugTxt = (debugTxt + "<br>sessionIndex = " + sessionIndex.value + " boxindex = " + boxIndex);
		if (parseInt(sessionIndex.value) > boxIndex) {
			boxIndex = parseInt(sessionIndex.value);
			boxFactor = ('<ul><li>Concurrent sessions</li>')
		} else if (parseInt(sessionIndex.value) == boxIndex) {
			boxFactor = (boxFactor + "<li>Concurrent sessions</li>")
		}

	} // end function maxSessions()   

	function cps() {

		cpsIndex = document.getElementById("maxCPS");
		debugTxt = (debugTxt + "<br>cpsIndex = " + cpsIndex.value + " boxindex = " + boxIndex);
		if (cpsIndex.value > boxIndex) {
			boxIndex = cpsIndex.value;
			boxFactor = ('<ul><li>Connections per second</li>')
		} else if (cpsIndex.value == boxIndex) {
			boxFactor = (boxFactor + "<li>Connections per second</li>")
		}
	} // end function cps()   

	function copperIf() {
		copperIfIndex = document.getElementById("copperIf");
		debugTxt = (debugTxt + "<br>copperIfIndex.value = " + copperIfIndex.value + " boxindex = " + boxIndex);
		if (copperIfIndex.value > boxIndex) {
			boxIndex = copperIfIndex.value;
			boxFactor = ('<ul><li>Number of copper interfaces</li>')
		} else if (copperIfIndex.value == boxIndex) {
			boxFactor = (boxFactor + "<li>Number of copper interfaces</li>")
		}
	} // end function copperIf

	function gbFiber() {
		gbFiberIndex = document.getElementById("gbFiber");
		debugTxt = (debugTxt + "<br>gbFiberIndex.value = " + gbFiberIndex.value + " boxindex = " + boxIndex);
		if (gbFiberIndex.value > boxIndex) {
			boxIndex = parseInt(gbFiberIndex.value);
			boxFactor = ('<ul><li>Number of 1Gb fiber interfaces</li>')
		} else if (gbFiberIndex.value == boxIndex) {
			boxFactor = (boxFactor + "<li>Number of 1Gb fiber interfaces</li>")
		}
	} // end function gbFiber

	function tenGb() {
		tenGbIndex = document.getElementById("tenGb");
		debugTxt = (debugTxt + "<br>tenGbIndex.value = " + tenGbIndex.value + " boxindex = " + boxIndex);
		if (parseInt(tenGbIndex.value) > boxIndex) {
			boxIndex = parseInt(tenGbIndex.value);
			boxFactor = ('<ul><li>10Gb interfaces</li>')
		} else if (parseInt(tenGbIndex.value) == boxIndex) {
			boxFactor = (boxFactor + "<li>10Gb interfaces</li>")
		} 
	} // end function tenGB

	function swagBox() {
		resetVar();
		evaluateBox();
	}

	function resetVar() {
		boxIndex = "10";
		boxFactor = "undefined"
	}

	function evaluateBox() {
		var box = ""
		debugTxt = "debug details:<br>"
		bw();
		users();
		qos();
		sessions();
		cps();
		copperIf();
		gbFiber();
		tenGb();

		boxInt = (parseInt(boxIndex));
		switch (boxInt) {
		case 10:
			box = "PA200";
			break;
		case 20:
			box = "PA500";
			break;
		case 30:
			box = "PA2020";
			break;
		case 40:
			box = "PA2050";
			break;
		case 70:
			box = "PA5020";
			break;
		case 80:
			box = "PA5050";
			break;
		case 90:
			box = "PA5060";
			break;
		case 100:
			box = "multiple-device, horizontally scaled solution to meet these requirements.  Please work with your Palo Alto Networks SE to come up with a viable design.";
			break;
		default:
			box = "undefined - something went very very wrong"
		} //end switch	
		divOutput = document.getElementById("divOutput");
		divOutput.innerHTML = ("You appear to need a " + box); 
		divDetails = document.getElementById("divDetails");
		boxFactor = (boxFactor + "</ul>");
		divDetails.innerHTML = ("The primary factor(s) used in this recommendation are:<br> " + boxFactor /*+ "<br>" + debugTxt*/);
		divDebug = document.getElementById("divDebug");
		//divDebug.innerHTML = (debugTxt); 

		//document.getElementById('divOutput').scrollIntoView();
		setTimeout(function(){document.getElementById('divOutput').scrollIntoView();}, 300);
		//window.location.href = "#output";
	} // end function evaluateBox()
	//]]>
	//    </script>
	
