import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class SignSwitcher extends LitElement {
    static properties = {
        startFlag: Boolean,
        sign: String
    }

    static styles = css`
    
    `

    connectedCallback() {
        super.connectedCallback()
        this.sign = ''
    }

    render() {
        return html`
        
        
        `
    }
}

customElements.define('sign-switcher', SignSwitcher)