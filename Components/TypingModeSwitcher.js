import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class TypingModeSwitcher extends LitElement {
    static properties = {
        rtlFlag: Boolean,
        startFlag: Boolean,
    }

    static styles = css`
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
        font-size: 2.5rem;
    }

    .switcher-content__ltr, .switcher-content__rtl {
        flex-direction: row;
        align-items: center;
        gap: 1rem
    }

    .switcher-content__ltr-input, .switcher-content__rtl-input {
        width:1.2rem;
        height: 1.2rem;
        appearence: none;
        accent-color: var(--txt);
        background-color: var(--sbg);
        border: 3px solid var(--txt);
        border-radius: 10px;
        margin: 0
    }

    .switcher-content__ltr-label, .switcher-content__rtl-label {
        font-size: 2rem;
        color: var(--txt)
    }

    .started {
        display: none;
    }
    `

    rtlHandle(e) {
        dispatchEvent(new CustomEvent ('type-handle', {
            detail: {type: e.target.value}
        }))
    }

    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
        })
    }

    render() {
        return html`
        <section class='flex switcher ${this.startFlag ? 'started' : ''}'>
            <h2 class='switcher-header'>Writing type</h2>
            <section class='switcher-content'>
                <figure class = 'flex switcher-content__ltr'>
                    <input id='ltr' class='switcher-content__ltr-input' name='type-mode' checked='true' value='ltr' type='radio' @input = ${(e) => this.rtlHandle(e)}>
                    <label for='ltr' class = 'switcher-content__ltr-label'>Left-to-right</label>
                </figure>
                <figure class = 'flex switcher-content__rtl'>
                    <input id='rtl' class='switcher-content__rtl-input' name='type-mode' value='rtl' type='radio' @input = ${(e) => this.rtlHandle(e)}>
                    <label for='rtl' class = 'switcher-content__rtl-label'>Right-to-left</label>
                </figure>
            </section>
        </section>
        `
    }
}

customElements.define('type-mode', TypingModeSwitcher)