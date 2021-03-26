import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'alert-dialog',
  styleUrl: 'alert-dialog.scss',
  shadow: false
})

export class AlertDialog {
  @Prop() readonly language: string = 'es';
  @Prop() readonly message: string;
  

  constructor(){

  }

  componentWillLoad() {
  }


  private alertDialgo() {
    return(
      
      <div class="alert success">
        <input type="checkbox" id="alert2"/>
        <label class="close" title="close">
          <i class="icon-remove"></i>
        </label>
        <p class="inner">
          Your alerts have dismissed successfully.
        </p>
      </div>
    )

  }

  render() {
    return (
      <div>
        <a href="#modal-one" class="btn btn-big">Modal!</a>
        { this.alertDialgo() }
      </div>)
  }
}
