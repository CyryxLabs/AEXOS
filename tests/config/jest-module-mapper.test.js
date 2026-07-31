'use strict';

describe('Jest moduleNameMapper', () => {
  test('resolves package-style aexos-core imports to framework modules', () => {
    const LayerProcessor = require('aexos-core/core/synapse/layers/layer-processor');

    expect(typeof LayerProcessor).toBe('function');
    expect(LayerProcessor.name).toBe('LayerProcessor');
  });
});
