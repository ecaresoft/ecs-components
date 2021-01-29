import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})

export class MyComponent {

   // The first name
  @Prop() first:                       string;
  // The middle name   
  @Prop() middle:                      string;
   // The last name  
  @Prop() last:                        string;

  // Variables de Vital signs  
  @Prop() estatura:                    number;
  @Prop() peso:                        number;
  @Prop() masa_corporal:               number;
  @Prop() temperatura:                 number;
  @Prop() frecuencia_respiratoria:     number;
  @Prop() sistolica:                   number;
  @Prop() diastolica:                  number;
  @Prop() frecuencia_cardiaca:         number;
  @Prop() porcentaje_grasa_corporal:   number;

  // Id de consultas previas   
  @Prop() consulta_seleccionada:       number;
  @Prop() name:                        string;

  @Prop() url_api_nimbo_vital_signs:   string;
  @Prop() token_api_nimbo_vital_signs: string;

  @Prop() vital_signs_data:            string;

  @Prop() vital_signs_set_id:          number;
  @Prop() vital_signs_consultation_id: number;
  @Prop() vital_signs_person_id:       number;
  
  // Imágenes
  @Prop() imgSrc:                      string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  async consultaApiNimbo(){
    this.vital_signs_person_id       = 661303
    this.url_api_nimbo_vital_signs   = "https://nimbox-api-staging.herokuapp.com/api/v1/people/"+this.vital_signs_person_id+"/vital_signs_sets"
    this.token_api_nimbo_vital_signs = 'Bearer 35c34eda9b8646cbb8569978257de86480d5029e42b88f9494bfd2b45b325353'

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
      console.log(this.vital_signs_data)      
   }

  private getEstatura(): number {
    return this.estatura =  this.vital_signs_data[0]['elements']['height']['value'] + [' '] +this.vital_signs_data[0]['elements']['height']['units'];
  }
  private getPeso(): number {
    return this.estatura =  this.vital_signs_data[0]['elements']['weight']['value'] + [' '] +this.vital_signs_data[0]['elements']['weight']['units'];
  }
  private getMasa(): number {
    return this.estatura =  this.vital_signs_data[0]['elements']['body_mass']['value'] + [' '] +this.vital_signs_data[0]['elements']['body_mass']['units'];
  }
  private getTemperatura(): number {
    return this.estatura =  this.vital_signs_data[0]['elements']['temperature']['value'] + [' '] +this.vital_signs_data[0]['elements']['temperature']['units'];
  }
  private getFrecuenciaRespiratoria(): number {
    return this.estatura =  this.vital_signs_data[0]['elements']['respiratory_rate']['value'] + [' '] +this.vital_signs_data[0]['elements']['respiratory_rate']['units'];
  }
  private getSistolica(): number {
    return this.estatura =  this.vital_signs_data[0]['elements']['systole']['value'] + [' '] +this.vital_signs_data[0]['elements']['systole']['units'];
  }
  private getDiastolica(): number {
    return this.estatura =  this.vital_signs_data[0]['elements']['diastole']['value'] + [' '] +this.vital_signs_data[0]['elements']['diastole']['units'];
  }
  private getFrecuenciaCardiaca(): number {
    return this.estatura =  this.vital_signs_data[0]['elements']['heart_rate']['value'] + [' '] +this.vital_signs_data[0]['elements']['heart_rate']['units'];
  }
  /* private getPorcentajeGrasaCorporal(): number {
    return this.estatura =  this.vital_signs_data[0]['elements']['height']['value'] + [' '] +this.vital_signs_data[0]['elements']['height']['units'];
  } */

  private getIcon(tipo){  
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
                <input type="text" value={this.getEstatura()}/>
              </td>                        
            </tr>
            <tr>
              <td> {this.getIcon('peso')} </td>
              <td class="vitalSignsTextos">Peso</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getPeso()}/>
              </td>              
            </tr>
            <tr>
             <td> {this.getIcon('masa_corporal')} </td>
              <td class="vitalSignsTextos">Masa corporal</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getMasa()}/>
              </td>              
            </tr>
            <tr>
              <td> {this.getIcon('temperatura')} </td>
              <td class="vitalSignsTextos">Temperatura</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getTemperatura()}/>
              </td>           
            </tr>
            <tr>
              <td> {this.getIcon('frecuencia_respiratoria')} </td>
              <td class="vitalSignsTextos">Frecuencia respiratoria</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getFrecuenciaRespiratoria()}/>
              </td>              
            </tr>
            <tr>
              <td> {this.getIcon('sistolica')} </td>
              <td class="vitalSignsTextos">Sistólica</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getSistolica()}/>
              </td>             
            </tr>
            <tr>
              <td> {this.getIcon('diastolica')} </td>
              <td class="vitalSignsTextos">Diastólica</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getDiastolica()}/>
              </td>            
            </tr>
            <tr>
              <td> {this.getIcon('frecuencia_cardiaca')} </td>
              <td class="vitalSignsTextos">Frecuencia cardiaca</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getFrecuenciaCardiaca()}/>
              </td>           
            </tr>
            {/* <tr>
              <td> {this.getIcon('porcentaje_grasa_corporal')} </td>
              <td class="vitalSignsTextos">Grasa corporal</td>
              <td class="vitalSignsValores">
                <input type="text" value={this.getPorcentajeGrasaCorporal()}/>
              </td>             
            </tr> */}
          </table>
        </div>
      </div>)
  }
}