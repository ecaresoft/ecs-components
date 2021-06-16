import { Component, Prop, State, Listen, Element, 
  Watch, h, JSX, Event, EventEmitter } from '@stencil/core';
import { DataService } from '../data-service/data-service';

@Component({
  tag: 'auto-complete',
  styleUrl: 'auto-complete.scss',
  shadow: true
})

export class AutoComplete {

  constructor(){
    this.dataService = new DataService(
      this.environment, 
      this.token_api_nimbo);
    
    let _locale: any;

    if(this.language.includes('-')) {
      _locale = this.language.split('-');
      _locale = _locale[0];
    }else {
      _locale = this.language;
    }

    switch(_locale){
      case 'es':
        this.addVaccinesCaption = '+ Agregar vacuna manualmente';
        break;
      case 'en':
        this.addVaccinesCaption = '+ Add vaccine manually';
        break;
      case 'ar':
        this.addVaccinesCaption = '+ اضافة اللقاح يدويا';
        break;
      default:
        this.addVaccinesCaption = '+ Add vaccine manually';
    }
  }

  private dataService: DataService;

  // eslint-disable-next-line @stencil/element-type
  @Element() element: HTMLElement;

  @State() showSuggestions: boolean;
  @State() inputValue = '';
  @State() suggestionArr: string[] = [];
  @State() selectedSuggestionIndex: number;
  @State() suggestionlist: string[] = [];
  @State() suggestionObj: object[] = [];
  @State() addVaccinesCaption: string;

  @Prop() readonly language: string;
  @Prop() readonly placeholder: string = '';
  @Prop() readonly token_api_nimbo: string = '';
  @Prop() readonly environment: string = '';
  @Prop() readonly filterKey: string = '';

  @Event() itemSelected: EventEmitter;
  @Event() itemSelectedAddManually: EventEmitter;

  @Watch('suggestionlist')
  objectToArray(suggestions){
    let arr = [];
    suggestions.forEach((item) => {
      arr.push(item.name);
    });

    return arr;
  }

  @Listen('click')
  handleWindowClick(e: Event) {
    if (!this.element.contains((e.target as HTMLElement))) {
      this.showSuggestions = false;
      this.selectedSuggestionIndex = undefined;
    }
  }

  componentWillLoad() {

  }

  private findMatch = (searchTerm: string): string[] => {
    if (searchTerm.length < 3) {
      return [];
    }

    let suggestions = this.suggestionlist.filter(
      (term) => {
        searchTerm = searchTerm.toLowerCase();
        term = term.toLowerCase();
        return term.includes(searchTerm);
      }
    );

    suggestions = [this.addVaccinesCaption, ...suggestions];
    return suggestions;
  };

  private onInput = (e: Event) => {
    this.inputValue = (e.target as any).value;
    this.suggestionArr = this.findMatch(this.inputValue);
    this.showSuggestions = true;
  };

  private onFocus = () => {
    this.showSuggestions = true;
    this.selectedSuggestionIndex = undefined;
    this.suggestionArr = this.findMatch(this.inputValue);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    switch(e.key) {
      case 'ArrowUp':
        if (this.suggestionArr.length > 0) {
          this.selectedSuggestionIndex =
            (this.selectedSuggestionIndex === undefined ||
              this.selectedSuggestionIndex === 0) ?
              this.suggestionArr.length - 1 : this.selectedSuggestionIndex - 1;
        }
        break;
      case 'ArrowDown':
        if (this.suggestionArr.length > 0) {
          this.selectedSuggestionIndex =
            (this.selectedSuggestionIndex === undefined ||
              this.selectedSuggestionIndex === this.suggestionArr.length - 1) ?
              0 : this.selectedSuggestionIndex + 1;
        }
        break;
      default:
        break;
    }
  };

  private onKeyPress = (e) => {
    let _locale;

    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.selectedSuggestionIndex !== undefined) {
        this.onSelect(this.suggestionArr[this.selectedSuggestionIndex]);
      }
    }

    if(this.language.includes('-')) {
      _locale = this.language.split('-');
      _locale = _locale[0];
    }else {
      _locale = this.language;
    }

    this.dataService.getVaccines(this.inputValue, _locale)
      .then(data => {
        this.suggestionObj = data.vaccines;
      });

    let arreglo = this.objectToArray(this.suggestionObj);
    this.suggestionlist = arreglo;
  }

  private onSelect = (selection: string) => {
    this.selectedSuggestionIndex = undefined;
    this.showSuggestions = false;
    if(selection === this.addVaccinesCaption){
      this.itemSelectedAddManually.emit(this.inputValue);
    }else{
      this.emitSelect(selection);
    }
    this.inputValue = "";
  }

  private emitSelect(selection: string){
    let selectItem = this.suggestionObj
      .filter((suggestion: { name: ''}) =>  suggestion.name === selection );
    if(selectItem.length > 0){
      this.itemSelected.emit(selectItem[0]);
    }
  }

  private getSuggestionElement = (suggestion): JSX.Element => {
    const isSelected = this.selectedSuggestionIndex !== undefined &&
      suggestion === this.suggestionArr[this.selectedSuggestionIndex];
    return (
      <li
        class={'xeph-li ' + (isSelected ? 'xeph-selected': '')}
        onClick={() => this.onSelect(suggestion)}
      >
        {suggestion}
      </li>
    );
  };

  render() {
    return (
      <div class='xeph-div'>
        <input
          class='xeph-input input-search'
          type="text"
          placeholder={ this.placeholder }
          value={this.inputValue}
          onInput={e => this.onInput(e)}
          onFocus={() => this.onFocus()}
          onKeyDown={e => this.onKeyDown(e)}
          onKeyPress={e => this.onKeyPress(e)}
        />
        <ul class='xeph-ul' role='listbox' hidden={!this.showSuggestions}>
          {this.suggestionArr.map(suggestion => this.getSuggestionElement(suggestion))}
        </ul>
      </div>
    );
  }
}
