/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
export namespace Components {
    interface MyComponent {
        "token_api_nimbo_vital_signs": string;
        "vital_signs_account_id": number;
        "vital_signs_consultation_id": number;
        "vital_signs_data": string;
        "vital_signs_person_id": number;
        "vital_signs_set_id": number;
    }
    interface MyName {
    }
}
declare global {
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
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "my-name": HTMLMyNameElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        "token_api_nimbo_vital_signs"?: string;
        "vital_signs_account_id"?: number;
        "vital_signs_consultation_id"?: number;
        "vital_signs_data"?: string;
        "vital_signs_person_id"?: number;
        "vital_signs_set_id"?: number;
    }
    interface MyName {
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "my-name": MyName;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "my-name": LocalJSX.MyName & JSXBase.HTMLAttributes<HTMLMyNameElement>;
        }
    }
}
