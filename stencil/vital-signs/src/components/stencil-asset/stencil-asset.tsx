import { Component, Prop, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'stencil-asset',
  styleUrl: 'stencil-asset.css',
  assetsDirs: ['assets']
})

export class StencilAsset {
  icons_file_names = {
    'height': "estatura.png",
    'weight': "peso.png",
    'temperature': "temperatura.png",
    'respiratory_rate': "frecuencia_respiratoria.png",
    'systole': "sistolica.png",
    'diastole': "diastolica.png",
    'heart_rate': "frecuencia_cardiaca.png",
    'body_mass': "masa_corporal.png",
    'body_fat_percentage': "porcentaje_grasa_corporal.png",
    'lean_body_mass': "masa_muscular.png",
    'head_circumference': "perimetro_cefalico.png",
    'oxygen_saturation': "saturacion_oxigeno.png"
  }
  @Prop() icon = "";
  render() {
   return <img src={getAssetPath(`https://nimbox-production.s3.amazonaws.com/publico/microfrontends/vital-signs/assets/${this.icons_file_names[this.icon]}`)} />
  }
}