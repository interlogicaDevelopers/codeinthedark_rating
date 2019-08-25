export default (data) => {
      return `<a-entity id="voteCountdown" data-status="voting" component-padding="0.1" position="6 6 -3" rotation="20 -50 0" panel-color="#212121" visible="" material="color: #0c0c0c; fog: false; transparent: true; opacity: 0.9" geometry="depth: 0.01; height: 2; width: 2">
                  <a-text width="9" height="1.3" id="countdown" value="13:35" text="anchor: center; width: 7; height: 2; align: center; color: #020f07; opacity: 0.9; alphaTest: 1.5; negate: true; transparent: false" position="0 0 0.1" scale="2 2 2"></a-text>
            </a-entity>`
}
