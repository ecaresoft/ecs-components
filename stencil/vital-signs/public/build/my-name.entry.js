import { r as registerInstance, h } from './index-7678e4f3.js';

const myNameCss = "";

const MyName = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.value);
        // send data to our backend
    }
    handleChange(event) {
        this.value = event.target.value;
    }
    render() {
        return (h("form", { onSubmit: (e) => this.handleSubmit(e) }, h("label", null, "Name:", h("input", { type: "text", value: this.value, onInput: (event) => this.handleChange(event) })), h("input", { type: "submit", value: "Submit" })));
    }
};
MyName.style = myNameCss;

export { MyName as my_name };
