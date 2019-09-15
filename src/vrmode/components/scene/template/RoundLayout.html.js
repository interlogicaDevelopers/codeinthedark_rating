import utils from '../../../utils/Dom.js'

export default (data) => {
      return `
            <a-entity id="roundLayout" 
                  data-status="voting" 
                  component-padding="0.2" 
                  position="0 -1.5 -8" 
                  rotation="0 0 0"
                  visible="false"
                  panel-color="#212121"
                  material="color: #0c0c0c; fog: false; transparent: true; opacity: 0.9" 
                  geometry="depth: 0.01; height: 5; width: 9">
                  <a-image id="imgRoundLayout" 
                        src="${utils.secureUrl(data.layout_url)}" 
                        geometry="width: 8.5; height: 4.8" 
                        position="0 0.05 0.1"></a-image>
            </a-entity>`
}
