var BrainFuck = (function($) {

	var brainfuck = {};

	var tape = new Array();
	var stack = new Array();
	var dataPointer = 0;
	var MAX_ASCII_VAL = 256;
	var usedCellsCount = 1;
	var output = new String("");
	var currAscii = 0;
	var code = "";
	var debugCounter = 0;
	
	brainfuck.init = function() {
		tape = new Array();
		stack = new Array();
		dataPointer = 0;
		MAX_ASCII_VAL = 256;
		usedCellsCount = 1;
		output = new String("");
		currAscii = 0;
		code = "";
		debugCounter = 0;
	};
	
	brainfuck.interpret = function(_code) {
		code = _code;
		tape[0] = 0;
		for ( var programCounter = 0; programCounter < code.length; programCounter++) {
			programCounter = execute(programCounter);
		}

		return output;
	};

	brainfuck.generateCode = function(text) {
		output = "[-]>[-]<\n";		
		for (var i = 0; i < text.length; i++) {
			output += getBFCode(text[i]);			
		}
		return output;
	};
	
	brainfuck.loadToDebug = function(_code) {
		tape[0] = 0;
		code = _code;
	};
	
	brainfuck.step = function() {
		debugCounter = execute(debugCounter);
		if(debugCounter < code.length)
			debugCounter++;
		else
			return null;
		return tape; 
	};
	
	brainfuck.getDebugOutput = function() {
		return output;
	};
	
	function execute(programCounter) {
		var temp = 0;
		var c = code[programCounter];		
		switch (c) {
		case '+':
			tape[dataPointer]++;
			break;
		case '-':
			tape[dataPointer]--;
			break;
		case '>':
			if (++dataPointer == usedCellsCount) {
				tape[dataPointer] = 0;
				usedCellsCount++;
			}
			break;
		case '<':
			if (dataPointer-- == 0)
				alert("error");
			break;
		case '.':
			output += String.fromCharCode(tape[dataPointer]);
			break;
		case ',':
			var input = prompt("Input", "0");
			if (!input)
				input = 0;
			tape[dataPointer] = input;
			break;
		case '[':
			if (tape[dataPointer] != 0)
				stack.push(programCounter);
			else
				while (code[++programCounter] != ']');
			break
		case ']':
			if (tape[dataPointer] != 0) {
				programCounter = stack.pop();
				stack.push(programCounter - 1);
			}
			break;
		}
		
		return programCounter;
	}
	
	function getBFCode(c) {		
		var bfCode = "";
		
		var newAscii =  c.charCodeAt(0);
		var diff = newAscii - currAscii;
		
		if(diff > 0) {
			if(diff > 17) {
				if(currAscii > 0)
					bfCode += '<';
				bfCode += getDifferenceBFCode(diff, '+');
			} else {
				while(diff-- > 0)
					bfCode += '+';
			}
		} else if (diff < 0) {
			if(diff < -17) {
				bfCode += '<' + getDifferenceBFCode(Math.abs(diff), '-');
			} else {
				while(diff++ < 0)
					bfCode += '-';
			}
		} 
		
		currAscii = newAscii;
		
		return bfCode += '.\n';
	}
	
	function getDifferenceBFCode(change, op) {				
		var bfCode = "";
		
		var multiplicant = Math.floor(Math.sqrt(change));
		var multiplier = multiplicant;
		var excess = change - (multiplier * multiplicant);
		
		loop:
			while(multiplier > 2) {
				while(excess >= 0) {
					multiplicant++;
					excess = change - (multiplier * multiplicant);
					if(excess == 0)
						break loop;
				}
				multiplier--;
				multiplicant--;
				excess = change - (multiplier * multiplicant);
			}		
		
		while(excess >= multiplicant) {
			multiplier++;
			excess = change - (multiplier * multiplicant);
		}
	
		while(multiplier-- > 0)
			bfCode += '+';		
		
		bfCode += "[>";
		while (multiplicant-- > 0) 
			bfCode += op;
		bfCode += "<-]>";		
		
		while(excess-- > 0)
			bfCode += op;
			
		return bfCode;
	}

	return brainfuck;

})(jQuery);