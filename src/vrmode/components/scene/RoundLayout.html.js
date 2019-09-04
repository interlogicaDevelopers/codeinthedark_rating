export default (data) => {
      return `
            <a-entity id="roundLayout" data-status="voting" component-padding="0.2" position="0 -1.5 -8" rotation="0 0 0" panel-color="#212121" visible="" material="color: #0c0c0c; fog: false; transparent: true; opacity: 0.9" geometry="depth: 0.01; height: 5; width: 9">
                  <a-image id="imgRoundLayout" src="${data.layout_url}" material="" geometry="width: 8.5; height: 4.8" position="0 0.05 0.1"></a-image>
            </a-entity>`
}
