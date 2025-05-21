document.addEventListener('DOMContentLoaded', function () {
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let resetScreen = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (value >= '0' && value <= '9') {
                appendNumber(value);
            } else if (value === '.') {
                appendDecimal()
            } else if (value === 'C') {
                clear()
            } else if (value === '=') {
                compute()
            } else {
                setOperation(value)
            }
        })
    })

    function appendNumber(number) {
        if (currentInput === '0' || resetScreen) {
            currentInput = ''
            resetScreen = false
        }
        currentInput += number
        updateDisplay();
    }

    function appendDecimal() {
        if (resetScreen) {
            currentInput = '0'
            resetScreen = false
        }
        if (currentInput === '') {
            currentInput = '0'
        }
        if (!currentInput.includes('.')) {
            currentInput += '.'
        }
        updateDisplay()
    }

    function clear() {
        currentInput = '0'
        previousInput = ''
        operation = null
        updateDisplay()
    }

    function updateDisplay() {
        result.value = currentInput
    }

    function setOperation(op) {
        if (currentInput === '0') {
            return;
        }
        if (operation !== null && resetScreen) {
            compute()
        }

        if (currentInput !== '0' && operation === null) {
            previousInput = currentInput
            operation = op
            currentInput += ' ' + op + ' '
            resetScreen = true
        } else if (operation !== null && resetScreen) {
            operation = op
            currentInput = previousInput + ' ' + op + ''
        }

        currentInput = op
        updateDisplay()
    }

    function compute() {
        if (operation === null) {
            return
        }

        let computation
        const prev = parseFloat(previousInput)
        const current = parseFloat(currentInput)

        if (isNaN(prev) || isNaN(current))
            return

        switch (operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case 'x':
                computation = prev * current
                break;
            case '/':
                computation = prev / current
                break;
            default:
                return;
        }

        currentInput = computation.toString()
        operation = null
        resetScreen = true
        updateDisplay()
    }

    clear()
})