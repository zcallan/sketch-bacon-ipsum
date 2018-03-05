export default async context => {
  const selectedLayers = context.selection;
  const selectedCount = selectedLayers.count();

  /* Make sure there is at least 1 layer to fill. */
  if ( !selectedCount ) {
    context.document.showMessage( '❌ Cannot perform Bacon Ipsum - No layers selected!' );
    log( '❌ Failed - No layers selected!' );
    return false;
  }

  /* Fetch the 'Bacon ipsum' paragraph. */
  const request = await fetch( `https://baconipsum.com/api/?type=all-meat&paras=${selectedCount}&start-with-lorem=0` );
  const baconIpsum = await request.json();

  /* Fill each layer with 'Bacon ipsum ...' */
  selectedLayers.forEach(( layer, index ) => {
    layer.stringValue = baconIpsum[index];
  });

  context.document.showMessage( '🥓 Enjoy your bacon! 🥓' );
  log( '✅ Complete!' );
}
