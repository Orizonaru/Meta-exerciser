import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class TimerModule extends LitElement {
    static properties = {
        time: Number,
        avgTime: Number,
        startFlag: Boolean,
        attempts: Number
    }

    static styles = css`
        .timer {
            flex-direction: column;
        }

        .timer-field, .avgtime-field, .attTime-field {
            display: flex;
            position: absolute;
            top: 2rem;
            right: 2rem;
            gap: 0.5rem;
            padding: 2rem;
            border-radius: 10px;
            font-size: 1.5rem;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: bolder;
            color: var(--txt);
            background-color: var(--sbg)
        }

        .avgtime-field {
            top: 15rem
        }

        .attTime-field {
            top: 28rem
        }


        .unstarted {
            display: none
        }
    `

    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('task-executer', (e) => {
            this.time = e.detail.time,
            this.avgTime = e.detail.avgTime
            this.attempts = e.detail.attempts
        })
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
        })
        
    }

    render() {
        return html`
        <section class="flex timer ${this.startFlag ? '' : 'unstarted'}">
            <figure class="timer-field">
                <h1 class="timer-field__header" id="timerField">${this.time}</h1>
                <h1 class="timer-field__subheader"> sec</h1>
            </figure>
            <figure class="avgtime-field">
                <h1 class="avgtime-field__header" id="avgTimeField">${this.avgTime}</h1>
                <h1 class="avgtime-fieldd__subheader"> sec</h1>
            </figure>
            <figure class="attTime-field">
                <h1 class="avgtime-field__header" id="attField">${this.attempts}</h1>
                <h1 class="avgtime-fieldd__subheader"> times</h1>
            </figure>
        </section>
        `
    }
}

customElements.define('time-module', TimerModule)