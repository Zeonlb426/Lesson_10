window.addEventListener('load', function(){

    const calculator = document.getElementById('calculator');
    const buttonPanel = document.getElementById('button-panel');
    const display = document.getElementById('symbols');
    const memorySymbol = document.getElementById('memory-symbol');

    let currentState = '0';
    let bufferState = '0';
    let operation = null;
    let clearFlag = false;
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
                CheckState();
                currentState = Concatenation(currentState, e.target.dataset.button);
                DisplayShow(currentState);
                break;

            case "dot":
                CheckState();
                currentState = Concatenation(currentState, '.');
                DisplayShow(currentState);
                break;

            case "ce":
                DisplayClear();
                currentState = '0';
                break;

            case "plus_minus":
                currentState = (currentState * -1).toString();
                DisplayShow(currentState);
                break;

            case "mult":
            case "divide":
            case "plus":
            case "minus":
                if (clearFlag) {
                    operation = e.target.dataset.button;
                } else {
                    currentState = Сalculate();
                    bufferState = currentState;
                    operation = e.target.dataset.button;
                    clearFlag = true;
                    DisplayShow(currentState);
                }
                break;

            case "equals":
                currentState = Сalculate();
                bufferState = currentState;
                operation = null;
                clearFlag = true;
                DisplayShow(currentState);
                break;

            case "on_off":
                operation = null;
                bufferState = '0';
                currentState = '0';
                DisplayShow(currentState);
                break;
        }

console.log(e.target.dataset.button);
    })

    /* 
    *  Функция проверки, что клик был осуществлен именно по кнопке. Путем проверки наличия атрибута "data-button" у элемента DOM-дерева.
    *  Функция ожидает на вход объект события и возвращает результат проверки в качестве булевого значения true либо false.
    */
    function IsButton(e) {
        return e.target.hasAttribute('data-button');
    }

    /* 
    *  Функция очистки экрана. Устанавливает "0" в качестве отображения по умолчанию. 
    */
    function DisplayClear() {
        display.innerText = '0';
    }

    /* 
    *  Функция добавления набираемых цифр. Принимает два параметра, первое - текущее значение числа отображаемое на дисплее, второе - введенная цифра. (7 + 8 -> 78)
    *  Для того чтобы это было именно обединение, а не арифметическая операция сложения, оба аргумента приводятся к типу "строка".
    */
    function Concatenation(currentState, buttonValue) {

        currentState = currentState.toString();
        buttonValue = buttonValue.toString();

        if (currentState.length >= 10) return currentState;
        if (buttonValue === '.') return currentState.includes('.') ? currentState : currentState + buttonValue;

        return currentState.includes('.') ? currentState + buttonValue : Number(currentState + buttonValue).toString();
    }

    /* 
    *  Функция отображения значения на экран. Ожидает на вход значение, необходимое для отображения. 
    */
    function DisplayShow(currentState) {
        display.innerText = currentState;
    }

    function Сalculate() {
        if (operation === null) return currentState;
        let result = 0
        switch(operation) {
            case "mult":
                result = Number(bufferState) * Number(currentState);
                break;
            case "divide":
                result = Number(bufferState) / Number(currentState);
                break;
            case "plus":
                result = Number(bufferState) + Number(currentState);
                break;
            case "minus":
                result = Number(bufferState) - Number(currentState);
                break;
        }
        operation = null
        return result.toString()
    }

    function CheckState() {
        if (clearFlag) {
            clearFlag = false;
            DisplayClear();
            currentState = '0';
        }
    }

});



//     const display = document.getElementById('display');
//     const operationButtons = document.getElementById('operation-panel');
//     const panelDigitButtons = document.getElementById('digit-panel');

//     let number = 0;
//     let operation = '';
//     let buffer = 0;

//     panelDigitButtons.addEventListener('click', function(e){

//         if ( IsButton(e) === false ) return;

//         if (e.target.dataset.button === "clear") {
//             DisplayClear();
//             ResetAll();
//             return;
//         }

//         if (e.target.dataset.button === "backspace") {
//             number = Backspace(number);
//             DisplayShow(number);
//             return;
//         }

