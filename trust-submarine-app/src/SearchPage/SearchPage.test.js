import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import SearchPage from './SearchPage.js';

describe('SearchPage: Basic Render', () => {
  it('renders SearchPage component', () => {
    render(<MemoryRouter><SearchPage /></MemoryRouter>);
  });
});
