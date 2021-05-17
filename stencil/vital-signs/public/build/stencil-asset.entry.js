import { r as registerInstance, h, e as getAssetPath } from './index-ecc28489.js';

const stencilAssetCss = "";

const StencilAsset = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.icons_file_names = {
            'height': "estatura.png",
            'weight': "peso.png",
            'temperature': "temperatura.png",
            'respiratory_rate': "frecuencia_respiratoria.png",
            'systole': "sistolica.png",
            'diastole': "diastolica.png",
            'heart_rate': "frecuencia_cardiaca.png",
            'body_mass': "masa_corporal.png",
            'body_fat_percentage': "porcentaje_grasa_corporal.png",
            'lean_body_mass': "masa_muscular.png",
            'head_circumference': "perimetro_cefalico.png",
            'oxygen_saturation': "saturacion_oxigeno.png"
        };
        this.icon = "";
    }
    render() {
        return h("img", { src: getAssetPath(`./assets/${this.icons_file_names[this.icon]}`) });
    }
    static get assetsDirs() { return ["assets"]; }
};
StencilAsset.style = stencilAssetCss;

export { StencilAsset as stencil_asset };
