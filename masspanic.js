/* The Palo Alto Networks Instant Configulator has been tested on 4.1 and later, and is intended for PAN and Partner SEs to speed setup of evals/POCs.
 
 All problems, errors, typos, and shoddy programming by Darren Rogers - drogers@paloaltonetworks.com

 Not a PAN supported product.
 
 version 1.1.1
 
 7/2/2012
 
 Changelog:
 --
 * moved content download after config to avoid race condition with faster new CDN
 * removed some comments

*/




	/*
function downloadAV(){
			showJobs = new XMLHttpRequest();
			showJobs.open("GET", "/api/?type=op&cmd=<show><jobs><all></all></jobs></show>", true); 
			showJobs.onreadystatechange=function() {
				if (showJobs.readyState==4) {
					var jobs = showJobs.responseXML.getElementsByTagName('job');
					var tid = jobs[0].getElementsByTagName('id')[0].textContent;
					var tstatus = jobs[0].getElementsByTagName('status')[0].textContent;
					var ttype = jobs[0].getElementsByTagName('type')[0].textContent;
					tresult = jobs[0].getElementsByTagName('result')[0].textContent;
					var progress = jobs[0].getElementsByTagName('progress')[0].textContent;
					if (ttype == 'Content' && tresult == 'OK'){
						asyncReq('/api/?type=op&cmd=<request><content><upgrade><check></check></upgrade></content></request>', 'Content installed.  ');
						asyncReq('/api/?type=op&cmd=<request><anti-virus><upgrade><check></check></upgrade></anti-virus></request>', 'Checking server for latest AV package ');
						asyncReq('/api/?type=op&cmd=<request><anti-virus><upgrade><check></check></upgrade></anti-virus></request>', '.');
						asyncReq('/api/?type=op&cmd=<request><anti-virus><upgrade><download><latest></latest></download></upgrade></anti-virus></request>', 'Downloading latest AV package ');
						installAV();
						}  
					else{
						waitmsg = ('Installing latest Content, Please Wait... <br>' + ttype + ' ' + progress + '% Completed.<img src="images/progress.gif" align=right>');
						Ext.getCmp('PANICWindow').getEl().mask(waitmsg);
						setTimeout(downloadAV, 5000);
							}
				}	//end if
			} // end readyStatechange
				showJobs.send(null);
			}//end func downloadAV

	function installAV(){
			showJobs = new XMLHttpRequest();
			showJobs.open("GET", "/api/?type=op&cmd=<show><jobs><all></all></jobs></show>", true); 
			showJobs.onreadystatechange=function() {
				if (showJobs.readyState==4) {
					var jobs = showJobs.responseXML.getElementsByTagName('job');
					var tid = jobs[0].getElementsByTagName('id')[0].textContent;
					var tstatus = jobs[0].getElementsByTagName('status')[0].textContent;
					var ttype = jobs[0].getElementsByTagName('type')[0].textContent;
					tresult = jobs[0].getElementsByTagName('result')[0].textContent;
					var progress = jobs[0].getElementsByTagName('progress')[0].textContent;
						if (ttype =='Downld' && tresult == 'OK'){
						asyncReq('/api/?type=op&cmd=<request><anti-virus><upgrade><install><version>latest</version></install></upgrade></anti-virus></request>', 'AV download Complete, beginning install.');
						downloadPanOS();
						}  
					else{
						waitmsg = ('Downloading latest AV Package, Please Wait... <br>' + ttype + ' ' + progress + '% Complete.<img src="images/progress.gif" align=right>');
						Ext.getCmp('PANICWindow').getEl().mask(waitmsg);
						setTimeout(installAV, 5000);
							}
				}	//end if
			} // end readyStatechange
				showJobs.send(null);
			}//end func installAV

	function downloadPanOS(){ // hardcoded to DL 4.1.6, will update as needed
			showJobs = new XMLHttpRequest();
			showJobs.open("GET", "/api/?type=op&cmd=<show><jobs><all></all></jobs></show>", true); 
			showJobs.onreadystatechange=function() {
				if (showJobs.readyState==4) {
					var jobs = showJobs.responseXML.getElementsByTagName('job');
					var tid = jobs[0].getElementsByTagName('id')[0].textContent;
					var tstatus = jobs[0].getElementsByTagName('status')[0].textContent;
					var ttype = jobs[0].getElementsByTagName('type')[0].textContent;
					tresult = jobs[0].getElementsByTagName('result')[0].textContent;
					var progress = jobs[0].getElementsByTagName('progress')[0].textContent;
					if (ttype == "Antivirus" && tresult == 'OK'){
						txtpopup = (txtpopup + ttype + ' Complete.  Downloading PANOS');
						popup.body.update(txtpopup);
						asyncReq('/api/?type=op&cmd=<request><system><software><check></check></software></system></request>', 'AV package installed.<br>Checking for latest PANOS version');
						asyncReq('/api/?type=op&cmd=<request><system><software><download><version>4.1.6</version></download></software></system></request>', 'Check complete, Downloading PANOS 4.1.6');
						installPanOS();
						}  
					else{
						waitmsg = ('Installing AV Package, Please Wait... <br>' + ttype + ' ' + progress + '% Complete.<img src="images/progress.gif" align=right>');
						Ext.getCmp('PANICWindow').getEl().mask(waitmsg);
						setTimeout(downloadPanOS, 5000);
							}
				}	//end if
			} // end readyStatechange
				showJobs.send(null);
			}//end func downloadPanOS

		function installPanOS(){ // hardcoded in install 4.1.6, must update as needed
			showJobs = new XMLHttpRequest();
			showJobs.open("GET", "/api/?type=op&cmd=<show><jobs><all></all></jobs></show>", true); 
			showJobs.onreadystatechange=function() {
				if (showJobs.readyState==4) {
					var jobs = showJobs.responseXML.getElementsByTagName('job');
					var tid = jobs[0].getElementsByTagName('id')[0].textContent;
					var tstatus = jobs[0].getElementsByTagName('status')[0].textContent;
					var ttype = jobs[0].getElementsByTagName('type')[0].textContent;
					tresult = jobs[0].getElementsByTagName('result')[0].textContent;
					var progress = jobs[0].getElementsByTagName('progress')[0].textContent;
					if (ttype == "Downld" && tresult == 'OK'){
						txtpopup = (txtpopup + ttype + ' Complete.  Installing PANOS 4.1.6');
						popup.body.update(txtpopup);
						asyncReq('/api/?type=op&cmd=<request><system><software><install><version>4.1.6</version></install></software></system></request>', 'Download complete, installing 4.1.6');
						finalize();
						}  
					else{
						waitmsg = ('Downloading latest PANOS, Please Wait... <br>' + ttype + ' ' + progress + '% Complete.<img src="images/progress.gif" align=right>');
						Ext.getCmp('PANICWindow').getEl().mask(waitmsg);
						setTimeout(installPanOS, 5000);
							}
				}	//end if
			} // end readyStatechange
				showJobs.send(null);
			}//end func installPanOS

	function finalize(){
			showJobs = new XMLHttpRequest();
			showJobs.open("GET", "/api/?type=op&cmd=<show><jobs><all></all></jobs></show>", true); 
			showJobs.onreadystatechange=function() {
				if (showJobs.readyState==4) {
					var jobs = showJobs.responseXML.getElementsByTagName('job');
					var tid = jobs[0].getElementsByTagName('id')[0].textContent;
					var tstatus = jobs[0].getElementsByTagName('status')[0].textContent;
					var ttype = jobs[0].getElementsByTagName('type')[0].textContent;
					tresult = jobs[0].getElementsByTagName('result')[0].textContent;
					var progress = jobs[0].getElementsByTagName('progress')[0].textContent;
					if (ttype == "SWInstall" && tresult == 'OK'){
						Ext.getCmp('PANICWindow').getEl().unmask();
						txtpopup = (txtpopup + '<br><h1>InstantConfig Complete, Firewall must be rebooted</h1><br>');
						popup.body.update(txtpopup);
						popup.body.scroll("bottom", 200, true);
						workButton.hide();
						closeButton.show();
						rebootButton.show();
						}  
					else{
						waitmsg = ('Installing latest PANOS, Please Wait... <br>' + ttype + ' ' + progress + '% Complete.<img src="images/progress.gif" align=right>');
						Ext.getCmp('PANICWindow').getEl().mask(waitmsg);
						setTimeout(finalize, 10000);
							}
						}	//end if readystate
				} // end readyStatechange
				showJobs.send(null);
			} //end function finalize

	function rebootFW(){
			asyncReq('/api/?type=op&cmd=<request><restart><system></system></restart></request>', 'Rebooting Firewall');
			//Ext.getCmp('PANICWindow').getEl().mask('Rebooting Firewall.  Please reload browser when finished.<br> <img src="images/progress.gif" align=center>');
				Ext.getCmp('PANICWindow').getEl().unmask();
				txtpopup = (txtpopup + '<br><h2>Firewall is rebooting.  Please refresh your browser once it has finished restarting.</h2><br>If you believe you may have run in to a problem with this script, please copy and paste the text out of this window now, as it will disappear after you reload your browser.');
				popup.body.update(txtpopup);
				popup.body.scroll("bottom", 200, true);
				workButton.hide();
				closeButton.show();
				rebootButton.hide();
					}

	function asyncReq(apiCall, apiResult){  //  generic asynchronous API Call function
			request = new XMLHttpRequest();
			request.open("GET", apiCall, true); 
			request.onreadystatechange=function() {
				if (request.readyState==4 && request.status==200) {
					if(apiResult != ""){
						txtpopup = (txtpopup + '<br>' + apiResult);
						popup.body.update(txtpopup);
						Ext.getCmp('PANICWindow').getEl().mask('Configuring Firewall: <img src="images/progress.gif" align=right><br>' + apiResult);
						popup.body.scroll("down", 50, true);
							}
						i++;
						if(calls[i][0] != "end"){
							setTimeout(asyncReq(calls[i][0],calls[i][1]), 100);
								} else if(calls[i][0] == "end"){
									installContent();
									}
					}	//end if
				} // end readyStatechange
				request.send(null);
			}//end func req11


	var calls = [
		//retrieve licenses
		//['/api/?type=op&cmd=<request><license><fetch></fetch></license></request>','Successfully retrieved firewall licenses'],
			];
*/

//	showJobs = new XMLHttpRequest();

	function getKey(){
			request = new XMLHttpRequest();
			request.open("GET", "https://" + ip + "/api/?type=keygen&user=admin&password=admin", true); 
			request.onreadystatechange=function() {
				if (request.readyState==4) {
					var result = request.responseXML.getElementsByTagName('result');
					var key = result[0].getElementsByTagName('key')[0].textContent;
					divOutput = document.getElementById("divOutput");
					divOutput.innerHTML = ("The API Key is" + key + "<br>IP is " + ip); 
							
					}	//end if
			} // end readyStatechange
				request.send(null);
		}//end func installContent


function keyGen(){


	ip = document.getElementById("IP").value;
	key = '';
	getKey();


	}
	