import { LitElement, html, css } from "lit";
export class StartModule extends LitElement {
    static properties = {
        startFlag: Boolean,
        digit: Number,
        correctionFlag: Boolean,
        signCheck: Number
    }

    static styles = css`
        .start {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--sbg);
            border-radius: 10px;
            height: 100%;
        }

        .start-button {
            color: var(--txt);
            background-color: var(--sbg);
            border: 3px solid var(--txt);
            border-radius: 10px;
            font-size: 2.5rem;
            font-family: 'Montserrat', sans-serif;
            font-weight: bolder;
            width: 8rem;
            height: 4.5rem;
            padding: 0.5rem;
            text-align: center;
            outline: none;
            user-select: none;
            cursor: pointer;
        }

        .started {
            display: none
        }

        .incorrect {
            border-color: var(--err);
        }
    `

    startFunc(e) {
        if ((this.digit > 0 & this.digit < 10) && this.signCheck)  {
                this.startFlag = true
                this.correctionFlag = true
                dispatchEvent(new CustomEvent('start-handle', {
                    bubbles: true,
                    detail: {startFlag: this.startFlag}
            }))
        }
        else {
            this.correctionFlag = false
        }
    }

   
    connectedCallback() {
        super.connectedCallback()
        this.startFlag = false
        window.addEventListener('digit-handle', (e) => {
            this.digit = e.detail.digit
        })
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
        })
        window.addEventListener('sign-check', (e) => {
            this.signCheck = e.detail.signCheck
        })
        this.correctionFlag = true
        this.signCheck = true
    }

    render() {
        return html`
            <section class='start ${this.startFlag ? 'started' : ''}'>
                <button class='start-button ${this.correctionFlag ? '' : 'incorrect'}' @click = ${(e) => this.startFunc(e)} >Start</button>
            </section>
        `
    }
}

customElements.define('start-module', StartModule)