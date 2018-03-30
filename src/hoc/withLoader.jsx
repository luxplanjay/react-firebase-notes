import React from 'react';
import Loader from '../components/Loader';

const withLoader = WrappedComponent => props =>
  props.isLoading
    ? <Loader />
    : <WrappedComponent {...props} />;

export default withLoader;
