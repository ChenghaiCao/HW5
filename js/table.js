/*
    a. Chenghai Cao
    b. Chenghai_cao@student.uml.edu
    c. Chenghai Cao is learning in Umass Lowell undergrad student, Computer Science Major, this is Chenghai Cao's homework 5 in 91.61 GUI Programming I as a student.
    d. July/26/2020
    e. This webpage is mainly displays an Interactive Dynamic Table.

    Copyright (c) 2020 by Chenghai Cao. All rights reserved.
*/


//For full screen:
function fullScreen() {
       var element = document.documentElement;
       if (window.ActiveXObject) {
           var WsShell = new ActiveXObject('WScript.Shell');
           WsShell.SendKeys('{F11}');
       }
       // Firefox
       else if (element.mozRequestFullScreen) {
           element.mozRequestFullScreen();
       }
       //HTML
       else if (element.requestFullScreen) {
           element.requestFullScreen();
       }
       //Safari
       else if (element.webkitRequestFullScreen) {
           element.webkitRequestFullScreen();
       }
       //IE11
       else if (element.msRequestFullscreen) {
           element.msRequestFullscreen();
       }
}
//for minimize the screen
function fullExit() {
    var element = document.documentElement;
    if (window.ActiveXObject) {
        var WsShell = new ActiveXObject('WScript.Shell');
        WsShell.SendKeys('{F11}');
    }
    // Firefox
    else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
    //HTML5
    else if (element.requestFullScreen) {
       document.exitFullscreen();
    }
    //IE 11
    else if (element.msRequestFullscreen) {
      document.msExitFullscreen();
    }
    //Safari
    else if (element.webkitRequestFullScreen) {
       document.webkitCancelFullScreen();
    }
}

//Here is the function to replace the element
//By using the parent nodes to check if new input updated and replace them.
function ElementReplacement(UpdatedVal, parentNode) {
    var prevVal;
    //The getElementById() method returns the element that has the ID attribute with the specified value.
    if((prevVal = document.getElementById(UpdatedVal.id)) && prevVal.parentNode === parentNode) {
        parentNode.replaceChild(UpdatedVal, prevVal);
    } else {
        parentNode.appendChild(UpdatedVal);
    }
}
//This part mainly handleing error when invalid input occurs.
if (typeof Superfixer == "undefined") {
  // the superfixer would test if the input is valid or not.
    var Superfixer = (function() {
        var form;
        //Error message: Since it would be only max number less than min number, the Error would be occurs.
        var Error = 'Error Input, try something greater than "Start from".';
        var init = function() {
            form = document.getElementById('form');
            form.addEventListener('submit', function(refuse) {
                refuse.preventDefault();
                var table = TableMain( form.elements['start1'].value, form.elements['end1'].value, form.elements['start2'].value, form.elements['end2'].value);
                ElementReplacement(table, form);
            });

            for (var i = 0; i < form.elements.length; i++) {
                if(form.elements[i].type !== 'number'){
                  continue;
                }else
                {
                  form.elements[i].addEventListener('input', validated_process);
                }
            }
        };
        //validated procedure
        var validated_process = function(){
            var start, End;
            if(this.name === 'start2' || this.name === 'end2')
            {
                start = form.elements['start2'];
                End = form.elements['end2'];
            } else if(this.name === 'start1' || this.name === 'end1')
            {
                start = form.elements['start1'];
                End = form.elements['end1'];
            }
            //if input valid and greater than or equal to end number, output the rows and columns
            if(start.length !== 0 && End.length !== 0 && parseInt(End.value, 10) >= parseInt(start.value, 10)){
                start.setCustomValidity('');
                End.setCustomValidity('');
            } else {        //Output error text
                End.setCustomValidity(Error);
            }
        };
        //return to initialize
        return {
            init: init
        };
    })();
    //use DOM to tragger the function load.
    //learnt from: https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded
    document.addEventListener('DOMContentLoaded', Superfixer.init);
}

//for create the main table of multiply
function TableMain(Value_end1, Value_start1, Value_start2, Value_end2)
{
    var table = document.createElement('table');
    table.id = 'table';
    var beginC = 1, beginR = 1, multiplier, multiplicand, ResultQ, result;

    for(multiplier = Value_start2 - 1; multiplier <= Value_end2; multiplier++)
    {
        //additional multiplier when starting the loop
        var tableRow = document.createElement('tr');
        for(multiplicand = Value_end1 - 1; multiplicand <= Value_start1; multiplicand++) {
            //additional the new column here
            if(beginR) {
                ResultQ = document.createElement('th');
                if(!beginC) {
                    result = document.createTextNode(multiplicand);
                    ResultQ.appendChild(result);
                }
            } else {
                if(beginC) {
                    ResultQ = document.createElement('th');
                    result = document.createTextNode(multiplier);
                    ResultQ.appendChild(result);

                } else {
                    ResultQ = document.createElement('td');
                    result = document.createTextNode(multiplier * multiplicand);
                    ResultQ.appendChild(result);
                }
            }
            // Add ResultQ TO THE multiplier
            tableRow.appendChild(ResultQ);
            beginC = false;
        }
        // Add multiplier TO MAIN TABLE
        table.appendChild(tableRow);
        beginC = true;
        beginR = false;
    }
    return table;
}
