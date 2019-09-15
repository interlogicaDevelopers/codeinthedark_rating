import gifService from '../service/GifService.js';

export default (data) => {
      const gc = gifService.showAsset();
      return `<a-entity id="voteConfirm" data-status='voted' component-padding="0.1"  width="10" height="3" position="0 2.5 -3" rotation="-10 0 0" panel-color="#212121" visible="" material="color: #0c0c0c; fog: false; transparent: true; opacity: 0.9" geometry="depth: 0.01; height: 7; width: 12">
            ${gc}
            </a-entity>`
}
