const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
    const expression = expr()
    line.split(' ').forEach(term => {
        if(term) {
            expression.eat(term)
        }
    })

    expression.print()
});

function expr() {
    return {
        _value: 0,
        operand: '+',
        _leftHand: 0,
        _rightHand: 0,
        _variable: '',
        _currentPosition: 'left',
        _variablePosition: 'left',
        _variableSign: 1,
        eat: function (term) {
            switch (true) {
                case term === '=':
                    this._leftHand = this._value;
                    this._value = 0;
                    this._currentPosition = 'right';
                    this.operand = '+';
                    break;
                case '+-'.includes(term):
                    this.operand = term;
                    break;
                case term && !isNaN(term):
                    this.addNumber(parseInt(term));
                    break;
                case term && isNaN(term) && /[-+]*[a-zA-Z]/.test(term):
                    this.setVariable(term);
                    break;
            }
        },
        addNumber: function (value) {
            if (this.operand === '-') value = -value;
            this._value += value;
            this.operand = '+';
        },
        setVariable: function (value) {
            this._variable = value.replace(/[+-]/, '');

            this._variableSign = String(value).startsWith('-') ? -1 * Number(this.operand+1) : Number(this.operand+1) ;

            this._variablePosition = this._currentPosition;
            this.operand = '+';
        },
        solve: function () {
            this._rightHand = this._value;
            if (this._variablePosition === 'left') {
                return (this._rightHand - this._leftHand) * this._variableSign;
            } else {
                return (this._leftHand - this._rightHand) * this._variableSign ;
            }
        },
        print: function () {
            console.log(`${this._variable} = ${this.solve()}`);
        }
    };
}
