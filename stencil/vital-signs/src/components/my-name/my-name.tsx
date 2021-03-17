import { Component, h, State } from "@stencil/core";

@Component({
    tag: 'my-name',
    styleUrl: 'my-name.css'
  })
  export class MyName {
  
    @State() value: string;
  
    handleSubmit(e) {
      e.preventDefault()
      console.log(this.value);
      // send data to our backend
    }
  
    handleChange(event) {
      this.value = event.target.value;
    }
  
    render() {
      return (
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            Name:
            <input type="text" value={this.value} onInput={(event) => this.handleChange(event)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }