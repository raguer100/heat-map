import React, { Component, constructor } from 'react';
import { Tasks } from '../../api/tasks.js';
import { createContainer } from 'meteor/react-meteor-data';
import App from './App';

export default AppContainer = createContainer(() => {

  Meteor.subscribe('tasks');
  var tasks = Tasks.find({}).fetch();

  return {
    tasks,
  };
}, App);
