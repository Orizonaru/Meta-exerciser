import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";


export class TaskExerciser extends LitElement {
    static properties = {
        num: Number,
        firstNumber: Number,
        secondNumber: Number,
        correctionFlag: Boolean,
        startFlag: Boolean,
        time: Number, 
        avgTime: Number, 
        attempts: Number,
        avgTimeRes: Number,
        revString: Array,
        lastLen: Number,
        curValGlob: Array,
        typeFlag: String,
        backFlag: Boolean,
        timerOn: Number,
        expressionSign: String,
        signStatArray: Array,
        signArray: Array,
        signStatProd: Array,
        signIndex: Number,
        signString: Number,
        curStatArray: Array
    }

    static styles = 
        css`
    .flex {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body, main {
        margin: 0;
    }
    
    .counter-content {
        flex-direction: column;
    }
    
    .counter {
        flex-direction: column;
        background-color: var(--sbg);
        border-radius: 15px;
        width: 35rem;
        height: 40%;
        overflow: hidden;
    }
    
    .counter-content__header {
        color: var(--txt);
        font-size: 2.5rem;
        margin:1rem
    }
    
    .counter-content__expression {
        margin: 0;
        color: var(--txt);
        font-size: 2rem
    }
    
    .counter-content__input {
        color: var(--txt);
        background-color: var(--sbg);
        border: 5px solid var(--txt);
        border-radius: 10px;
        margin-top: 1rem;
        font-size: 2.5rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bolder;
        width: 8rem;
        height: 4.5rem;
        padding: 0.5rem;
        text-align: center;
        outline: none;
        user-select: none;
    }
    
    .incorrect {
        border-color: var(--err)
    }

    .unstarted {
        display: none
    }
    `

    randomDigit() {
        return Math.floor((Math.random() * (80*(10**(this.num-2))-1)+(10**(this.num-1))));
    }


    timerOff() {
        clearInterval(this.timerOn)
    }

    dispatchTime() {
        this.time/=100
        this.attempts+=1
        this.avgTime+=this.time
        this.avgTimeRes=((this.avgTime / this.attempts)).toFixed(2)
        dispatchEvent(new CustomEvent ('task-executer', {
            bubbles: true,
            detail: {
                time: (this.time).toFixed(2),
                avgTime: this.avgTimeRes,
                attempts: this.attempts
            }
        }))
        this.lastLen = 0
        this.curValGlob = []
    }

    randomDivisionDigit() {
        let a = []
        while (a.length === 0) {
            let first = this.randomDigit()
            let second = this.randomDigit()
            if (first % second === 0 && first != 1 && second != 1 && first != second) {
                a.push(first, second)
            }
        }
        return a
    }

    checkFunc(sI) {
        if (sI != 3) {
            this.firstNumber = this.randomDigit()
            this.secondNumber = this.randomDigit()
        } else {
            let divArr = this.randomDivisionDigit()
            this.firstNumber = parseInt(divArr.slice(0,1))
            this.secondNumber = parseInt(divArr.slice(-1))
        }
        
    }

    handleSumUp(e) {
        if (e.key === 'Enter') {
            if (eval(String(this.firstNumber) + this.signString + String(this.secondNumber)) == e.target.value) {
                this.signIndex = this.curStatArray[Math.floor(Math.random()*(this.curStatArray.length))]
                this.signString = this.signArray[this.signIndex]
                this.checkFunc(this.signIndex)
                this.dispatchTime()
                this.correctionFlag = true
                e.target.value = ''
            } else {
                this.correctionFlag = false
            }
        }
    }
            

    reverseText(e) {
        if (this.typeFlag === 'rtl') {
            let currentValue = e.target.value.split('')
            let newElm = currentValue.slice(-1)     // взятие нового
            let currentLen = currentValue.length
            if (currentLen < this.lastLen) {
                this.curValGlob = this.curValGlob.slice(0, this.curValGlob.length-1)    
                this.curValGlob = this.curValGlob.reverse() 
                e.target.value = this.curValGlob.join('')   // пулл в строку нового
                this.curValGlob = this.curValGlob.reverse()
                this.lastLen = this.curValGlob.length
            } else {
                this.curValGlob.push(String(newElm))
                this.curValGlob = this.curValGlob.reverse()
                e.target.value = this.curValGlob.join('')       // пулл в строку нового
                this.curValGlob = this.curValGlob.reverse()
                this.lastLen = this.curValGlob.length
            }
        }
    }


    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('digit-handle', (e) => {
            this.num = e.detail.digit
        })
        
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
            this.backFlag = e.detail.backFlag
            if (this.startFlag === true) {
                this.timerOn = setInterval(() => (this.time+=1), 10)
                this.signIndex = this.curStatArray[Math.floor(Math.random()*(this.curStatArray.length))]
                this.signString = this.signArray[this.signIndex]
                this.checkFunc(this.signIndex)
            } 
            if (this.backFlag === true) {
                this.timerOff()
                this.time = 0
                this.attempts = 0
                this.avgTime = 0
                this.avgTimeRes = 0
                dispatchEvent(new CustomEvent ('task-executer', {
                    bubbles: true,
                    detail: {
                        time: (this.time).toFixed(2),
                        avgTime: this.avgTimeRes,
                        attempts: this.attempts
                    }
                }))
            }
        })

        window.addEventListener('type-handle', (e) => {
            this.typeFlag = e.detail.type
        })

        window.addEventListener('sign-handle', (e) => {
            this.signStatArray = e.detail.signArray
            this.curStatArray = []
            for (let i = 0; i <= this.signStatArray.length-1; i++) {
                if (this.signStatArray[i]) {
                    this.curStatArray.push(i)
                }
            }
            dispatchEvent(new CustomEvent('sign-check', {
                detail: {
                    signCheck: this.curStatArray.length
                }
            }))
        })
        
        this.time = 0
        this.avgTime = 0
        this.avgTimeRes = 0
        this.attempts = 0
        this.lastLen = 0
        this.correctionFlag = true
        this.revString = []
        this.curValGlob = []
        this.typeFlag = 'ltr'
        this.expressionSign = 'div'
        this.signArray = ['+', '-', '*', '/']
        this.signStatArray = [true, false, false, false]
        this.curStatArray = [0]
        this.signString = ''
    }

    render() {
        return html`
        <main class="flex ${this.startFlag ? '' : 'unstarted'}">
            <section class="flex counter">
                <figure class="flex counter-content">
                    <figure class="flex counter-content__expression">
                        <h2 id="firstNumber">${this.firstNumber}</h2>
                        <h2>${this.signString}</h2>
                        <h2 id="secondNumber">${this.secondNumber}</h2>
                    </figure>
                    <input  class="counter-content__input ${this.correctionFlag ? '' : 'incorrect'}" @keyup = ${(e) => this.handleSumUp(e)} @input = ${(e) => this.reverseText(e)} id="counterInput" inputmode="numeric">
                </figure>
            </section>
        </main>`
    }
}

customElements.define('task-engine', TaskExerciser)