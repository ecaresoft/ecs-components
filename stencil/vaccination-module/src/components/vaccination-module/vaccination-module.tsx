import { Component, Prop, h, State, Listen } from '@stencil/core';
import { DataService } from '../data-service/data-service';
import { VaccineApplication } from '../data-service/models';
import { TranslationUtils } from '../utils/translations';
import { todayStringDate } from '../utils/utils';

@Component({
  tag: 'vaccination-module',
  styleUrl: 'vaccination-module.scss',
  shadow: false
})

export class VaccinationModule {

  @Prop() readonly token_api_nimbo: string;
  @Prop() readonly environment: string;
  @Prop() readonly person_id: number;
  @Prop() readonly language: string;
  @State() vaccines: VaccineApplication[] = [];
  @State() picker: any;
  @State() translations: any;
  private vaccinationCard: HTMLElement;

  private dataService: DataService;

  constructor(){
    this.dataService = new DataService(
      this.environment, 
      this.token_api_nimbo);
  }

  async componentWillLoad() {

    this.dataService.personVaccines(this.person_id)
      .then(data => {
        let vaccines= data.people;
        vaccines.forEach(vaccine => {
          vaccine.readonly = true;
          vaccine.new = false;
        });
        this.vaccines = vaccines;
      });

    this.translations = await TranslationUtils.fetchTranslations(this.language);
  }

  @Listen('vaccineSave')
  VaccineSave(vaccine_index: any) {
    let index = vaccine_index.detail;
    let vaccines = [...this.vaccines];
    let vaccineSave = vaccines[index];
    vaccineSave.readonly = true;
    vaccineSave.new = false;
    vaccines[index] = vaccineSave;
    this.vaccines = vaccines; 
  }

  @Listen('vaccineEdit')
  VaccineEdit(vaccine_index: any) {
    let index = vaccine_index.detail;
    let vaccines = [...this.vaccines];
    let vaccineEdit = vaccines[index];
    vaccineEdit.readonly = !vaccineEdit.readonly;
    vaccines[index] = vaccineEdit;
    this.vaccines = vaccines;
  }

  @Listen('vaccineDeleted')
  VaccinesDelete() {
    this.dataService.personVaccines(this.person_id)
      .then(data => {
        let vaccines= data.people;
        vaccines.forEach(vaccine => {
          vaccine.readonly = true;
          vaccine.new = false;
        });
        this.vaccines = vaccines;
      });
  }

  @Listen('itemSelectedAddManually')
  itemSelectedManually(){
    let _vaccine = new VaccineApplication({
      'vaccine_name': '',
      'vaccine_id': '',
      'lote': '',
      'application_date': todayStringDate(),
      'next_dose': '',
      'notes': '',
      'readonly': false,
      'new': true
    });

    this.dataService.createVaccine(_vaccine, this.person_id)
      .then(data => {
        let newVaccine = data.vaccine_application;
        newVaccine.readonly = false;
        newVaccine.new = true;
        this.vaccines = [...this.vaccines, newVaccine];
      });
  }

  @Listen('itemSelected')
  itemSelected(ev: any) {

    let _vaccine = new VaccineApplication({
      'vaccine_name': ev.detail.name,
      'vaccine_id': ev.detail.id,
      'lote': ev.detail.lote,
      'application_date': todayStringDate(),
      'next_dose': ev.detail.nex_dose,
      'notes': ev.detail.notes,
      'readonly': false,
      'new': true
    });

    this.dataService.createVaccine(_vaccine, this.person_id)
      .then(data => {
        let newVaccine = data.vaccine_application;
        newVaccine.readonly = false;
        newVaccine.new = true;
        this.vaccines = [...this.vaccines, newVaccine];
      });
  }

  private printVaccinationCard(){
    if(this.vaccines.length > 0){
      let vaccinationCardElement = this.vaccinationCard;
      let body = vaccinationCardElement.innerHTML;
      let configuration = 
        "menubar=no,location=no,resizable=no,scrollbars=yes,";
      configuration += "status=no,toolbar=no, titlebar=no, height=600px, width=800px";
      let mediaPrintStyle = "<style media='print'>  * { visibility: visible;  } </style>";
      let w = window.open('', '_blank', configuration);
      w.document.write("<html><head>"+ mediaPrintStyle +"<title>" 
        + this.translations.vaccination_card
        + "</title></head><body>"
        + body
        + "</body></html>");

      w.window.print();
      w.window.close();
    }
  }

  render() {
    return (
      <div class="vaccination-module">
        <div class="vaccination-module-head">
          <div class="title"> { this.translations.title } </div>
          <div class="print-btn-container">
            <button class="icon-print" onClick={ () => this.printVaccinationCard() } 
              aria-label="pritn vacine card"/>
          </div>
        </div>
        
        <auto-complete
          id="autocomplete"
          token_api_nimbo={this.token_api_nimbo}
          language={ this.language }
          environment={this.environment}
          placeholder={ this.translations.vaccine }
        ></auto-complete>

        <vaccine-table
          vaccines={ this.vaccines } 
          environment={ this.environment}
          language={ this.language } 
          token_api_nimbo={this.token_api_nimbo} >
        </vaccine-table>

        <vaccination-card
          ref={el => this.vaccinationCard = el }
          vaccines={ this.vaccines } 
          environment={ this.environment}
          person_id={ this.person_id }
          language={ this.language } 
          token_api_nimbo={this.token_api_nimbo} >
        </vaccination-card>

      </div>
    )
  }
}
