import React from 'react';
import {mount} from 'react-mounter';

import {layout} from './layout.jsx';
import App from './App.jsx';
import Olesine from './Olesine.jsx';

FlowRouter.route('/', {
	name: 'home',
	action: function() {
		mount (layout, {
			content: <App />,
			footer: <Olesine />
		})
	}
});
