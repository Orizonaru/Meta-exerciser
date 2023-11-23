import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class MetricsSwitcher extends LitElement {
static properties = {
   startFlag: Boolean,
   metricStatArray: Array
}



connectedCallback() {
super.connectedCallback()
this.metricStatArray = [true, false, false, false]
}

render() {
    return html`
    <section class='main flex'>
        <h2 class='main-header'>Metrics switcher</h2>
        <figure class='main-content flex'> //direction row, wrap
             <button class='main-content__button'>Metric</button>
             <button class='main-content__button'>Metric</button>
             <button class='main-content__button'>Metric</button>
             <button class='main-content__button'>Metric</button>
         </figure>
    </section>`