import { LitElement, html, css } from "lit";
export class SignSwitcher extends LitElement {
    static properties = {
        startFlag: Boolean,
        sign: String,
        signAlph: Array,
        signStatus: Array,
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
    }

    .main-content__sign-inner {
        margin: 0;
        color: var(--txt);
        font-size: 2.5rem;
        cursor: pointer;
        border-radius: 10px;
        margin: 0;
        border: 3px solid var(--txt);
        background-color: var(--sbg);
        width: 5rem;
        height: 5rem
    }

    .started {
        display: none;
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
        let arrSign = [...this.signStatus];
        arrSign[value] = !(arrSign[value])
        this.signStatus = [...arrSign]
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
                    <button value='0' class="main-content__sign-inner flex ${(this.signStatus[0]) ? 'on' : ''}" @click = ${(e) => this.signHandle(e)}>+</button>
                </figure>
                <figure class="main-content__sign flex">
                    <button value='1' class="main-content__sign-inner ${(this.signStatus[1]) ? 'on' : ''}" @click = ${(e) => this.signHandle(e)}>-</button>
                </figure>
                <figure class="main-content__sign flex">
                    <button value='2' class="main-content__sign-inner ${(this.signStatus[2]) ? 'on' : ''}" @click = ${(e) => this.signHandle(e)}>×</button>
                </figure>
                <figure class="main-content__sign flex">
                    <button value='3' class="main-content__sign-inner ${(this.signStatus[3]) ? 'on' : ''}" @click = ${(e) => this.signHandle(e)}>÷</button>
                </figure>
            </section>
        </section>
        
        `
    }
}

customElements.define('sign-switcher', SignSwitcher)