import {Component, h, Prop, State, Method} from '@stencil/core';

@Component({
  tag: 'collapsible-chart',
  styleUrl: 'collapsible-chart.css',
  shadow: true
})
export class CollapsibleChart {
  @Prop() title: string;
  @State() collapsed = true;

  @Method()
  toggle() {
      console.log("Me hicieron click");
      this.collapsed = !this.collapsed;
  }
  componentDidLoad(){
    console.log("Collapsible chart did load")

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