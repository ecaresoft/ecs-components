import { r as registerInstance, h } from './index-7678e4f3.js';

const collapsibleChartCss = "collapsible-chart{display:block;border:black dashed 1px}#header{color:#59636d;font-size:12px;cursor:pointer;padding:2px}#content{width:300px;height:200px}.contenedorChart{width:300px}";

const CollapsibleChart = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.collapsed = true;
    }
    toggle() {
        console.log("Me hicieron click");
        this.collapsed = !this.collapsed;
    }
    componentDidLoad() {
        console.log("Collapsible chart did load");
    }
    render() {
        return (h("div", { class: "contenedorChart" }, h("div", { id: "header", onClick: this.toggle.bind(this) }, h("span", null, this.title)), h("div", { id: "content", hidden: this.collapsed }, h("slot", null))));
    }
};
CollapsibleChart.style = collapsibleChartCss;

export { CollapsibleChart as collapsible_chart };
