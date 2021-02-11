import { r as registerInstance, h } from './index-58c212db.js';

const myComponentCss = ":host{font-family:Arial, Helvetica, sans-serif}input{color:rgb(67, 98, 143);font-size:1.1em;padding:8px;width:50%;text-align:center;border-color:rgb(240, 240, 240)}div{display:flex;justify-content:center}td{margin:2px;border-bottom:1.2px solid rgb(233, 233, 233)}.vitalSignsTextos{color:rgb(87, 87, 87);font-size:1em;padding:12px}";

const MyComponent = class {
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
        this.timer = 0;
        this.request = {};
        this.nimbo_api_url = "https://nimbox-api-staging.herokuapp.com/api/v1";
    }
    async consultaVitalSigns() {
        if (this.vital_signs_person_id) {
            let response = await fetch(this.nimbo_api_url + `/people/${this.vital_signs_person_id}/vital_signs_sets`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.token_api_nimbo_vital_signs,
                }
            });
            let responseConsulta = await response.json();
            this.request = responseConsulta.vital_signs_sets[responseConsulta.vital_signs_sets.length - 1];
            return responseConsulta;
        }
    }
    updateVitalSignSet() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.token_api_nimbo_vital_signs);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(this.request);
        fetch(`https://nimbox-api-staging.herokuapp.com/api/v1/vital_signs_sets/${this.vital_signs_set_id}`, {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    componentWillLoad() {
        this.consultaVitalSigns()
            .then(data => this.vital_signs_data = data.vital_signs_sets);
    }
    extraerSignoVital(vital_signs_data, vital_sign_name) {
        var resultado = { value: "-", unit: "-" };
        if (this.vital_signs_data) {
            resultado = {
                value: vital_signs_data[0]['elements'][vital_sign_name]['value'],
                unit: vital_signs_data[0]['elements'][vital_sign_name]['units']
            };
        }
        return resultado;
    }
    getIconURL(tipo) {
        let ruta_iconos = this.icons_file_names[tipo];
        return h("img", { src: `../assets/${ruta_iconos}` });
    }
    // https://stackoverflow.com/questions/1909441/how-to-delay-the-keyup-handler-until-the-user-stops-typing
    handleChange(event) {
        var new_value = event.path[0].value;
        this.request.elements[event.path[0].name].value = new_value;
        clearTimeout(this.timer);
        this.timer = window.setTimeout(() => { this.updateVitalSignSet(); }, 5000);
    }
    render() {
        return (h("div", null, h("div", { class: "vitalSigns" }, h("table", { class: "vitalSignsTabla" }, this.renderRow("Estatura", "height"), this.renderRow("Peso", "weight"), this.renderRow("Temperatura", "temperature"), this.renderRow("Frecuencia Respiratoria", "respiratory_rate"), this.renderRow("Sistólica", "systole"), this.renderRow("Diastólica", "diastole"), this.renderRow("Frecuencia Cardiaca", "heart_rate"), this.renderRow("Masa Corporal", "body_mass"), this.renderRow("Porcentaje Grasa Corporal", "body_fat_percentage"), this.renderRow("Masa Muscula", "lean_body_mass"), this.renderRow("Perímetro Cefálico", "head_circumference"), this.renderRow("Saturación de Oxígeno", "oxygen_saturation")))));
    }
    renderRow(label, element_name) {
        var signo_vital = this.extraerSignoVital(this.vital_signs_data, element_name);
        return (h("tr", null, h("td", null, " ", this.getIconURL(element_name), " "), h("td", { class: "vitalSignsTextos" }, label), h("td", { class: "vitalSignsValores" }, this.vital_signs_account_id
            ? h("input", { name: element_name, type: "number", value: signo_vital.value, onInput: (e) => this.handleChange(e) })
            : h("span", null, signo_vital.value), " ", h("span", null, signo_vital.unit))));
    }
};
MyComponent.style = myComponentCss;

export { MyComponent as my_component };
