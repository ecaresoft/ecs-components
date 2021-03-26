import { Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';
import { TranslationUtils } from '../utils/translations';

@Component({
  tag: 'modal-dialog',
  styleUrl: 'modal-dialog.scss',
  shadow: true
})

export class ModalDialog {
  @Prop() readonly language: string;
  @Prop() readonly showModal: boolean = false;
  @Event() confirmationDelete: EventEmitter;
  @State() translations: any;
  
  async componentWillLoad() {

    this.translations = await TranslationUtils.fetchTranslations(this.language);
  }

  private modalDialog() {
    return(
      <div class={'overlay '
        + (this.showModal ? 'is-visible' : '') }>
        <div class="modal-window">
          <div class="modal-window__content">
            <div class="modal-header">
              <h4 class="title">{ this.translations.delete_vaccine }</h4>
            </div>
            <div class="message">
              { this.translations.dialog_delete_vaccine }
            </div>
            <div class="line-header" />
            <div class="button-group">
              <button class="btn-cancel"
                onClick={() => this.confirmationDelete.emit(false) }>
                { this.translations.cancel }
              </button>
              <button class="btn-delete" 
                onClick={() => this.confirmationDelete.emit(true) }>
                { this.translations.delete }
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.modalDialog() }
      </div>)
  }
}
