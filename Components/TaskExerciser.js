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
        lastValue: Number
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
        direction: rtl;
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

    timerOn() {
        setInterval(() => 
        (this.time+=1),
        10);  
    }

    handleSumUp(e) {
        if (e.key === 'Enter') {
            if (this.firstNumber + this.secondNumber == e.target.value) {
                this.correctionFlag = true
                this.firstNumber = this.randomDigit()
                this.secondNumber = this.randomDigit()
                e.target.value = ''
                this.time/=100
                this.attempts+=1
                this.avgTime+=this.time
                this.avgTimeRes=((this.avgTime / this.attempts)).toFixed(2)
                dispatchEvent(new CustomEvent ('task-executer', {
                    bubbles: true,
                    detail: {
                        time: (this.time).toFixed(2),
                        avgTime: this.avgTimeRes
                    }
                }))
            }
            else {
                this.correctionFlag = false
            }
        }
    }

    reverseText(e) {
        let currentValue = e.target.value.split('')
        let currentLen = currentValue.length
        if (currentLen < this.lastLen) {
            e.target.value = (this.lastValue.slice(1)).join('')
        }
        console.log(this.lastValue)
        console.log(currentValue)
        currentValue = this.lastValue.slice(1)
        this.lastLen = currentLen
        this.lastValue = currentValue
        /*
        let inputState = e.target.value.split('')
        console.log(inputState)
        
        let currentValue = e.target.value.slice(-1)
        e.target.value = ''
        var newArray = this.revString.slice();

        newArray.unshift(currentValue);
        this.revString = newArray

        e.target.value = this.revString.join('') */
    }


    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('digit-handle', (e) => {
            this.num = e.detail.digit
            this.firstNumber = this.randomDigit()
            this.secondNumber = this.randomDigit()
        })
        
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
            this.timerOn()
        })
        
        this.time = 0
        this.avgTime = 0
        this.avgTimeRes = 0
        this.attempts = 0
        this.lastLen = 0
        this.lastValue = []
        this.correctionFlag = true
        this.revString = []
        
    }

    render() {
        return html`
        <main class="flex ${this.startFlag ? '' : 'unstarted'}">
            <section class="flex counter">
                <figure class="flex counter-content">
                    <figure class="flex counter-content__expression">
                        <h2 id="firstNumber">${this.firstNumber}</h2>
                        <h2>+</h2>
                        <h2 id="secondNumber">${this.secondNumber}</h2>
                    </figure>
                    <input  class="counter-content__input ${this.correctionFlag ? '' : 'incorrect'}" @keyup = ${(e) => this.handleSumUp(e)} @input = ${(e) => this.reverseText(e)} id="counterInput" inputmode="numeric" dir='rtl'>
                </figure>
            </section>
        </main>`
    }
}

customElements.define('task-engine', TaskExerciser)