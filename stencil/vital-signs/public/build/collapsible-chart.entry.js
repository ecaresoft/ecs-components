import { r as registerInstance, h } from './index-7678e4f3.js';

const collapsibleChartCss = "collapsible-chart{display:block;border:black dashed 1px}#header{background:blue;color:white;cursor:pointer;padding:2px}";

const CollapsibleChart = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    toggle() {
        console.log("Me hicieron click");
        this.collapsed = !this.collapsed;
    }
    componentDidLoad() {
        console.log("Collapsible chart did load");
    }
    render() {
        return (h("div", null, h("div", { id: "header", onClick: this.toggle.bind(this) }, h("span", null, this.title)), h("div", { id: "content", hidden: this.collapsed }, h("slot", null))));
    }
};
CollapsibleChart.style = collapsibleChartCss;

export { CollapsibleChart as collapsible_chart };
