import gifService from './GifComponent.js';

export default (data) => {
      const gc = gifService.renderGif();
    return `<a-entity id="voteConfirm" data-status='voted' component-padding="0.1"  width="10" height="3" position="0 2.5 -3" rotation="-10 0 0" panel-color="#212121" visible="" material="color: #0c0c0c; fog: false; transparent: true; opacity: 0.9" geometry="depth: 0.01; height: 7; width: 12">
            <a-text width="9" height="1.3" value="Hai votato\n${data.name}" text="anchor: center; width: 12; height: 2; align: center; color: #68f19d; opacity: 0.9" position="0 0 0.1" scale="2 2 2"></a-text>
            ${gc}
            </a-entity>`
}
