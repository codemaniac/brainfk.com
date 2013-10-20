var bf = angular.module('brainfuck', [ 'ngProgress' ]);

function interpreterCtrl($scope, $timeout, ngProgress) {

	$scope.dataPointer = 0;
	$scope.slidingWindow = 0;
	
	$scope.$watch('dataPointer', function() {
		if ($scope.dataPointer > 5) {
			$scope.slidingWindow = $scope.dataPointer - 5;
		} else {
			$scope.slidingWindow = 0;
		}
    });
	
	var interpret = function(code) {
		$scope.tape = new Array(3000);
		$scope.dataPointer = 0;		
		$scope.output = "";
		var stack = new Array();		
		var MAX_ASCII_VAL = 256;
		var usedCellsCount = 1;		

		var execute = function(programCounter) {
			var temp = 0;
			var c = code[programCounter];
			switch (c) {
			case '+':
				$scope.tape[$scope.dataPointer]++;
				break;
			case '-':
				$scope.tape[$scope.dataPointer]--;
				break;
			case '>':
				if (++$scope.dataPointer == usedCellsCount) {
					$scope.tape[$scope.dataPointer] = 0;
					usedCellsCount++;
				}
				break;
			case '<':
				if ($scope.dataPointer-- == 0)
					alert("error");
				break;
			case '.':
				$scope.output += String.fromCharCode($scope.tape[$scope.dataPointer]);
				break;
			case ',':
				var input = prompt("Input", "0");
				if (!input)
					input = 0;
				$scope.tape[$scope.dataPointer] = input;
				break;
			case '[':
				if ($scope.tape[$scope.dataPointer] != 0)
					stack.push(programCounter);
				else
					while (code[++programCounter] != ']')
						;
				break;
			case ']':
				if ($scope.tape[$scope.dataPointer] != 0) {
					programCounter = stack.pop();
					stack.push(programCounter - 1);
				}
				break;
			}

			return programCounter;
		};

		$scope.tape[0] = 0;

		(function executeLoop(programCounter) {
			$timeout(function() {
				programCounter = execute(programCounter);				
				programCounter++;				
				if (programCounter < code.length) {					
					executeLoop(programCounter);
				}					
			}, 10);
		})(0);
	}

	$scope.run = function() {			
		if ($scope.code != undefined && $scope.code.length > 0) {						
			interpret($scope.code);
		}
	};
	$scope.save = function() {
		ngProgress.start();
		ngProgress.complete();
	};
}

function codeGenCtrl($scope) {
	$scope.gen = function() {
		if ($scope.text != undefined && $scope.text.length > 0) {
			BrainFuck.init();
			$scope.code = BrainFuck.generateCode($scope.text);
		} else {
			$scope.code = undefined;
		}
	}
}