//         number = Concatenation(number, e.target.dataset.button);
//         DisplayShow(number);
//     })

//     operationButtons.addEventListener('click', function(e){

//         if ( IsButton(e) === false ) return;

//         if (e.target.dataset.button === "=") {
//             number = operation !== '' ? Calculate(buffer + operation + number)  : number;
//             DisplayShow(number);
//             return;
//         }

//         if (operation !== '') {
//             number = Calculate(buffer + operation + number);
//             DisplayShow(number);
//         }

//         operation = e.target.dataset.button;
//         buffer = number;
//         number = 0;
//     })

//     panelDigitButtons.addEventListener('mousedown', (e) => {
//         if ( IsButton(e) === false ) return;
//         e.target.classList.remove('hover');
//         e.target.classList.add('down');
//     });

//     panelDigitButtons.addEventListener('mouseup', (e) => {
//         if ( IsButton(e) === false ) return;
//         e.target.classList.add('hover');
//         e.target.classList.remove('down');
//     });

//     panelDigitButtons.addEventListener("mouseout", (e) => {
//         if ( IsButton(e) === false ) return;
//         e.target.classList.add('hover');
//         e.target.classList.remove('down');
//     });

//     operationButtons.addEventListener('mousedown', (e) => {
//         if ( IsButton(e) === false ) return;
//         e.target.classList.remove('hover');
//         e.target.classList.add('down');
//     });

//     operationButtons.addEventListener('mouseup', (e) => {
//         if ( IsButton(e) === false ) return;
//         e.target.classList.add('hover');
//         e.target.classList.remove('down');
//     });

//     operationButtons.addEventListener("mouseout", (e) => {
//         if ( IsButton(e) === false ) return;
//         e.target.classList.add('hover');
//         e.target.classList.remove('down');
//     });

//     /* 
//     *  Функция удаления последнего символа. Возвращает "0", если число состояло из одного символа или возвращает число без последнего символа (785 -> 78).
//     *  Функция ожидает на вход строку символов. Пришедший аргумент конвертируется в число для удаления впереди стоящих нулей, если таковые имели место,
//     *  затем, конвертируется в строку для работы с ним, как с массивом.
//     */
//     function Backspace(number) {
//         let typeNumber = Number(number);
//         if (typeNumber.toString().length < 2) return '0';
//         return Number(typeNumber.toString().slice(0, -1));
//     }

//     /* 
//     *  Функция проверки, что клик был осуществлен именно по кнопке. Путем проверки наличия атрибута "data-button" у элемента DOM-дерева.
//     *  Функция ожидает на вход объект события и возвращает результат проверки в качестве булевого значения true либо false.
//     */
//     function IsButton(e) {
//         return e.target.hasAttribute('data-button');
//     }

//     /* 
//     *  Функция очистки экрана. Устанавливает "0" в качестве отображения по умолчанию. 
//     */
//     function DisplayClear() {
//         display.innerText = 0;
//     }

//     /* 
//     *  Функция отображения значения на экран. Ожидает на вход значение, необходимое для отображения. 
//     */
//     function DisplayShow(number) {
//         display.innerText = Number(number);
//     }

//     /* 
//     *  Функция сброса всех переменных к значениям по умолчанию. Удалят все текущие данные, хранящиеся в переменных. 
//     */
//     function ResetAll() {
//         number = 0;
//         operation = '';
//         buffer = 0;
//     }

//     /* 
//     *  Функция расчета результата. Принимает строку, в которой указана последовательность операндов и операторов, превращая эту строку в исполнительное выражение. 
//     */
//     function Calculate(executionStack) {
//         return eval(executionStack);
//     }

//     /* 
//     *  Функция добавления набираемых цифр. Принимает два параметра, первое - текущее значение числа, второе - введенная цифра. (7 + 8 -> 78)
//     *  Для того чтобы это было именно обединение, а не арифметическая операция сложения, оба аргумента приводятся к типу "строка".
//     */
//     function Concatenation(number, currentNumber) {
//         if (number.toString().length > 11) return Number(number);
//         return Number(number.toString() + currentNumber.toString());
//     }

