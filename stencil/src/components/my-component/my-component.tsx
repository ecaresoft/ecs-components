import { Component, Prop, h } from '@stencil/core';
import { ENV } from '../config/environment';
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
  icons_file_names = {
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
  }
  timer =0;
  request:any = {};

  @Prop() vital_signs_data: string;

  // Parametros
  @Prop() token_api_nimbo_vital_signs: string;
  @Prop() vital_signs_person_id: number;

  @Prop() vital_signs_set_id: number;
  @Prop() vital_signs_consultation_id: number;
  @Prop() vital_signs_account_id: number;
  @Prop() environment: string;

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
      .then(data => this.vital_signs_data = data.vital_signs_sets);
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

  private getIconURL(tipo) {
    let ruta_iconos = this.icons_file_names[tipo];
    return <img src={`../assets/${ruta_iconos}`}></img>
  }

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
            {this.renderRow("Temperatura", "temperature")}
            {this.renderRow("Frecuencia Respiratoria", "respiratory_rate")}
            {this.renderRow("Sistólica", "systole")}
            {this.renderRow("Diastólica", "diastole")}
            {this.renderRow("Frecuencia Cardiaca", "heart_rate")}
            {this.renderRow("Masa Corporal", "body_mass")}
            {this.renderRow("Porcentaje Grasa Corporal", "body_fat_percentage")}
            {this.renderRow("Masa Muscula", "lean_body_mass")}
            {this.renderRow("Perímetro Cefálico", "head_circumference")}
            {this.renderRow("Saturación de Oxígeno", "oxygen_saturation")}
          </table>
        </div>
      </div>)
  }

  renderRow(label, element_name) {
    var signo_vital = this.extraerSignoVital(this.vital_signs_data, element_name)
    return (
      <tr>
      <td> {this.getIconURL(element_name)} </td>
      <td class="vitalSignsTextos">{label}</td>
      <td class="vitalSignsValores">
        {
          this.vital_signs_account_id
          ? <input name={element_name}  type="number" value={signo_vital.value} 
          onInput={(e) => this.handleChange(e)} />
          : <span>{signo_vital.value}</span>
        } <span>{signo_vital.unit}</span>
      </td>
    </tr>
    )
  }
}