import gifService from '../scene/service/GifService.js';
import tmplService from '../scene/service/TmplService.js'

export default () => {
      const gc = gifService.showAsset();
      return `<a-entity id="alreadyVoted" 
            data-status='waiting' 
            component-padding="0.1"  
            width="10" 
            height="3" 
            position="0 2.5 -3" 
            rotation="-10 0 0" 
            panel-color="${tmplService.panelColor}" 
            material="${tmplService.panelMaterial}" 
            geometry="depth: 0.01; height: 7; width: 12">
                  <a-text width="9" height="1.3" 
                  shader= "msdf"
                  font="${tmplService.text.fontUrl}"
                  value="Hai gia&grave;votato\nper questo round!" 
                  text="anchor: center; width: 10; height: 2; align: center; color: #68f19d; opacity: 0.9" 
                  position="0 1.5 0.1" scale="2 2 2"></a-text>
                  ${gc}                        
      </a-entity>`
}
