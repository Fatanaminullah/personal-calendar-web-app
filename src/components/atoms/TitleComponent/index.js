import React from 'react';
import {Helmet} from 'react-helmet';

const TitleComponent = ({title}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="description"
        content="Personal Calendar Website Application created using React JS"
      />
      <title>Personal Calendar Web App</title>
    </Helmet>
  );
};

export default TitleComponent;
