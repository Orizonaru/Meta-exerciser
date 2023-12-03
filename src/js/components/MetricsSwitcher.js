import { LitElement, html, css } from "lit";
export class MetricsSwitcher extends LitElement {
    static properties = {
       startFlag: Boolean,
       metricStatArray: Array,
       startFlag: Boolean
    }

    static styles = css`
    .flex {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column
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
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin:0
    }

    .main-content__metric {
        margin: 0;
        padding: 0.5rem
    }

    .main-content__metric-button {
        margin: 0;
        color: var(--txt);
        font-size: 2rem;
        cursor: pointer;
        border-radius: 10px;
        margin: 0;
        padding: 1rem;
        border: 3px solid var(--txt);
        background-color: var(--sbg);
        width: 220px;
        height: 90px;
        font-family: 'Montserrat', sans-serif;
    }

    .on {
        border: 6px solid var(--txt)
    }

    .started {
        display: none
    }

    `

    metricHandle(e) {
        console.log(this.metricStatArray)
        let value = e.target.value
        let curStatArray = [...this.metricStatArray]
        curStatArray[value] = !(curStatArray[value])
        this.metricStatArray = [...curStatArray]
        dispatchEvent(new CustomEvent('metrics-handle', {
            bubbles: true,
            detail: {
                metrics: this.metricStatArray
            }
        }))
        
    }

    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('start-handle', (e) => {
            this.startFlag = e.detail.startFlag
        })
        this.startFlag = false
        this.metricStatArray = [true, false, false, false]
    }

    render() {
        return html`
        <section class='main flex ${this.startFlag ? 'started' : ''}'>
            <h2 class='main-header'>Metrics switcher</h2>
            <figure class='main-content'>                          
                <figure class='main-content__metric'>
                    <button value='0' class='main-content__metric-button ${(this.metricStatArray[0]) ? 'on' : ''}'  @click = ${(e) => this.metricHandle(e)}>last time</button>
                </figure>
                <figure class='main-content__metric'>
                    <button value='1' class='main-content__metric-button ${(this.metricStatArray[1]) ? 'on' : ''}'  @click = ${(e) => this.metricHandle(e)}>average</button>
                </figure>
                <figure class='main-content__metric'>
                    <button value='2' class='main-content__metric-button ${(this.metricStatArray[2]) ? 'on' : ''}'  @click = ${(e) => this.metricHandle(e)}>attempts</button>
                </figure>
                <figure class='main-content__metric'>
                    <button value='3' class='main-content__metric-button ${(this.metricStatArray[3]) ? 'on' : ''}'  @click = ${(e) => this.metricHandle(e)}>% correct</button>
                </figure>
             </figure>
        </section>`
    }
}

customElements.define('metrics-switcher', MetricsSwitcher)