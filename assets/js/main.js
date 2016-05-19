// JavaScript Document

var myArr4 = new Array(1,2,3,4);
	var myArr8 = new Array(1,2,3,4,5,6,7,8);
	var myArr1 = new Array();
	var myArr2 = new Array();
	
	var recStr = new Array();
	var recStrn = 0;
	
	var onPlay = 0;
	var onPause = 0;
	var valSpeed = parseInt($("input[name='speed'][type='range']").val());
	var currentStep = 0;
	
	function getBox(i) {
		var s="#box"+i;
		return s;
	}
	
    function swap(i,j) {
		var temp;
		temp = myArr1[i];
		myArr1[i]=myArr1[j];
		myArr1[j]=temp;
		
		recStr[recStrn] = ("s"+myArr1[i])+myArr1[j];
		recStrn++;
	
	}
    
	function getSpeed(i) {
		return -200*i+2100;
	}

	function fullArray1(m,n) {
		if (m==n) {
			recStr[recStrn] = "p";
			for (var i=0;i<=n;i++) {
				recStr[recStrn] +=myArr1[i];
			}
			recStrn++;
				
			return;
		}
		else {
			for (var j=m;j<=n;j++) {
				swap(m,j);
				fullArray1(m+1,n);
				swap(j,m);
			}
		return;
		}
	}
	
	function nextStep1(step) {
		if ((onPlay == 0)&&(onPause == 0)) return;
		var t1=getSpeed(parseInt($("input[name='speed'][type='range']").val()));
		printStep(step);
		currentStep++;
		if (onPlay == 1) {
			if (step==recStrn-1) {
				onPlay = 0;
				onPause = 0;
				return;
			}
			else {
				var t=setTimeout(function() {nextStep1(step+1);},t1);
			}
		}	
		if (onPause == 1) toggleBtn();
	}

	function printStep(step) {
		if ((onPlay==0)&&(onPause==0)) return;
		var stepp = step+1;
		if (recStr[step].charAt(0)=="s") {
			var i = parseInt(recStr[step].charAt(1));
			var j = parseInt(recStr[step].charAt(2));
			if (i==j) {
				$("#status").text("第"+stepp+"步:元素"+i+"自交换");
			} 
			else {
			    var lefti = $(getBox(i)).css("left");
		        var leftj = $(getBox(j)).css("left");
			
			    var t1=getSpeed(parseInt($("input[name='speed'][type='range']").val()));
			
			    $(getBox(i)).animate({left:leftj},0.5*t1);
		        $(getBox(j)).animate({left:lefti},0.5*t1);
				$("#status").text("第"+stepp+"步:元素"+i+"与元素"+j+"交换");
			}
		}
		if (recStr[step].charAt(0)=="a") {
			var i = parseInt(recStr[step].charAt(1));
			var n = parseInt(recStr[step].charAt(2));
			$("#status").text("第"+stepp+"步:将元素"+i+"置于第"+n+"位");
			
			moveBox(i,n);
		}
		if (recStr[step].charAt(0)=="r") {
			var i = parseInt(recStr[step].charAt(1));
			$("#status").text("第"+stepp+"步:将元素"+i+"移除");
			moveBox(i,0);
		}
		if (recStr[step].charAt(0)=="p") {
			if ($("input[name='algo'][type='radio']:checked").val()=="4") {
		        $("#recording").append(recStr[step].charAt(1)+" "+recStr[step].charAt(2)+" "+recStr[step].charAt(3)+" "+recStr[step].charAt(4));
			} else {
				$("#recording").append(recStr[step].charAt(1)+" "+recStr[step].charAt(2)+" "+recStr[step].charAt(3)+" "+recStr[step].charAt(4)+" ");
				$("#recording").append(recStr[step].charAt(5)+" "+recStr[step].charAt(6)+" "+recStr[step].charAt(7)+" "+recStr[step].charAt(8));
			}
			$("#status").text("第"+stepp+"步:输出当前排列");
			$("#recording").append("\n");
		}
	}	  
	
	//------------------------Way2--------------------------
	
	var recArr = new Array(0,0,0,0,0,0,0,0,0);
	//var recArrn = 0;
	function moveBox(b,pos) {
		if (pos==0) $(getBox(b)).css("left","-9999px");
		else $(getBox(b)).css("left",60*(pos-1)+"px");
	}
	function searchNum(n) {
		if (recArr[n]==0) return true;
		else return false;
	}
	function fullArray2(n,max) {
		if (n>max) {
			recStr[recStrn] = "p";
			for (var i=0;i<n-1;i++) {
				recStr[recStrn] +=myArr2[i];
			}
			recStrn++;
			return;
		}
		for (var i=1;i<=max;i++)　{
			if (searchNum(i)) {
				recArr[i]=n;
				recStr[recStrn] = ("a"+i)+n;
			    recStrn++;
				myArr2[n-1]=i;
				fullArray2(n+1,max);
				recStr[recStrn] = "r"+i;
			    recStrn++;
				recArr[i]=0;
			}
		}
		return;
	}

	
	function toggleBtn() {
		if (onPause == 1) {
			if (currentStep == 0) $("#btnprev").addClass("disabled");
			if (currentStep == recStrn) $("#btnnext").addClass("disabled");
		}
	}
	
	function initBox() {
		for (var i=1;i<9;i++ ) {
			$(getBox(i)).css("left",60*(i-1)+"px");
		}
	}
    $(function(){
		
	    initBox();
		
		$("#box5").hide();
		$("#box6").hide();
		$("#box7").hide();
		$("#box8").hide();
		
		$("#radio4").click(function(){
			$("#box5").hide(1000);
			$("#box6").hide(1000);
			$("#box7").hide(1000);
			$("#box8").hide(1000);
		});
		
		$("#radio8").click(function(){
			$("#box5").show(1000);
			$("#box6").show(1000);
			$("#box7").show(1000);
			$("#box8").show(1000);
		});
		
    	$("#btnplay").click(function(){
		    if ((onPlay == 0) && (onPause == 0)) {
		        var valLength = $("input[name='length'][type='radio']:checked").val();
		   	    var valAlgo = $("input[name='algo'][type='radio']:checked").val();
		   //var valSpeed = $("input[name='speed'][type='range']").val();
		  
		        onPlay = 1;
		        $("#btnplay").addClass("disabled");
		        $("#btnprev").addClass("disabled");
		        $("#btnnext").addClass("disabled");
		   
		        $("#btnpause").removeClass("disabled");
		        $("#btnstop").removeClass("disabled");
		   	    $("input[name='algo'][type='radio']").attr("disabled",true);
		   		$("input[name='length'][type='radio']").attr("disabled",true);
		   
		   		if (valAlgo == "1") {
			   		if (valLength=="4") {
				  		myArr1=myArr4.slice();
				   		fullArray1(0,3);
				   	  	nextStep1(currentStep);
			   	    }	    
		      	    else {
				        myArr1=myArr8.slice();
				        fullArray1(0,7);
				        nextStep1(currentStep);
			        }
		        }
				else {
					if (valLength=="4") {
						moveBox(1,0);
					    moveBox(2,0);
					    moveBox(3,0);
					    moveBox(4,0);
				  		myArr2=myArr4.slice();
				   		fullArray2(1,4);
				   	  	nextStep1(currentStep);
			   	    }	    
		      	    else {
						moveBox(1,0);
					    moveBox(2,0);
					    moveBox(3,0);
					    moveBox(4,0);
						moveBox(5,0);
					    moveBox(6,0);
					    moveBox(7,0);
					    moveBox(8,0);
				        myArr2=myArr8.slice();
				        fullArray2(1,8);
				        nextStep1(currentStep);
			        }
				}
		    }
	        else {
				onPlay = 1;
				nextStep1(currentStep);
			}
        });
		 
		$("#btnstop").click(function(){
		    onPlay = 0;
			onPause = 0;
			currentStep = 0;
			recStrn = 0;
			recArr = new Array(0,0,0,0,0,0,0,0,0);
			
			$("#btnplay").removeClass("disabled");
		    $("#btnprev").addClass("disabled");
		    $("#btnnext").addClass("disabled");
		   
		    $("#btnpause").addClass("disabled");
		    $("#btnstop").addClass("disabled");
			
			$("input[name='algo'][type='radio']").attr("disabled",false);
		   	$("input[name='length'][type='radio']").attr("disabled",false);
			
			$("#recording").text("");
			initBox();
			$("#status").text("初始");
			
        });
		 
		$("#btnpause").click(function(){
		    onPlay = 0;
			onPause = 1;
			$("#btnplay").removeClass("disabled");
		    $("#btnprev").removeClass("disabled");
		    $("#btnnext").removeClass("disabled");
			
			$("#btnpause").addClass("disabled");
			
        });
		 
		$("#btnnext").click(function(){
		    if (onPause==1) nextStep1(currentStep);
        });
		 
		$("#btnprev").click(function(){
		    alert("能力有限，此功能不可用..");
        });
    });