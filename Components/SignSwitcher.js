import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class SignSwitcher extends LitElement {
    static properties = {
        startFlag: Boolean,
        sign: String,
        signAlph: Array
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
        margin: 0;
        border: 3px solid var(--txt);
        border-radius: 10px;
        padding: 1rem;
        width: 3rem;
        height: 3rem
    }

    .main-content__sign-inner {
        margin: 0;
        color: var(--txt);
        font-size: 2.5rem;
    }
    
    `

    signHandle(e) {
        console.log(e.target.value)
    }

    connectedCallback() {
        super.connectedCallback()
        this.sign = ''
        this.signAlph = ['summ', 'subt' ]
    }

    render() {
        return html`
        <section class="main flex">
            <h2 class="main-header">Sign</h2>
            <section class="main-content flex">
                <figure class="main-content__sign flex" name='sunn' value='summ' @click = ${(e) => this.signHandle(e)}>
                    <h3 class="main-content__sign-inner">+</h3>
                </figure>
                <figure class="main-content__sign flex">
                    <h3 class="main-content__sign-inner">-</h3>
                </figure>
                <figure class="main-content__sign flex">
                    <h3 class="main-content__sign-inner">×</h3>
                </figure>
                <figure class="main-content__sign flex">
                    <h3 class="main-content__sign-inner">÷</h3>
                </figure>
            </section>
        </section>
        
        `
    }
}

customElements.define('sign-switcher', SignSwitcher)