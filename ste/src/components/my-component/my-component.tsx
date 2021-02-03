import { Component, Prop, h } from '@stencil/core';
import { valoresConsulta } from "./registro_consultas.js";

//import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})

export class MyComponent {

  // The first name
  @Prop() first: string;
  // The middle name   
  @Prop() middle: string;
  // The last name  
  @Prop() last: string;

  // Variables de Vital signs  
  @Prop() estatura: number;
  @Prop() peso: number;
  @Prop() temperatura: number;
  @Prop() frecuencia_respiratoria: number;
  @Prop() sistolica: number;
  @Prop() diastolica: number;
  @Prop() frecuencia_cardiaca: number;
  @Prop() masa_corporal: number;
  @Prop() porcentaje_grasa_corporal: number;
  @Prop() masa_muscular: number;
  @Prop() perimetro_cefalico: number;
  @Prop() saturacion_oxigeno: number;

  // Id de consultas previas   
  @Prop() consulta_seleccionada: number;
  @Prop() name: string;

  @Prop() url_api_nimbo_vital_signs: string;
  @Prop() token_api_nimbo_vital_signs: string;

  @Prop() vital_signs_data: string;

  @Prop() vital_signs_set_id: number;
  @Prop() vital_signs_consultation_id: number;
  @Prop() vital_signs_person_id: number;

  // Imágenes
  @Prop() imgSrc: string;

  /*private getText(): string {
      return format(this.first, this.middle, this.last);
    }*/

  async consultaApiNimbo() {
    this.vital_signs_person_id = 661303
    this.url_api_nimbo_vital_signs = "https://nimbox-api-staging.herokuapp.com/api/v1/people/" + this.vital_signs_person_id + "/vital_signs_sets"
    this.token_api_nimbo_vital_signs = 'Bearer 0fa7ee780e51f875b7eb0ba56fd4fee37b5bb9817be33d9de263972b22719b85'

    let response = await fetch(this.url_api_nimbo_vital_signs, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token_api_nimbo_vital_signs,
      }
    })
    let responseConsulta = await response.json()
    return responseConsulta;
  }

  componentWillLoad() {
    this.consultaApiNimbo()
      .then(data => this.vital_signs_data = data.vital_signs_sets);
  }

  private getEstatura(): number {
    return this.estatura = valoresConsulta[0].vital_signs_sets[0].elements.height.value + [' '] + valoresConsulta[0].vital_signs_sets[0].elements.height.units;
    //return this.estatura =  this.vital_signs_data[0]['elements']['height']['value'] + [' '] + this.vital_signs_data[0]['elements']['height']['units'];
  }
  private getPeso(): number {
    return this.peso = valoresConsulta[0].vital_signs_sets[0].elements.weight.value + [' '] + valoresConsulta[0].vital_signs_sets[0].elements.weight.units;
    //return this.peso = this.vital_signs_data[0]['elements']['weight']['value'] + [' '] + this.vital_signs_data[0]['elements']['weight']['units'];
  }
  private extraerSignoVital(vital_signs_data, vital_sign_name): number {
    var resultado = 0
    if(this.vital_signs_data) {
      resultado = vital_signs_data[0]['elements'][vital_sign_name]['value'] + [' '] + vital_signs_data[0]['elements'][vital_sign_name]['units'];
    }
    return resultado;
  }

  private getMasa(): number {
    return this.masa_corporal = this.extraerSignoVital(this.vital_signs_data, 'body_mass');
  }
  private getTemperatura(): number {
    return this.temperatura = this.extraerSignoVital(this.vital_signs_data, 'temperature');
  }
  private getFrecuenciaRespiratoria(): number {
    return this.frecuencia_respiratoria = this.extraerSignoVital(this.vital_signs_data, 'respiratory_rate');
  }
  private getSistolica(): number {
    return this.sistolica = this.extraerSignoVital(this.vital_signs_data, 'systole');
  }
  private getDiastolica(): number {
    return this.diastolica = this.extraerSignoVital(this.vital_signs_data, 'diastole');
  }
  private getFrecuenciaCardiaca(): number {
    return this.frecuencia_cardiaca = this.extraerSignoVital(this.vital_signs_data, 'heart_rate');
  }
  private getPorcentajeGrasaCorporal(): number {
    return this.porcentaje_grasa_corporal = this.extraerSignoVital(this.vital_signs_data, 'body_fat');
  }
  private getMasaMuscular(): number {
    return this.masa_muscular = this.extraerSignoVital(this.vital_signs_data, 'muscle_mass');
  }
  private getPerimetroCefalico(): number {
    return this.perimetro_cefalico = this.extraerSignoVital(this.vital_signs_data, 'cephalic_perimeter');
  }
  private getSaturacionOxigeno(): number {
    return this.saturacion_oxigeno = this.extraerSignoVital(this.vital_signs_data, 'oxygen_saturation');
  }

  private getIcon(tipo) {
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
    return <img src={`../assets/${ruta_iconos}`}></img>
  }

  render() {
    return (
      <div>
        <div class="vitalSigns">
          <table class="vitalSignsTabla">
            {/*  <tr>
              <td class="vitalSignsTextos">ID de consulta</td>
              <td class="vitalSignsValores"> </td>                        
          </tr> */}
            <tr>
              <td> {this.getIcon('estatura')} </td>
              <td class="vitalSignsTextos">Estatura</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getEstatura()} />
              </td>
            </tr>
            <tr>
              <td> {this.getIcon('peso')} </td>
              <td class="vitalSignsTextos">Peso</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getPeso()} />
              </td>
            </tr>
            <tr>
              <td> {this.getIcon('masa_corporal')} </td>
              <td class="vitalSignsTextos">Masa corporal</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getMasa()} />
              </td>
            </tr>
            <tr>
              <td> {this.getIcon('temperatura')} </td>
              <td class="vitalSignsTextos">Temperatura</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getTemperatura()} />
              </td>
            </tr>
            <tr>
              <td> {this.getIcon('frecuencia_respiratoria')} </td>
              <td class="vitalSignsTextos">Frecuencia respiratoria</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getFrecuenciaRespiratoria()} />
              </td>
            </tr>
            <tr>
              <td> {this.getIcon('sistolica')} </td>
              <td class="vitalSignsTextos">Sistólica</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getSistolica()} />
              </td>
            </tr>
            <tr>
              <td> {this.getIcon('diastolica')} </td>
              <td class="vitalSignsTextos">Diastólica</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getDiastolica()} />
              </td>
            </tr>
            <tr>
              <td> {this.getIcon('frecuencia_cardiaca')} </td>
              <td class="vitalSignsTextos">Frecuencia cardiaca</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getFrecuenciaCardiaca()} />
              </td>
            </tr>
            {/* {<tr>
              <td> {this.getIcon('porcentaje_grasa_corporal')} </td>
              <td class="vitalSignsTextos">Grasa corporal</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getPorcentajeGrasaCorporal()}/>
              </td>             
            </tr>}
            {<tr>
              <td> {this.getIcon('masa_muscular')} </td>
              <td class="vitalSignsTextos">Masa muscular</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getMasaMuscular()}/>
              </td>             
            </tr>}
            {<tr>
              <td> {this.getIcon('perimetro_cefalico')} </td>
              <td class="vitalSignsTextos">Perímetro cefálico</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getPerimetroCefalico()}/>
              </td>             
            </tr>}
            {<tr>
              <td> {this.getIcon('saturacion_oxigeno')} </td>
              <td class="vitalSignsTextos">Saturación de oxígeno</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getSaturacionOxigeno()}/>
              </td>             
            </tr>} */}
          </table>
        </div>
      </div>)
  }
}