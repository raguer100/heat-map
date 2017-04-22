import React from 'react';
import {mount} from 'react-mounter';

import {layout} from './layout.jsx';
import App from '../imports/ui/components/App.jsx';
import Olesine from '../imports/ui/components/Olesine.jsx';
import Login from '../imports/ui/components/Login.jsx';

FlowRouter.route('/', {
	name: 'home',
	action: function() {
		mount (layout, {
			content: <AppContainer />,
			footer: <Olesine />
		})
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action: function() {
		mount (layout, {
			content: <Login />,
			footer: <Olesine />
		})
	}
});
