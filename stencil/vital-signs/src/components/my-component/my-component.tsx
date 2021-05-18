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

  // Parametros
  @Prop() token_api_nimbo_vital_signs: string;
  @Prop() vital_signs_person_id: number;
  @Prop() vital_signs_set_id: number;
  @Prop() vital_signs_consultation_id: number;
  @Prop() vital_signs_account_id: number;
  @Prop() environment: string;

  @State() labelsValuesWeight:number[] = [];
  @State() labelsDate:string[] = [];

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

// Códigos de color para cada Vital Sign:
// Estatura"                      rgb(149, 125, 186)
// Peso"                          rgb(94, 169, 241)
// Masa Corporal"                 rgb(191, 219, 109)
// Temperatura"                   rgb(79, 209, 136)
// Frecuencia Respiratoria"       rgb(131, 206, 228)
// Sistólica"                     rgb(255, 64, 92)
// Diastólica"                    rgb(195, 0, 71)
// Frecuencia Cardiaca"           rgb(215, 82, 154)           
// Porcentaje de Grasa Corporal"  rgb(245, 130, 57)
// Masa Muscular"                 rgb(244, 146, 158)
// Perímetro Cefálico"            rgb(9, 111, 168)
// Saturación de Oxígeno"         rgb(110, 179, 237)

  componentDidLoad() {
    // let labelsDate: string[] = [];

    // let labelsValuesAbdomen : number[] = [];
    // let labelsValuesAggresiveness: number[] = [];
    // let labelsValuesAnxiety : number[] = [];
    // let labelsValuesBodyFatPercentage : number[] = [];
    // let labelsValuesBodyMass : number[] = [];
    // let labelsValuesConcentration : number[] = [];
    // let labelsValuesConstipation : number[] = [];
    // let labelsValuesCramps : number[] = [];
    // let labelsValuesDepression : number[] = [];
    // let labelsValuesDiarrhea : number[] = [];
    // let labelsValuesDiastole : number[] = [];
    // let labelsValuesDizziness : number[] = [];
    // let labelsValuesFat : number[] = [];
    // let labelsValuesFatigue : number[] = [];
    // let labelsValuesHalitosis : number[] = [];
    // let labelsValuesHeadCircumference : number[] = [];
    // let labelsValuesHeadache : number[] = [];
    // let labelsValuesHeartRate : number[] = [];
    // let labelsValuesHeight : number[] = [];
    // let labelsValuesHunger : number[] = [];
    // let labelsValuesImpatience : number[] = [];
    // let labelsValuesImpulseControl : number[] = [];
    // let labelsValuesIrritability : number[] = [];
    // let labelsValuesLeanBodyMass : number[] = [];
    // let labelsValuesLostWeight : number[] = [];
    // let labelsValuesOxygenSaturation : number[] = [];
    // let labelsValuesRespiratoryRate : number[] = [];
    // let labelsValuesSatiety : number[] = [];
    // let labelsValuesSleepingProblems : number[] = [];
    // let labelsValuesStimulantsNeed : number[] = [];
    // let labelsValuesSystole : number[] = [];
    // let labelsValuesTemperature : number[] = [];
    // let labelsValuesTolerance : number[] = [];
    // let labelsValuesWeight: number[] = [];
    // console.log("Labels Values Aggresiveness: " + labelsValuesAggresiveness);
    
    // console.log("*************************");
    // console.log(this.vital_signs_data);    
    // console.log(this.element.shadowRoot.querySelector('canvas')); 

    // for(let i=0; i<this.vital_signs_data.length; i++) {      
    //   let fecha = String(([this.vital_signs_data[i]['created_at']]));
    //   let fechaA = fecha.split('T');      
    //   labelsDate.push(fechaA[0]);
    //   console.log(' fechaA: ' , fechaA);
     
    //   labelsValuesAbdomen.push(this.vital_signs_data[i]['elements']['abdomen']['value']|| 0 );
    //   labelsValuesAggresiveness.push(this.vital_signs_data[i]['elements']['aggressiveness']['value'] || 0 );
    //   labelsValuesAnxiety.push(this.vital_signs_data[i]['elements']['anxiety']['value']|| 0 );
    //   labelsValuesBodyFatPercentage.push(this.vital_signs_data[i]['elements']['body_fat_percentage']['value']|| 0 );
    //   labelsValuesBodyMass.push(this.vital_signs_data[i]['elements']['body_mass']['value']|| 0 );
    //   labelsValuesConcentration.push(this.vital_signs_data[i]['elements']['concentration']['value']|| 0 );
    //   labelsValuesConstipation.push(this.vital_signs_data[i]['elements']['constipation']['value']|| 0 );
    //   labelsValuesCramps.push(this.vital_signs_data[i]['elements']['cramps']['value']|| 0 );
    //   labelsValuesDepression.push(this.vital_signs_data[i]['elements']['depression']['value']|| 0 );
    //   labelsValuesDiarrhea.push(this.vital_signs_data[i]['elements']['diarrhea']['value']|| 0 );
    //   labelsValuesDiastole.push(this.vital_signs_data[i]['elements']['diastole']['value']|| 0 );
    //   labelsValuesDizziness.push(this.vital_signs_data[i]['elements']['dizziness']['value']|| 0 );
    //   labelsValuesFat.push(this.vital_signs_data[i]['elements']['fat']['value']|| 0 );
    //   labelsValuesFatigue.push(this.vital_signs_data[i]['elements']['fatigue']['value']|| 0 );
    //   labelsValuesHalitosis.push(this.vital_signs_data[i]['elements']['halitosis']['value']|| 0 );
    //   labelsValuesHeadCircumference.push(this.vital_signs_data[i]['elements']['head_circumference']['value']|| 0 );
    //   labelsValuesHeadache.push(this.vital_signs_data[i]['elements']['headache']['value']|| 0 );
    //   labelsValuesHeartRate.push(this.vital_signs_data[i]['elements']['heart_rate']['value']|| 0 );
    //   labelsValuesHeight.push(this.vital_signs_data[i]['elements']['height']['value']|| 0 );
    //   labelsValuesHunger.push(this.vital_signs_data[i]['elements']['hunger']['value']|| 0 );
    //   labelsValuesImpatience.push(this.vital_signs_data[i]['elements']['impatience']['value']|| 0 );
    //   labelsValuesImpulseControl.push(this.vital_signs_data[i]['elements']['impulse_control']['value']|| 0 );
    //   labelsValuesIrritability.push(this.vital_signs_data[i]['elements']['irritability']['value']|| 0 );
    //   labelsValuesLeanBodyMass.push(this.vital_signs_data[i]['elements']['lean_body_mass']['value']|| 0 );
    //   labelsValuesLostWeight.push(this.vital_signs_data[i]['elements']['lost_weight']['value']|| 0 );
    //   labelsValuesOxygenSaturation.push(this.vital_signs_data[i]['elements']['oxygen_saturation']['value']|| 0 );
    //   labelsValuesRespiratoryRate.push(this.vital_signs_data[i]['elements']['respiratory_rate']['value']|| 0 );
    //   labelsValuesSatiety.push(this.vital_signs_data[i]['elements']['satiety']['value']|| 0 );
    //   labelsValuesSleepingProblems.push(this.vital_signs_data[i]['elements']['sleeping_problems']['value']|| 0 );
    //   labelsValuesStimulantsNeed.push(this.vital_signs_data[i]['elements']['stimulants_need']['value']|| 0 );
    //   labelsValuesSystole.push(this.vital_signs_data[i]['elements']['systole']['value']|| 0 );
    //   labelsValuesTemperature.push(this.vital_signs_data[i]['elements']['temperature']['value']|| 0 );
    //   labelsValuesTolerance.push(this.vital_signs_data[i]['elements']['tolerance']['value']|| 0 );
    //   labelsValuesWeight.push(this.vital_signs_data[i]['elements']['weight']['value']|| 0 );
    // }  

    // console.log("Las fechas de consultas para labels son: ");
    // console.log(labelsDate);
    //console.log("Los valores para llenar la tabla de estatura son: ");
    //console.log(labelsValuesHeight);

    //let data = dataHeight;
    //switch (data){
    //  case 'dataHeight':
    //    labels: labelsDate
    //    datasets: [
    //        {
    //          label: 'Height',
    //          data: labelsValuesHeight,
    //          borderColor: 'rgb(55, 199, 132)',          
    //        }
    //      ];        
    //  break;
    //}  
    console.log("Did Load")
    let canvas = this.element.shadowRoot.querySelector('canvas#unagrafica');
    console.log(canvas)

    const data = {
      labels: this.labelsDate,
      datasets: [
        {
          label: 'Weight',
          data: this.labelsValuesWeight,
          borderColor: 'rgb(155, 99, 132)',          
        }
      ]
    };

    this.myChart = new chartjs(canvas, {
      type: 'line',
      data: data,      
      options: {}
    })

  }

  actualizarDataDeGraficas() {
    console.log("actualizarDataDeGraficas")
    for(let i=0; i<this.vital_signs_data.length; i++) {
      let fecha = String(([this.vital_signs_data[i]['created_at']]));
      let fechaA = fecha.split('T');      
      this.labelsDate.push(fechaA[0]);

      this.labelsValuesWeight.push(this.getNormalizedValue(this.vital_signs_data[i],'weight'));
    }
    this.myChart.update()
    console.log(this.labelsValuesWeight)
  }

  getNormalizedValue(item, attributeName) {
    if(!item['elements'][attributeName]) return 0
    return( item['elements'][attributeName]['value'] || 0 )
  }

  // Pendientes:
  // 1.- Crear un diccionario o estructura donde almacenar todos los rgb de acuerdo al Vital sign
  // 2.- Dibujar todas las charts debajo de cada vital sign
  // 3.- Poner ids a cada chart acorde al element_name


  renderRow(label, element_name) {
    var signo_vital = this.extraerSignoVital(this.vital_signs_data, element_name)
    return (
      <tr>
      <td> <stencil-asset icon={element_name}></stencil-asset></td>
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
        <canvas id="unagrafica" width="300" height="200"></canvas>
      </td>
      <td>
        <canvas id="myChart1" width="300" height="200"></canvas>
      </td>
    </tr>
    )
  }
}