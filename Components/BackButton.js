import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class BackButton extends LitElement {
    static properties = {
        backFlag: Boolean,
        startFlag: Boolean,
    }

    static styles = css`
    .back-button {
        position: absolute;
        top: 2rem;
        left: 2rem;
        color: var(--txt);
        border: 3px solid var(--txt);
        background-color: var(--sbg);
        border-radius: 10px;
        font-size: 2rem;
        font-weight: bolder;
        width: 8rem;
        height: 4.5rem;
        padding: 0.5rem;
        text-align: center;
        outline: none;
        user-select: none;
        cursor: pointer;
    }

    .unstarted {
        display: none
    }
    `
    backHandle() {
        this.startFlag = false
        this.backFlag = true
        dispatchEvent(new CustomEvent('start-handle', {
            bubbles: true,
            detail: {
                startFlag: this.startFlag,
                backFlag: this.backFlag
            }
        }))
    }


    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
        })
        this.backFlag = false
    }
    
    render() {
        return html`
        <section class='${this.startFlag ? '' : 'unstarted'}'>
            <button class='back-button' @click = ${(e) => this.backHandle()}>Back</button>
        </section>
        `
    }
}

customElements.define('back-button', BackButton)