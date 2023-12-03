import { LitElement, html, css } from "lit";

export class AuthButton extends LitElement {
    static properties = {
        authFlag: Boolean,
        startFlag: Boolean,
    }

    static styles = css`
    main {
        display: flex;
        flex-direction: column
    }

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

    .auth {
        position: absolute;
        top: 8rem;
        left: 2rem;
        height: 80%;
        width: 30%;
        background-color: var(--sbg);
        border-radius: 10px
    }

    .started {
        display: none
    }

    .unstarted {
        display: none
    }
    `
    authHandle() {
        this.authFlag = !this.authFlag
    }


    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
        })
        
        this.authFlag = false
    }
    
    render() {
        return html`
        <main>
            <section class='${this.startFlag ? 'started' : ''}'>
                <button class='back-button' @click = ${(e) => this.authHandle()}>Log in</button>
            </section>
            <section class='auth ${this.authFlag ? '' : 'unstarted'}'>
            </section>
        </main>
        `
    }
}

customElements.define('auth-button', AuthButton)