import { Component, Element, Prop, h, State } from '@stencil/core';
import { ENV } from '../config/environment';
import { Chart as chartjs, registerables } from 'chart.js';
chartjs.register(...registerables);

/*
[ ] Distribución
[ ] validar rangos de valores
[ ] tomar la configuracion de vital_sign_sets del medico (account)
[ ] hacer el merge de los signos vitales de las ultimas consultas
[ ] probar con un paciente que tenga varias consultas con signos vitales
[ ] manejo de errores (GET, PUT)
[ ] disparar eventos para que el consumidor se entere (ya hizo el put, ya hizo el get, hay algo pendiente de guardar)
[ ] pruebas automaticas (Carlos, Jesús, Jest.io)
*/

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})

export class MyComponent {
  timer = 0;
  request:any = {};

  @Prop() vital_signs_data: string;
  @Element() element: HTMLElement;

  // Parameters
  @Prop() token_api_nimbo_vital_signs: string;
  @Prop() vital_signs_person_id: number;
  @Prop() vital_signs_set_id: number;
  @Prop() vital_signs_consultation_id: number;
  @Prop() vital_signs_account_id: number;
  @Prop() environment: string;

  @State() labelsDate:string[] = [];
  @State() obtenerDataSets: any[] = [];
  @State() obtenerDate: any[] = [];

  @State() multi:any[][] = [ [],[] ];
  @Prop() obtenerRgb: any={
            abdomen: 'rgb(129, 183, 201)',
            aggressiveness: 'rgb(129, 183, 201)',
            anxiety: 'rgb(129, 183, 201)',
            body_fat_percentage: 'rgb(245, 130, 57)',
            body_mass: 'rgb(191, 219, 109)',
            concentration: 'rgb(129, 183, 201)',
            constipation: 'rgb(129, 183, 201)',
            cramps: 'rgb(129, 183, 201)',
            depression: 'rgb(129, 183, 201)',
            diarrhea: 'rgb(129, 183, 201)',
            diastole: 'rgb(195, 0, 71)',
            dizziness: 'rgb(129, 183, 201)',
            fat: 'rgb(129, 183, 201)',
            fatigue: 'rgb(129, 183, 201)',
            halitosis: 'rgb(129, 183, 201)',
            head_circumference: 'rgb(9, 111, 168)',
            headache: 'rgb(129, 183, 201)',
            heart_rate: 'rgb(215, 82, 154)',
            height: 'rgb(149, 125, 186)',
            hunger: 'rgb(129, 183, 201)',
            impatience: 'rgb(129, 183, 201)',
            impulse_control: 'rgb(129, 183, 201)',
            irritability: 'rgb(129, 183, 201)',
            lean_body_mass: 'rgb(244, 146, 158)',
            lost_weight: 'rgb(129, 183, 201)',
            oxygen_saturation: 'rgb(110, 179, 237)',
            respiratory_rate: 'rgb(131, 206, 228)',
            satiety: 'rgb(129, 183, 201)',
            sleeping_problems: 'rgb(129, 183, 201)',
            stimulants_need: 'rgb(129, 183, 201)',
            systole: 'rgb(255, 64, 92)',
            temperature: 'rgb(79, 209, 136)',
            tolerance: 'rgb(129, 183, 201)',
            weight: 'rgb(94, 169, 241)'
  };

  myChart: any;

