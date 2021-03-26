import { Component, Prop, h, State, EventEmitter, Event } from '@stencil/core';
import { DataService } from '../data-service/data-service';
import { VaccineApplication, Person, Organization } from '../data-service/models';
import { TranslationUtils } from '../utils/translations';

@Component({
  tag: 'vaccination-card',
  styleUrl: 'vaccination-card.scss',
  shadow: false
})

export class VaccinatonCard {

  @Prop() readonly token_api_nimbo: string;
  @Prop() readonly environment: string;
  @Prop() readonly person_id: number;
  @Prop() readonly vaccines: VaccineApplication[] = [];
  @Prop() readonly language: string;
  
  @State() person: Person = null;
  @State() organization: Organization = null;
  @State() translations: any;
  
  @Event() vaccineDeleted: EventEmitter;
  private dataService: DataService;

  constructor(){
    this.dataService = new DataService(
      this.environment, 
      this.token_api_nimbo
    );
  }

  async componentWillLoad() {
    this.retrieveOrganization();
    this.retrievePersonData();
    this.translations = await TranslationUtils.fetchTranslations(this.language);
  }

  private retrievePersonData(){
    this.dataService.personData(this.person_id)
      .then(data => {
        this.person = data.person;
      });
  }

  private retrieveOrganization(){
    this.dataService.organizationData()
      .then(data => {
        this.organization = data.organization;
      });
  }

  private tableStyle() {
    return {
      'border': 'solid 1px black',
      'border-collapse': 'collapse',
      'width': '100p%',
      'table-layout': 'fixed',
      'font-family': '"Proxima Nova", "Helvetica Neue"'
    }
  }

  private borderStyle() {
    return{
      'border': 'solid 1px black',
      'text-align': 'center',
      'font-family': '"Proxima Nova", "Helvetica Neue"'
    }
  }

  private titleStyle() {
    return {
      'position':'relative',
      'color': 'gray',
      'left': '90px',
      'font-family': '"Proxima Nova", "Helvetica Neue"'
    }
  }

  private imageStyle(){
    return {
      'width': '50px',
      'height': '50px',
      'position':'relative',
      'right': '-250px',
      'top': '10px'
    }
  }

  private containerStyle() {
    return{
      'display': 'flex'
    }
  }

  private vaccinationCardStyle(){
    return {
      'visibility': 'hidden',
      'font-family': '"Proxima Nova", "Helvetica Neue"'
    }
  }

  private bodyTable() {
    let arrayBody = [];
    if(this.vaccines.length > 0){
      this.vaccines.forEach((vaccine) => {
        arrayBody.push(
          <tr style={this.borderStyle() } >
            <td style={this.borderStyle() } > { vaccine.vaccine_name }</td>
            <td style={this.borderStyle() } >
              { vaccine.lote }
            </td>
            <td style={this.borderStyle() } >
              { vaccine.application_date }
            </td>
            <td style={this.borderStyle() } >
              { vaccine.next_dose }
            </td>
            <td style={this.borderStyle() } >
              { vaccine.notes }
            </td>
          </tr>
        )
      });
    }
    return arrayBody;
  }

  private table() {
    return (
      <div class="vaccination-card" style={ this.vaccinationCardStyle() } >
        { this.organization &&
        <div style={ this.containerStyle() }>
          <h2 style={ this.titleStyle() } >{ this.organization.name }</h2>
          <img style={ this.imageStyle() } 
            src={ this.organization.landing_page_info.logo }/>
        </div>
        }
        { this.person &&
        <div>
          <h3> { this.translations.pacient }: { this.person.full_name }</h3>
          <h4>{ this.translations.born_at }: { this.person.born_at }</h4>
        </div>
        }
        <table class="vaccine-table-card" style={ this.tableStyle() }>
          <tr style={this.borderStyle() } >
            <th style={this.borderStyle() } > { this.translations.vaccine }</th>
            <th style={this.borderStyle() } > { this.translations.lot} </th>
            <th style={this.borderStyle() } > { this.translations.application_date }</th>
            <th style={this.borderStyle() } > { this.translations.next_dose }</th>
            <th style={this.borderStyle() } > {this.translations.notes } </th>
          </tr>

          { this.bodyTable() }
      
        </table>
      </div>
    )
  }

  render() {
    return (
      <div class="vaccineCardFormat" id="vaccineCardFormat">
        { this.table() }
      </div>)
  }
}
