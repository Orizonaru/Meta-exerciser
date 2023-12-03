import { LitElement, html, css } from "lit";
export class MetricsModule extends LitElement {
    static properties = {
        time: Number,
        avgTime: Number,
        startFlag: Boolean,
        attempts: Number,
        metricStatArray: Array,
        percent: Number,
    }

    static styles = css`
        .flex {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .metric {
            flex-direction: column;
            align-items: flex-end;
            gap: 2rem;
            bottom: 0;
            right: 0;
        }

        .metric-field {
            display: none;
            padding: 2rem;
            border-radius: 10px;
            font-size: 1.5rem;
            font-family: 'Montserrat', sans-serif;
            font-weight: bolder;
            color: var(--txt);
            background-color: var(--sbg);
            
        }

        .metric-field__header {
            margin-right: 0.5rem
        }

        .unstarted {
            display: none
        }

        .on {
            display: flex
        }
    `

    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('task-executer', (e) => {
            this.time = e.detail.time,
            this.avgTime = e.detail.avgTime
            this.attempts = e.detail.attempts
            this.percent = e.detail.percent
            console.log(this.percent)
        })
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
            this.percent = '-'
        })
        window.addEventListener('metrics-handle', (e) => {
            this.metricStatArray = e.detail.metrics
        })

        this.metricStatArray = [true, false, false, false]
        this.time = 0
        this.avgTime = 0
        this.attempts = 0
        this.percent = '-'
    }

    render() {
        return html`
        <section class="flex metric ${this.startFlag ? '' : 'unstarted'}">
            <figure class="metric-field ${this.metricStatArray[0] ? 'on' : ''}">
                <h1 class="metric-field__header">${this.time}</h1>
                <h1 class="metric-field__subheader"> sec</h1>
            </figure>
            <figure class="metric-field ${this.metricStatArray[1] ? 'on' : ''}">
                <h1 class="metric-field__header">${this.avgTime}</h1>
                <h1 class="metric-field__subheader"> sec</h1>
            </figure>
            <figure class="metric-field ${this.metricStatArray[2] ? 'on' : ''}">
                <h1 class="metric-field__header">${this.attempts}</h1>
                <h1 class="metric-field__subheader"> times</h1>
            </figure>
            <figure class="metric-field ${this.metricStatArray[3] ? 'on' : ''}">
                <h1 class="metric-field__header">${this.percent}</h1>
                <h1 class="metric-field__subheader"> %</h1>
            </figure>
        </section>
        `
    }
}

customElements.define('metrics-module', MetricsModule)