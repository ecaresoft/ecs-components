/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CollapsibleChart {
        "title": string;
        "toggle": () => Promise<void>;
    }
    interface MyComponent {
        "environment": string;
        "obtenerRgb": any;
        "token_api_nimbo_vital_signs": string;
        "vital_signs_account_id": number;
        "vital_signs_consultation_id": number;
        "vital_signs_data": string;
        "vital_signs_person_id": number;
        "vital_signs_set_id": number;
    }
    interface MyName {
    }
    interface StencilAsset {
        "icon": string;
    }
}
declare global {
    interface HTMLCollapsibleChartElement extends Components.CollapsibleChart, HTMLStencilElement {
    }
    var HTMLCollapsibleChartElement: {
        prototype: HTMLCollapsibleChartElement;
        new (): HTMLCollapsibleChartElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLMyNameElement extends Components.MyName, HTMLStencilElement {
    }
    var HTMLMyNameElement: {
        prototype: HTMLMyNameElement;
        new (): HTMLMyNameElement;
    };
    interface HTMLStencilAssetElement extends Components.StencilAsset, HTMLStencilElement {
    }
    var HTMLStencilAssetElement: {
        prototype: HTMLStencilAssetElement;
        new (): HTMLStencilAssetElement;
    };
    interface HTMLElementTagNameMap {
        "collapsible-chart": HTMLCollapsibleChartElement;
        "my-component": HTMLMyComponentElement;
        "my-name": HTMLMyNameElement;
        "stencil-asset": HTMLStencilAssetElement;
    }
}
declare namespace LocalJSX {
    interface CollapsibleChart {
        "onReloadCanvas"?: (event: CustomEvent<String>) => void;
        "title"?: string;
    }
    interface MyComponent {
        "environment"?: string;
        "obtenerRgb"?: any;
        "token_api_nimbo_vital_signs"?: string;
        "vital_signs_account_id"?: number;
        "vital_signs_consultation_id"?: number;
        "vital_signs_data"?: string;
        "vital_signs_person_id"?: number;
        "vital_signs_set_id"?: number;
    }
    interface MyName {
    }
    interface StencilAsset {
        "icon"?: string;
    }
    interface IntrinsicElements {
        "collapsible-chart": CollapsibleChart;
        "my-component": MyComponent;
        "my-name": MyName;
        "stencil-asset": StencilAsset;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "collapsible-chart": LocalJSX.CollapsibleChart & JSXBase.HTMLAttributes<HTMLCollapsibleChartElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "my-name": LocalJSX.MyName & JSXBase.HTMLAttributes<HTMLMyNameElement>;
            "stencil-asset": LocalJSX.StencilAsset & JSXBase.HTMLAttributes<HTMLStencilAssetElement>;
        }
    }
}
