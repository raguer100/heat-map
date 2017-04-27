import React from 'react';
import {mount} from 'react-mounter';

import {layout} from './layout.jsx';
import AppContainer from '../imports/ui/components/AppContainer.jsx';

FlowRouter.route('/', {
	name: 'home',
	action: function() {
		mount (layout, {
			content: <AppContainer />
		})
	}
});
