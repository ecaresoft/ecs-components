import { r as registerInstance, h } from './index-58c212db.js';

function format(first, middle, last) {
    return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

const myComponentCss = ":host{font-family:Arial, Helvetica, sans-serif}.vitalSignsTabla input{color:rgb(67, 98, 143);font-size:1.1em;padding:8px;width:50%;text-align:center;border-color:rgb(240, 240, 240)}.vitalSigns{display:flex;justify-content:center}.vitalSignsTabla td{margin:2px;border-bottom:1.2px solid rgb(233, 233, 233)}.vitalSignsTextos{color:rgb(87, 87, 87);font-size:1em;padding:12px}";

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    getText() {
        return format(this.first, this.middle, this.last);
    }
    async consultaApiNimbo() {
        this.vital_signs_person_id = 661303;
        this.url_api_nimbo_vital_signs = "https://nimbox-api-staging.herokuapp.com/api/v1/people/" + this.vital_signs_person_id + "/vital_signs_sets";
        this.token_api_nimbo_vital_signs = 'Bearer 35c34eda9b8646cbb8569978257de86480d5029e42b88f9494bfd2b45b325353';
        let response = await fetch(this.url_api_nimbo_vital_signs, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token_api_nimbo_vital_signs,
            }
        });
        let responseConsulta = await response.json();
        return responseConsulta;
    }
    componentWillLoad() {
        this.consultaApiNimbo()
            .then(data => this.vital_signs_data = data.vital_signs_sets);
        console.log(this.vital_signs_data);
    }
    getEstatura() {
        return this.estatura = this.vital_signs_data[0]['elements']['height']['value'] + [' '] + this.vital_signs_data[0]['elements']['height']['units'];
    }
    getPeso() {
        return this.estatura = this.vital_signs_data[0]['elements']['weight']['value'] + [' '] + this.vital_signs_data[0]['elements']['weight']['units'];
    }
    getMasa() {
        return this.estatura = this.vital_signs_data[0]['elements']['body_mass']['value'] + [' '] + this.vital_signs_data[0]['elements']['body_mass']['units'];
    }
    getTemperatura() {
        return this.estatura = this.vital_signs_data[0]['elements']['temperature']['value'] + [' '] + this.vital_signs_data[0]['elements']['temperature']['units'];
    }
    getFrecuenciaRespiratoria() {
        return this.estatura = this.vital_signs_data[0]['elements']['respiratory_rate']['value'] + [' '] + this.vital_signs_data[0]['elements']['respiratory_rate']['units'];
    }
    getSistolica() {
        return this.estatura = this.vital_signs_data[0]['elements']['systole']['value'] + [' '] + this.vital_signs_data[0]['elements']['systole']['units'];
    }
    getDiastolica() {
        return this.estatura = this.vital_signs_data[0]['elements']['diastole']['value'] + [' '] + this.vital_signs_data[0]['elements']['diastole']['units'];
    }
    getFrecuenciaCardiaca() {
        return this.estatura = this.vital_signs_data[0]['elements']['heart_rate']['value'] + [' '] + this.vital_signs_data[0]['elements']['heart_rate']['units'];
    }
    /* private getPorcentajeGrasaCorporal(): number {
      return this.estatura =  this.vital_signs_data[0]['elements']['height']['value'] + [' '] +this.vital_signs_data[0]['elements']['height']['units'];
    } */
    getIcon(tipo) {
        let ruta_iconos = "";
        switch (tipo) {
            case 'estatura':
                ruta_iconos = "estatura.png";
                break;
            case 'peso':
                ruta_iconos = "peso.png";
                break;
            case 'masa_corporal':
                ruta_iconos = "masa_corporal.png";
                break;
            case 'temperatura':
                ruta_iconos = "temperatura.png";
                break;
            case 'frecuencia_respiratoria':
                ruta_iconos = "frecuencia_respiratoria.png";
                break;
            case 'sistolica':
                ruta_iconos = "sistolica.png";
                break;
            case 'diastolica':
                ruta_iconos = "diastolica.png";
                break;
            case 'frecuencia_cardiaca':
                ruta_iconos = "frecuencia_cardiaca.png";
                break;
            case 'porcentaje_grasa_corporal':
                ruta_iconos = "porcentaje_grasa_corporal.png";
                break;
            default:
                break;
        }
        return h("img", { src: `../assets/${ruta_iconos}` });
    }
    render() {
        return (h("div", null, h("div", { class: "vitalSigns" }, h("table", { class: "vitalSignsTabla" }, h("tr", null, h("td", null, " ", this.getIcon('estatura'), " "), h("td", { class: "vitalSignsTextos" }, "Estatura"), h("td", { class: "vitalSignsValores" }, h("input", { type: "text", value: this.getEstatura() }))), h("tr", null, h("td", null, " ", this.getIcon('peso'), " "), h("td", { class: "vitalSignsTextos" }, "Peso"), h("td", { class: "vitalSignsValores" }, h("input", { type: "text", value: this.getPeso() }))), h("tr", null, h("td", null, " ", this.getIcon('masa_corporal'), " "), h("td", { class: "vitalSignsTextos" }, "Masa corporal"), h("td", { class: "vitalSignsValores" }, h("input", { type: "text", value: this.getMasa() }))), h("tr", null, h("td", null, " ", this.getIcon('temperatura'), " "), h("td", { class: "vitalSignsTextos" }, "Temperatura"), h("td", { class: "vitalSignsValores" }, h("input", { type: "text", value: this.getTemperatura() }))), h("tr", null, h("td", null, " ", this.getIcon('frecuencia_respiratoria'), " "), h("td", { class: "vitalSignsTextos" }, "Frecuencia respiratoria"), h("td", { class: "vitalSignsValores" }, h("input", { type: "text", value: this.getFrecuenciaRespiratoria() }))), h("tr", null, h("td", null, " ", this.getIcon('sistolica'), " "), h("td", { class: "vitalSignsTextos" }, "Sist\u00F3lica"), h("td", { class: "vitalSignsValores" }, h("input", { type: "text", value: this.getSistolica() }))), h("tr", null, h("td", null, " ", this.getIcon('diastolica'), " "), h("td", { class: "vitalSignsTextos" }, "Diast\u00F3lica"), h("td", { class: "vitalSignsValores" }, h("input", { type: "text", value: this.getDiastolica() }))), h("tr", null, h("td", null, " ", this.getIcon('frecuencia_cardiaca'), " "), h("td", { class: "vitalSignsTextos" }, "Frecuencia cardiaca"), h("td", { class: "vitalSignsValores" }, h("input", { type: "text", value: this.getFrecuenciaCardiaca() })))))));
    }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };
