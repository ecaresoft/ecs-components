import { Component, Prop, h, State, EventEmitter, Event, Listen } from '@stencil/core';
import { DataService } from '../data-service/data-service';
import { VaccineApplication } from '../data-service/models';
import { TranslationUtils } from '../utils/translations';
import {
  localizationEnglish,
  localizationSpanish,
  localizationArabic,
  DuetLocalizedText
} from './locale-calender';

@Component({
  tag: 'vaccine-table',
  styleUrl: 'vaccine-table.scss',
  shadow: false
})

export class VaccineTable {

  @Prop() readonly token_api_nimbo: string;
  @Prop() readonly environment: string;
  @Prop() readonly vaccines: VaccineApplication[] = [];
  @Prop() readonly language: string;

  @State() openModal: boolean = false;
  @State() localization: DuetLocalizedText;
  @State() vaccineItemsShow: any = [];
  @State() idVaccineToDelete: number;
  @State() translations: any;

  @Event() vaccineDeleted: EventEmitter;
  @Event() vaccineEdit: EventEmitter;
  @Event() vaccineSave: EventEmitter;
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService(
      this.environment,
      this.token_api_nimbo
    );

    switch (this.language) {
      case 'es':
        this.localization = localizationSpanish;
        break;
      case 'en':
        this.localization = localizationEnglish;
        break;
      case 'ar':
        this.localization = localizationArabic;
        break;
      default:
        this.localization = localizationEnglish;
    }
  }

  async componentWillLoad() {
    this.translations = await TranslationUtils.fetchTranslations(this.language);
  }

  @Listen('confirmationDelete')
  confirmationDelte(ev: any) {
    let confirmation = ev.detail;
    if (confirmation) {
      this.dataService.deleteVaccineApplication(this.idVaccineToDelete)
        .then(() => {
          this.vaccineDeleted.emit();
        });
    }
    this.openModal = false;
  }

  private deleteVaccineApplication(vaccine: VaccineApplication) {
    this.idVaccineToDelete = vaccine.id;
    this.openModal = true;
  }

  private editVaccine(index: number) {
    this.vaccineEdit.emit(index);
  }

  private cancell(vaccine: VaccineApplication, index: number) {
    if (vaccine.new) {
      this.deleteVaccineApplication(vaccine);
    } else {
      this.vaccineEdit.emit(index);
    }
  }

  private saveVaccine(vaccine: VaccineApplication, index: number) {
    this.dataService.saveVaccineApplication(vaccine);
    this.vaccineSave.emit(index);
  }

  private setShowVaccineItem(index: number) {
    if (this.vaccineItemsShow.length > 0) {
      if (this.vaccineItemsShow.includes(index)) {
        this.vaccineItemsShow = this.vaccineItemsShow.filter(item => item !== index);
      } else {
        this.vaccineItemsShow = [...this.vaccineItemsShow, index];
      }
    } else {
      this.vaccineItemsShow = [...this.vaccineItemsShow, index];
    }
  }

  private vaccineNameInputStyle() {
    return {
      'width': '88%',
      'height': '30px',
      'margin-top': '-15px',
      'font-size': '12px',
      'font-weight': '600',
      'color': '#76869e'
    }
  }

  private vaccineForm() {
    let vaccineForm = [];
    if (this.vaccines.length > 0) {
      this.vaccines.forEach((vaccine, index) => {
        vaccineForm.push(

          <div class="vaccine-module">
            <div class="flex flex-row vaccine-module-head">
              {
                vaccine.vaccine_id !== null ?
                  <label class="tag-vaccine-name">  {vaccine.vaccine_name} </label> :
                  <input type="text"
                    style={this.vaccineNameInputStyle()}
                    class={vaccine.readonly ?
                      "input-vaccine-name readonly" : "input-vaccine-name"}
                    disabled={vaccine.readonly ? true : false}
                    id="name"
                    name="name"
                    placeholder={this.translations.vaccine_name}
                    value={vaccine.vaccine_name}
                    onInput={e => this.dataService.updateName(e, vaccine)}
                  />
              }

              <div class="btn-group">
                <button
                  class={
                    this.vaccineItemsShow.includes(index) ?
                      'icon-arrow-up' : 'icon-arrow-down'
                  }
                  onClick={() => this.setShowVaccineItem(index)} />
              </div>
            </div>
            <div class={
              (this.vaccineItemsShow.includes(index) || vaccine.new) ?
                'vaccine-cont show' : 'vaccine-cont hidden'}
            id={'vaccine-module-item-' + index}>

              <div class="line-header" />
              <div class="contenedor vaccine-item">
                <div class="date-picker-label">
                  <label>{this.translations.application_date}</label>
                </div>
                <div class="date-picker">
                  <input
                    type="date"
                    class="application-date-input"
                    disabled={vaccine.readonly ? true : false}
                    id={'vaccine-application-date-' + index}
                    name={'vaccine-application-date-' + index}
                    value={vaccine.application_date}
                    onInput=
                      {(ev) => vaccine.application_date = (ev.target as any).value}
                  />
                </div>
              </div>
              <div class="contenedor vaccine-item">
                <div class="date-picker-label">
                  <div class="next-dose-label">
                    {this.translations.next_dose}
                  </div>
                </div>
                <div class="date-picker">
                  <input
                    type="date"
                    class="next-dose-input"
                    disabled={vaccine.readonly ? true : false}
                    id={'vaccine-next-dose-' + index}
                    name={'vaccine-next-dose-' + index}
                    value={vaccine.next_dose}
                    onInput=
                      {(ev) => vaccine.next_dose = (ev.target as any).value}
                  />
                </div>
              </div>
              <div class="contenedor vaccine-item">
                <div class="tag-item">
                  <label> {this.translations.lot} </label>
                </div>
                <div class="input-item">
                  <input type="text"
                    class={vaccine.readonly ? "lote readonly" : "lote"}
                    id="lote"
                    placeholder={this.translations.placeholder_lot}
                    disabled={vaccine.readonly ? true : false}
                    name="lote"
                    value={vaccine.lote}
                    onInput={(ev) => vaccine.lote = (ev.target as any).value}
                  />
                </div>
              </div>
              <div class="contenedor vaccine-item">
                <div class="tag-item">
                  <label> {this.translations.notes} </label>
                </div>
                <div class="input-item">
                  <textarea
                    rows={4}
                    class={vaccine.readonly ? "notes readonly" : "notes"}
                    placeholder={this.translations.placeholder_notes}
                    disabled={vaccine.readonly ? true : false}
                    id="notes"
                    name="notes"
                    value={vaccine.notes}
                    onInput={(ev) => vaccine.notes = (ev.target as any).value}
                  />
                </div>
              </div>
              <div class="vaccine-module-footer">
                {
                  !vaccine.readonly ?
                    <div class="btn-group">
                      <button class="btn-cancell"
                        onClick={() => this.cancell(vaccine, index)}>
                        {this.translations.cancel}
                      </button>
                      <button class="btn-save"
                        onClick={
                          () => this.saveVaccine(vaccine, index)
                        }>
                        {this.translations.save}
                      </button>
                    </div> :
                    <div class="btn-group">
                      <button class="icon-edit"
                        onClick={() => this.editVaccine(index)}></button>
                      <button class="icon-trash"
                        onClick={() => this.deleteVaccineApplication(vaccine)}></button>
                    </div>
                }
              </div>
            </div>
          </div>
        )
      });
    }
    return vaccineForm
  }

  render() {
    return (
      <div>
        {this.vaccineForm()}
        <modal-dialog
          id="modal"
          language={this.language}
          showModal={this.openModal}>
        </modal-dialog>
      </div>)
  }
}
