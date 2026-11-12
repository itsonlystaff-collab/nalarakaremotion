import {Config} from '@remotion/cli/config';

// Software WebGL backend: suitable for headless cloud runners without a GPU.
Config.setChromiumOpenGlRenderer('swangle');
Config.setConcurrency(2);
