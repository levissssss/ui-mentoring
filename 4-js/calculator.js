(function() {

    let currentInput = "";
    let lastValue = null;
    let currentOperation = null;

    let printToDisplay = (input) => {
        document.getElementById("display").innerText = input;
    }
    
    let addToHistory = (addition) => {
        node = document.getElementById("history");
        current = node.innerText;
        node.innerText = current + addition;
    }

    const clearHistory = () => {
        document.getElementById("history").innerText = "";
    }

    const roundToFixed = (num) => {
        return String(Math.round(num * Math.pow(10, 14)) / Math.pow(10, 14));
    }

    const handleNumberClick = function(event) {
        value = this.innerText;
        if (value === "." && !currentInput){
            value = "0."
        }
        if (value !== "." || currentInput.indexOf(".") == -1) {
            currentInput += value;
            printToDisplay(currentInput);
            addToHistory(value);
        }
    }
    
    const handleOperatorClick = function(event) {
        operator = this.innerText;
        if (currentOperation && currentInput) {
            //chained ops
            lastValue = calculateOperation();
            clearHistory();
            addToHistory(lastValue);
            addToHistory(operator);
        } else {
            if (currentInput) {
                //first op
                lastValue = parseFloat(currentInput);
                addToHistory(operator);
            } else {
                //op with last result
                clearHistory();
                addToHistory(lastValue);
                addToHistory(operator);
            }
        }
        currentOperation = this.id;
        currentInput = "";    
        printToDisplay(operator);
    }
    
    const handleEquals = function(e) {
        let result;
        if (currentInput && lastValue) {
            result = calculateOperation();
        } else if (currentInput){
            result = currentInput;
        } else if (lastValue) {
            result = lastValue;
        }
        lastValue = result;
        currentInput = "";
        currentOperation = null;
        addToHistory("=" + roundToFixed(result));
        printToDisplay(roundToFixed(result));

    }
    
    const handleClear = function(e) {
        currentInput = "";
        lastValue = null;
        currentOperation = null;
        clearHistory();
        printToDisplay("");        
    }
    
    const calculateOperation = () => {
        currentAsFloat = parseFloat(currentInput);
        switch (currentOperation) {
            case "divide":
                return lastValue / currentAsFloat;
            case "multiply":
                return lastValue * currentAsFloat;
            case "add":
                return lastValue + currentAsFloat;
            case "subtract":
                return lastValue - currentAsFloat;
            default:
                console.log("Unsupported operation")
        }
    }

    window.onload = function() {
        Array.from(document.getElementsByClassName("number")).forEach(element => {
            element.addEventListener("click", handleNumberClick);
        });
        Array.from(document.getElementsByClassName("operator")).forEach(element => {
            element.addEventListener("click", handleOperatorClick);
        });
        document.getElementById("equals").addEventListener("click", handleEquals);
        document.getElementById("clear").addEventListener("click", handleClear);
    }
    
})();

