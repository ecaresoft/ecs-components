import {Component, Event, EventEmitter, Element, h, Prop, State, Method} from '@stencil/core';

@Component({
  tag: 'collapsible-chart',
  styleUrl: 'collapsible-chart.css',
  shadow: true
})

export class CollapsibleChart {
  @Prop() title: string;
  @State() collapsed = true;
  @Element() element: HTMLElement;
  @Event() reloadCanvas: EventEmitter<String>;

  @Method()
  toggle() {
      let contenedor = this.element.shadowRoot.querySelector(".contenedorChart")
      if(this.collapsed){
        contenedor.classList.add("contenedorChartAbierto")
      }else{
        contenedor.classList.remove("contenedorChartAbierto")
      }
      this.collapsed = !this.collapsed;
      let canvas = this.element.querySelector('canvas');
      this.reloadCanvas.emit(canvas.id);
  }

  componentDidLoad(){

  }

  render() {
    return (
        <div class="contenedorChart">
            <div id="header" onClick={this.toggle.bind(this)}>
                <span>{this.title}</span>
            </div>
            <div id="content" hidden={this.collapsed}>                    
                <slot />
            </div>
        </div>
    );
  }
}