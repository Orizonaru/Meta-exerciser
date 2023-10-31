import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class DigitSwitcher extends LitElement {

    static properties = {
        startFlag: Boolean,
        correctionFlag: Boolean
    }

    static styles = [
        css`
        .flex {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            flex-grow: 1;
        }

        .switcher {
            background-color: var(--sbg);
            border-radius: 10px;
            padding: 1rem;
        }

        .switcher-header {
            margin: 0;
            color: var(--txt);
            font-size: 3rem;
        }

        .switcher-input {
            color: var(--txt);
            background-color: var(--sbg);
            border: 3px solid var(--txt);
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

        .started {
            display: none;
        }

        .incorrect {
            border-color: var(--err);
        }
    `]

    digitSwitcher(e) {
        if (0 < e.target.value && e.target.value < 10) {
            this.correctionFlag = true
            dispatchEvent(new CustomEvent ('digit-handle', {
                bubbles: true,
                detail: {digit: e.target.value}
            }))
        }
        else {
            this.correctionFlag = false
        }
    }

    connectedCallback() {
        super.connectedCallback()
        this.correctionFlag = true
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
        })
    }

    render() {
        return html`
        <section class='flex switcher ${this.startFlag ? 'started' : ''}'>
            <h2 class='switcher-header'>Digit</h2>
            <input class='switcher-input ${this.correctionFlag ? '' : 'incorrect'}' @input = ${(e) => this.digitSwitcher(e)} type='number'>
        </section>
        `
    }

}

customElements.define('digit-switcher', DigitSwitcher)