import React from 'react';
import {mount} from 'react-mounter';

import {layout} from './layout.jsx';
import App from '../imports/ui/components/App.jsx';
import Olesine from '../imports/ui/components/Olesine.jsx';

FlowRouter.route('/', {
	name: 'home',
	action: function() {
		mount (layout, {
			content: <AppContainer />,
			footer: <Olesine />
		})
	}
});
