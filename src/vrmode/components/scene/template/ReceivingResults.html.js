import tmplService from '../service/TmplService.js'

export default () => {
      return `<a-entity id="receivingResults" 
                  data-status='waiting' 
                  component-padding="${tmplService.componentPadding}"  
                  position="${tmplService.panelPosition}",
                  rotation="${tmplService.panelRotation}" 
                  panel-color="${tmplService.panelColor}" 
                  material="${tmplService.panelMaterial}" 
                  geometry="${tmplService.panelGeometry}" >
            <a-text width="${tmplService.panelTextWidth}" height="${tmplService.panelTextHeight}" 
                  value="In attesa\ndei risultati"
                  shader= "msdf"
                  font="${tmplService.text.fontUrl}"
                  text="${tmplService.panelTextStyle}" 
                  position="0 0 0.1" 
                  scale="${tmplService.panelTextScale}"></a-text>
      </a-entity>`
}
