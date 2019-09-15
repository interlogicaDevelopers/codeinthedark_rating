import tmplService from '../service/TmplService.js'

export default (data) => {
      return `<a-entity id="waitingRound" 
                  data-status='waiting' 
                  component-padding="${tmplService.componentPadding}"  
                  position="${tmplService.panelPosition}",
                  rotation="${tmplService.panelRotation}" 
                  panel-color="${tmplService.panelColor}" 
                  material="${tmplService.panelMaterial}" 
                  geometry="${tmplService.panelGeometry}" >
            <a-text width="${tmplService.panelTextWidth}" height="${tmplService.panelTextHeight}" 
                  value="Aspetta\nil momento di votare" 
                  text="${tmplService.panelTextStyle}"
                  shader= "msdf"
                  font="${tmplService.text.fontUrl}"
                  position="0 0 0.1" 
                  scale="${tmplService.panelTextScale}"></a-text>
      </a-entity>`
}