  async consultaVitalSigns() {
    if(this.vital_signs_person_id)
    {
      let response = await fetch(
        this.get_url(this.environment) + `/people/${this.vital_signs_person_id}/vital_signs_sets`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+this.token_api_nimbo_vital_signs,
          }
        })
      let responseConsulta = await response.json()
      this.request = responseConsulta.vital_signs_sets[ responseConsulta.vital_signs_sets.length - 1 ]
      return responseConsulta;  
    }
  }

  updateVitalSignSet() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+this.token_api_nimbo_vital_signs);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(this.request);
    fetch(this.get_url(this.environment)+this.vital_signs_set_id, {
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
      .then(data => { this.vital_signs_data = data.vital_signs_sets; this.actualizarDataDeGraficas() });
  }

  private get_url(_env) {
    let environment = ENV[`${_env}`];

    if (environment === null || environment === undefined) {
      return ENV.staging.apiBaseURL+ENV.apiBasePath
    }    
    return environment.apiBaseURL+ENV.apiBasePath;
  }

  private extraerSignoVital(vital_signs_data, vital_sign_name): any {
    var resultado = { value: "-", unit: "-" }
    if(vital_signs_data) {
      let last_vital_signs = vital_signs_data[this.vital_signs_data.length - 1];
      let value = '-';
      let unit = '-';

      if (last_vital_signs) {
        if (last_vital_signs['elements'][vital_sign_name] !== undefined) {
          value = last_vital_signs['elements'][vital_sign_name]['value'];
        }
  
        if (last_vital_signs['elements'][vital_sign_name] !== undefined) {
          unit = last_vital_signs['elements'][vital_sign_name]['units'];
        }

        resultado = { 
          value,
          unit
        }
      }
    }    
    return resultado;
  }

  /* private getIconURL(tipo) {
    let ruta_iconos = this.icons_file_names[tipo];
    return <img src={`../assets/${ruta_iconos}`}></img>
  } */

  // https://stackoverflow.com/questions/1909441/how-to-delay-the-keyup-handler-until-the-user-stops-typing
  handleChange(event) {
    var new_value = event.path[0].value;
    this.request.elements[event.path[0].name].value = new_value;
    clearTimeout(this.timer);
    this.timer = window.setTimeout(()=>{ this.updateVitalSignSet(); }, 5000)
  }

  render() {
    return (
      <div>
        <div class="vitalSigns">
          <table class="vitalSignsTabla">
            {this.renderRow("Estatura", "height")}
            {this.renderRow("Peso", "weight")}
            {this.renderRow("Masa Corporal", "body_mass")}
            {this.renderRow("Temperatura", "temperature")}
            {this.renderRow("Frecuencia Respiratoria", "respiratory_rate")}
            {this.renderRow("Sistólica", "systole")}
            {this.renderRow("Diastólica", "diastole")}
            {this.renderRow("Frecuencia Cardiaca", "heart_rate")}            
            {this.renderRow("Porcentaje de Grasa Corporal", "body_fat_percentage")}
            {this.renderRow("Masa Muscular", "lean_body_mass")}
            {this.renderRow("Perímetro Cefálico", "head_circumference")}
            {this.renderRow("Saturación de Oxígeno", "oxygen_saturation")}
          </table>
        </div>
      </div>
      )
  }

  componentDidLoad() {
    console.log("Did Load")
  
   // this.drawCanvas();
  }

drawCanvas(){
  let canvas = this.element.shadowRoot.querySelectorAll('canvas');
  //debugger
  this.myChart =[];
    for (let i=0; i<canvas.length; i++){
      console.log(canvas[i])
      let nameVitalSign = canvas[i].id;
      //this.obtenerDataSets[nameVitalSign];

      let data = {
        labels: this.labelsDate,
        datasets: [
          this.obtenerDataSets[nameVitalSign]
        ]
      };

      this.myChart[i] = new chartjs(canvas[i], {
        type: 'line',
        data: data,      
        options: {}
      })
    }
}

  obtenerValoresElemento(elemento){
    let valores = [];
    for( let i = 0; i< this.vital_signs_data.length; i++ ) {
      //let element = this.vital_signs_data[i]['elements'][elemento];
      valores.push( this.getNormalizedValue(this.vital_signs_data[i], elemento))
    }
    return valores
  }

  actualizarDataDeGraficas() {
    console.log("actualizarDataDeGraficas")
    this.labelsDate = []
    for(let i=0; i<this.vital_signs_data.length; i++) {
      let fecha = String(([this.vital_signs_data[i]['created_at']]));
      let fechaA = fecha.split('T');
      this.labelsDate.push(fechaA[0]);

      if( i==0){
          let vitalSign = this.vital_signs_data[i];
      console.log(vitalSign);
      
      //let elementKeys = Object.keys(vitalSign['elements']);
      //for(let j=0; j<vitalSign['elements'].length; j++){
      for (const key in vitalSign['elements']) {
          //debugger
        //let element = vitalSign['elements'][key];
          this.obtenerDataSets[key] = {
            label: key,
            data: this.obtenerValoresElemento(key),
            borderColor: this.obtenerRgb[key] ? this.obtenerRgb[key] : "rgb(129, 183, 201)"
          };
        }
      }
    }
    if(this.myChart === undefined ){
      this.drawCanvas();
    }
   // this.myChart.update()
    if(this.myChart !== undefined && Array.isArray(this.myChart)){      
      for(let j=0; j<this.myChart.length; j++){
        if (this.myChart[j]){
          this.myChart[j].update();
        }
      }
    }
  }

  getNormalizedValue(item, attributeName) {
    if(!item['elements'][attributeName]) return 0
    return( item['elements'][attributeName]['value'] || 0 )
  }

  renderRow(label, element_name) {
    var signo_vital = this.extraerSignoVital(this.vital_signs_data, element_name)
    return (
      <tr>
        <td><stencil-asset icon={element_name}></stencil-asset></td>
        <td class="vitalSignsTextos">{label}</td>
        <td class="vitalSignsValores">
          {
            this.vital_signs_account_id
            ? <input name={element_name}  type="number" value={signo_vital.value} 
            onInput={(e) => this.handleChange(e)} />
            : <span class="vitalSignsValores">{signo_vital.value}</span>
          } <span class="vitalSignsUnidades">{signo_vital.unit}</span>
        </td>
        <td>        
          <collapsible-chart title="▼">
            <canvas id={element_name} width="300" height="200"></canvas>
          </collapsible-chart>
        </td>
      </tr>
    )
  }
}