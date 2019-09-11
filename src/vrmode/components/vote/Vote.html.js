import tmplService from '../../components/scene/service/TmplService.js'
import utils from '../../utils/Dom.js'

export default (data) => {
    return `<a-entity
                id="voteContainer"
                component-padding="${tmplService.componentPadding}"
                position="0 2 -3" 
                rotation="${tmplService.panelRotation}" 
                panel-color="${tmplService.panelColor}"
                material="${tmplService.panelMaterial}" 
                geometry="depth: 0.01; height: 8; width: 12">

                <a-entity position="-4 0 0" geometry="depth: 0.01; height: 6; width: 4" material="${tmplService.panelMaterial}" >
                    <a-text value="Layout" 
                        text="anchor: center; width: 12; height: 2; align: center; color: #68f19d; opacity: 0.9"
                        position="0 3 0.1" 
                        scale="1.2 1.2 1.2"></a-text>

                    <a-image 
                        src="${utils.secureUrl(data.layout_url) || ''}" 
                        geometry="width: 3.5; height: 2" 
                        position="0 1.1 0.1" ></a-image>
                        
                </a-entity>

                <a-entity position="2 0 0" geometry="depth: 0.01; height: 6; width: 8" material="${tmplService.panelMaterial}" >
                    <a-text value="${data.name}" 
                        text="anchor: center; width: 12; height: 1; align: center; color: #68f19d; opacity: 0.9" 
                        position="0 3 0.1" 
                        scale="1.2 1.2 1.2"></a-text>

                    <a-image 
                        src="${utils.secureUrl(data.preview_url) || ''}" 
                        geometry="width: 7; height: 4.5" 
                        position="0 0 0.1"></a-image>
                </a-entity>
                <a-entity position="0 -3.2 0" geometry="depth: 0.01; height: 1.5; width: 11.5" material="${tmplService.panelMaterial}" >
                    <a-image
                        src="#btn-back"
                        class="clickable cancel"
                        geometry="width: 1.08; height: 1"
                        position="-5 0 0.1" 
                        ></a-image>

                    <a-image
                        src="#btn-vote"
                        class="clickable confirm"
                        data-id="${data._id}" 
                        data-name="${data.name}"
                        geometry="width: 2.21; height: 1"
                        position="2 0 0.1" 
                        ></a-image>
                </a-entity>
            </a-entity>`
}
