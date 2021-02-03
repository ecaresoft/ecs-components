import { r as registerInstance, h } from './index-58c212db.js';

let valoresConsulta = [
    {
        "vital_signs_sets": [
            {
                "id": 832905,
                "consultation_id": 841572,
                "person_id": 661303,
                "account_id": 87,
                "elements": {
                    "height": {
                        "units": "m",
                        "value": "1.80"
                    },
                    "weight": {
                        "units": "kg",
                        "value": "85"
                    },
                    "systole": {
                        "units": "mmHg",
                        "value": "120"
                    },
                    "diastole": {
                        "units": "mmHg",
                        "value": "80"
                    },
                    "body_mass": {
                        "units": "kg/m2",
                        "value": "26.23"
                    },
                    "heart_rate": {
                        "units": "bpm",
                        "value": "77"
                    },
                    "temperature": {
                        "units": "C",
                        "value": "37.3"
                    },
                    "respiratory_rate": {
                        "units": "r/m",
                        "value": "18"
                    },
                    "oxygen_saturation": {
                        "units": "mm",
                        "value": "78"
                    },
                    "muscle_mass": {
                        "units": "gm",
                        "value": "128"
                    },
                    "cephalic_perimeter": {
                        "units": "cm",
                        "value": "70"
                    }
                },
                "created_at": "2020-12-09T17:25:38.298-06:00"
            },
            {
                "id": 832912,
                "consultation_id": 841579,
                "person_id": 661303,
                "account_id": 87,
                "elements": {},
                "created_at": "2020-12-14T14:51:45.806-06:00"
            }
        ]
    }
];



/* export let valores_consulta = [
    {
        "vital_signs_set": {
            "id": 832947,
            "consultation_id": 841614,
            "person_id": 661337,
            "account_id": 87,
            "elements": {
                "height": {
                    "units": "m",
                    "value": "1.85"
                },
                "weight": {
                    "units": "kg",
                    "value": "90"
                },
                "body_mass": {
                    "units": "kg/m2",
                    "value": "26.30"
                },
                "temperature": {
                    "units": "C",
                    "value": "36"
                },
                "oxygen_saturation": {
                    "units": "",
                    "value": "98"
                }
            },
            "created_at": "2021-01-20T09:59:11.289-06:00"
        }
    }
]; */

const myComponentCss = ":host{font-family:Arial, Helvetica, sans-serif}.vitalSignsTabla input{color:rgb(67, 98, 143);font-size:1.1em;padding:8px;width:50%;text-align:center;border-color:rgb(240, 240, 240)}.vitalSigns{display:flex;justify-content:center}.vitalSignsTabla td{margin:2px;border-bottom:1.2px solid rgb(233, 233, 233)}.vitalSignsTextos{color:rgb(87, 87, 87);font-size:1em;padding:12px}";

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /*private getText(): string {
        return format(this.first, this.middle, this.last);
      }*/
    async consultaApiNimbo() {
        this.vital_signs_person_id = 661303;
        this.url_api_nimbo_vital_signs = "https://nimbox-api-staging.herokuapp.com/api/v1/people/" + this.vital_signs_person_id + "/vital_signs_sets";
        this.token_api_nimbo_vital_signs = 'Bearer 21f40f426080847a01d8e96ecacbef0d255eada71903a74dfd891eb9e17f9a80';
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
        return this.estatura = valoresConsulta[0].vital_signs_sets[0].elements.height.value + [' '] + valoresConsulta[0].vital_signs_sets[0].elements.height.units;
        //return this.estatura =  this.vital_signs_data[0]['elements']['height']['value'] + [' '] + this.vital_signs_data[0]['elements']['height']['units'];
    }
    getPeso() {
        return this.peso = valoresConsulta[0].vital_signs_sets[0].elements.weight.value + [' '] + valoresConsulta[0].vital_signs_sets[0].elements.weight.units;
        //return this.peso = this.vital_signs_data[0]['elements']['weight']['value'] + [' '] + this.vital_signs_data[0]['elements']['weight']['units'];
    }
    getMasa() {
        return this.masa_corporal = this.vital_signs_data[0]['elements']['body_mass']['value'] + [' '] + this.vital_signs_data[0]['elements']['body_mass']['units'];
    }
    getTemperatura() {
        return this.temperatura = this.vital_signs_data[0]['elements']['temperature']['value'] + [' '] + this.vital_signs_data[0]['elements']['temperature']['units'];
    }
    getFrecuenciaRespiratoria() {
        return this.frecuencia_respiratoria = this.vital_signs_data[0]['elements']['respiratory_rate']['value'] + [' '] + this.vital_signs_data[0]['elements']['respiratory_rate']['units'];
    }
    getSistolica() {
        return this.sistolica = this.vital_signs_data[0]['elements']['systole']['value'] + [' '] + this.vital_signs_data[0]['elements']['systole']['units'];
    }
    getDiastolica() {
        return this.diastolica = this.vital_signs_data[0]['elements']['diastole']['value'] + [' '] + this.vital_signs_data[0]['elements']['diastole']['units'];
    }
    getFrecuenciaCardiaca() {
        return this.frecuencia_cardiaca = this.vital_signs_data[0]['elements']['heart_rate']['value'] + [' '] + this.vital_signs_data[0]['elements']['heart_rate']['units'];
    }
    getPorcentajeGrasaCorporal() {
        return this.porcentaje_grasa_corporal = this.vital_signs_data[0]['elements']['body_fat']['value'] + [' '] + this.vital_signs_data[0]['elements']['height']['units'];
    }
    getMasaMuscular() {
        return this.masa_muscular = this.vital_signs_data[0]['elements']['muscle_mass']['value'] + [' '] + this.vital_signs_data[0]['elements']['muscle_mass']['units'];
    }
    getPerimetroCefalico() {
        return this.perimetro_cefalico = this.vital_signs_data[0]['elements']['cephalic_perimeter']['value'] + [' '] + this.vital_signs_data[0]['elements']['cephalic_perimeter']['units'];
    }
    getSaturacionOxigeno() {
        return this.saturacion_oxigeno = this.vital_signs_data[0]['elements']['oxygen_saturation']['value'] + [' '] + this.vital_signs_data[0]['elements']['oxygen_saturation']['units'];
    }
    getIcon(tipo) {
        let ruta_iconos = "";
        switch (tipo) {
            case 'estatura':
                ruta_iconos = "estatura.png";
                break;
            case 'peso':
                ruta_iconos = "peso.png";
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
            case 'masa_corporal':
                ruta_iconos = "masa_corporal.png";
                break;
            case 'porcentaje_grasa_corporal':
                ruta_iconos = "porcentaje_grasa_corporal.png";
                break;
            case 'masa_muscular':
                ruta_iconos = "masa_muscular.png";
                break;
            case 'perimetro_cefalico':
                ruta_iconos = "perimetro_cefalico.png";
                break;
            case 'saturacion_oxigeno':
                ruta_iconos = "saturacion_oxigeno.png";
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
