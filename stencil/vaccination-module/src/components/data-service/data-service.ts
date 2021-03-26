import { ENV } from '../config/environment';
import { VaccineApplication } from './models';

export class DataService {

  token_api_nimbo: string;
  environment: string;

  constructor(env: string, token_api_nimbo: string){
    this.environment = env;
    this.token_api_nimbo = token_api_nimbo;
  }

  public async deleteVaccineApplication(id_vaccine){
    var _Headers = new Headers();
    _Headers.append("Authorization", "Bearer "+this.token_api_nimbo);
    _Headers.append("Content-Type", "application/json");
    
    let url = this.get_url(this.environment) + `/vaccine_applications/${id_vaccine}`;
    
    let response = await fetch(url, {
      method: 'DELETE',
      headers: _Headers
    })

    let responseRequest = await response.json()
    return responseRequest; 
  }

  public async organizationData(){
    let response = await fetch(
      this.get_url(this.environment) + `/organizations/current`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+this.token_api_nimbo,
        }
      })
    let responseRequest = await response.json()
    return responseRequest; 
  }

  public async personData(person_id: number){
    let response = await fetch(
      this.get_url(this.environment) + `/people/${person_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+this.token_api_nimbo,
        }
      })
    let responseRequest = await response.json()
    return responseRequest; 
  }

  public saveVaccineApplication(vaccine: VaccineApplication){
    this.updateVaccineApplication(vaccine);
  }

  public updateName(ev: Event, vaccine: VaccineApplication){
    vaccine.vaccine_name = (ev.target as any).value;
    this.updateVaccineApplication(vaccine);
  }

  public updateNotes(ev: Event, vaccine: VaccineApplication) {
    vaccine.notes = (ev.target as any).value;
    this.updateVaccineApplication(vaccine);
  }

  public UpdateLote (ev: Event, vaccine: VaccineApplication) {
    vaccine.lote = (ev.target as any).value
    this.updateVaccineApplication(vaccine);
  }

  public updateApplicationDate(ev: Event, vaccine: VaccineApplication) {
    vaccine.application_date = (ev.target as any).value
    this.updateVaccineApplication(vaccine);
  }

  public updateApplicationNextDose(ev: Event, vaccine: VaccineApplication) {
    vaccine.next_dose = (ev.target as any).value
    this.updateVaccineApplication(vaccine);
  }

  public async personVaccines(person_id: number){
    let response = await fetch(
      this.get_url(this.environment) + `/people/${person_id}/vaccine_applications`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+this.token_api_nimbo,
        }
      })
    let responseRequest = await response.json()
    return responseRequest; 
  }

  private get_url(_env: string) {
    let environment = ENV[`${_env}`];

    if (environment === null || environment === undefined) {
      return ENV.staging.apiBaseURL+ENV.apiBasePath
    }
    
    return environment.apiBaseURL+ENV.apiBasePath;
  }

  private updateVaccineApplication(vaccine: VaccineApplication) {
    var raw = JSON.stringify(vaccine);
    var _Headers = new Headers();
    _Headers.append("Authorization", "Bearer "+this.token_api_nimbo);
    _Headers.append("Content-Type", "application/json");
    

    let url = this.get_url(this.environment) + `/vaccine_applications/${vaccine.id}`;
    
    fetch(url, {
      method: 'PUT',
      headers: _Headers,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
  }

  async createVaccine(vaccine: VaccineApplication, person_id: number) {
    var raw = JSON.stringify(vaccine);
    var _Headers = new Headers();
    _Headers.append("Authorization", "Bearer "+this.token_api_nimbo);
    _Headers.append("Content-Type", "application/json");
    
    let url = this.get_url(this.environment) + `/people/${person_id}/create_vaccine_application`;
    
    let response = await fetch(url, {
      method: 'POST',
      headers: _Headers,
      body: raw,
      redirect: 'follow'
    })

    let responseConsulta = await response.json()
    return responseConsulta; 
  }

  public async getVaccines(vaccineName: string, lang: string) {
    let response = await fetch(
      this.get_url(this.environment) + `/vaccines/?language=${lang}&name=${vaccineName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+this.token_api_nimbo,
        }
      })
    let responseConsulta = await response.json()
    return responseConsulta; 
  }

}