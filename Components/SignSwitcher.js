import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class SignSwitcher extends LitElement {
    static properties = {
        startFlag: Boolean,
        sign: String,
        signAlph: Array,
        signStatus: Array
    }

    static styles = css`
    .flex {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex-grow: 1;
    }

    .main {
        background-color: var(--sbg);
        border-radius: 10px;
        padding: 1rem;
        gap: 1rem
    }

    .main-header {
        margin: 0;
        color: var(--txt);
        font-size: 2.5rem;
    }

    .main-content {
        flex-direction: row;
        gap: 1rem
    }

    .main-content__sign {
        cursor: pointer;
        border-radius: 10px;
        margin: 0;
        border: 3px solid var(--txt);
        width: 3rem;
        height: 3rem
    }

    .main-content__sign-inner {
        margin: 0;
        color: var(--txt);
        font-size: 2.5rem;
    }

    .started {
        display: none;
    }

    .button {
        
    }
      
    .text {
        font-size: 3rem;
        margin: 0
    }
      
    .on {
        border: 6px solid var(--txt)
    }
    
    `

    signHandle(e) {
        
        let value = parseInt(e.target.value)
        this.signStatus[value] = !(this.signStatus[value])
        dispatchEvent(new CustomEvent ('sign-handle', {
            bubbles: true,
            detail: {
                signArray: this.signStatus
            }
        }))
    }

    connectedCallback() {
        super.connectedCallback()
        this.sign = ''
        this.signStatus = [true, false, false, false]
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
            this.backFlag = e.detail.backFlag
        })

    }

    render() {
        return html`
        <section class="main flex ${this.startFlag ? 'started' : ''}">
            <h2 class="main-header">Sign</h2>
            <section class="main-content flex">
                <figure class="main-content__sign flex">
                    <button value='0' class="main-content__sign-inner" @click = ${(e) => this.signHandle(e)}>+</button>
                </figure>
                <figure class="main-content__sign flex">
                    <button value='1' class="main-content__sign-inner" @click = ${(e) => this.signHandle(e)}>-</button>
                </figure>
                <figure class="main-content__sign flex">
                    <button value='2' class="main-content__sign-inner" @click = ${(e) => this.signHandle(e)}>×</button>
                </figure>
                <figure class="main-content__sign flex">
                    <button value='3' class="main-content__sign-inner" @click = ${(e) => this.signHandle(e)}>÷</button>
                </figure>
            </section>
        </section>
        
        `
    }
}

customElements.define('sign-switcher', SignSwitcher)