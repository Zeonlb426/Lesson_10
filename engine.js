window.addEventListener('load', function(){

    const calculator = document.getElementById('calculator');
    const buttonPanel = document.getElementById('button-panel');
    const display = document.getElementById('symbols');
    const memorySymbol = document.getElementById('memory-symbol');

    let currentValue = '0';
    let bufferValue = '0';
    let operationStack = null;
    let lastPressedButton = null;
    let memoryBuffer = 0;

    calculator.addEventListener('mousemove', function(event) {
        if(event.buttons == 1) {
         event.preventDefault();
         calculator.style.left = (calculator.offsetLeft+event.movementX)+'px';
         calculator.style.top = (calculator.offsetTop+event.movementY)+'px';
        }
    });

    buttonPanel.addEventListener('mousedown', (e) => {
        if ( IsButton(e) === false ) return;
        e.target.classList.add('pressed');
    });

    buttonPanel.addEventListener('mouseup', (e) => {
        if ( IsButton(e) === false ) return;
        e.target.classList.remove('pressed');
    });

    buttonPanel.addEventListener('click', function(e) {
        if ( IsButton(e) === false ) return;

        switch(e.target.dataset.button) {
            case "9":
            case "8":
            case "7":
            case "6":
            case "5":
            case "4":
            case "3":
            case "2":
            case "1":
            case "0":
            case "dot":
                if ( lastPressedButton !== null && lastPressedButton.dataset.type === 'operation') {
                    currentValue = '0'
                }
                currentValue = Concatenation(currentValue, e.target.dataset.button);
                DisplayShow(currentValue);
                break;

            case "ce":
                currentValue = '0';
                DisplayShow(currentValue);
                break;

            case "plus_minus":
                currentValue = (currentValue * -1).toString();
                DisplayShow(currentValue);
                break;

            case "mult":
            case "divide":
            case "plus":
            case "minus":
            case "equals":
                currentValue = Сalculate();
                bufferValue = currentValue;
                operationStack = e.target.dataset.button;
                DisplayShow(currentValue);
                break;

            case "sqrt":
                currentValue = Math.sqrt(currentValue);
                if (currentValue.toString().length > 10) {
                    currentValue % 1 !== 0 ? currentValue = currentValue.toString().slice(0, 10) : currentValue = (currentValue.toExponential(4)).toString();
                };
                DisplayShow(currentValue);
                break;

            case "on_off":
                operationStack = null;
                bufferValue = '0';
                currentValue = '0';
                DisplayShow(currentValue);
                break;

            case "m_plus":
                memoryBuffer = memoryBuffer + Number(currentValue);
                memorySymbol.style.opacity = 1;
                break;

            case "m_minus":
                memoryBuffer = memoryBuffer - Number(currentValue);
                memorySymbol.style.opacity = 1;
                break;

            case "mrc":
                if (lastPressedButton.dataset.button === 'mrc') {
                    memoryBuffer = 0;
                    memorySymbol.style.opacity = 0;
                    break;
                }
                currentValue = memoryBuffer.toString();
                DisplayShow(currentValue);
                break;
        }

        lastPressedButton = e.target;
    })

    /* 
    *  Функция проверки, что клик был осуществлен именно по кнопке. Путем проверки наличия атрибута "data-button" у элемента DOM-дерева.
    *  Функция ожидает на вход объект события и возвращает результат проверки в качестве булевого значения true либо false.
    */
    function IsButton(e) {
        return e.target.hasAttribute('data-button');
    }

    /* 
    *  Функция добавления набираемых цифр. Принимает два параметра, первое - текущее значение числа отображаемое на дисплее, второе - введенная цифра. (7 + 8 -> 78)
    *  Для того чтобы это было именно объединение, а не арифметическая операция сложения, оба аргумента приводятся к типу "строка".
    */
    function Concatenation(currentValue, buttonValue) {

        if (currentValue.length >= 10) return currentValue;
        
        if (buttonValue === 'dot') return currentValue.includes('.') ? currentValue : currentValue + '.';

        return currentValue.includes('.') ? currentValue + buttonValue : Number(currentValue + buttonValue).toString();
    }

    /* 
    *  Функция отображения значения на экран. Ожидает на вход значение, необходимое для отображения. 
    */
    function DisplayShow(currentValue) {
        display.innerText = currentValue;
    }

    /* 
    *  Функция выполняет арифметические операции, если таковые есть в стеке операций. 
    */
    function Сalculate() {
        if (operationStack === null || operationStack === 'equals') return currentValue;
        let result = 0;
        switch(operationStack) {
            case "mult":
                result = Number(bufferValue) * Number(currentValue);
                break;
            case "divide":
                result = Number(bufferValue) / Number(currentValue);
                break;
            case "plus":
                result = Number(bufferValue) + Number(currentValue);
                break;
            case "minus":
                result = Number(bufferValue) - Number(currentValue);
                break;
        }

        operationStack = null;

        if (result.toString().length > 10) {
            result % 1 !== 0 ? result = result.toString().slice(0, 10) : result = result.toExponential(4);
        };

        return result.toString();
    }

});
