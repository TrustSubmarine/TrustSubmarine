import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the useNavigate function before importing other functionalities
const mockNav = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNav
}));

import { MemoryRouter, Routes, Route } from "react-router-dom";
import SearchPage from './SearchPage.js';

const renderSearchPage = () => render(<MemoryRouter><SearchPage /></MemoryRouter>);

describe('SearchPage', () => {
  it('has search bar', () => {
    renderSearchPage();
    const searchbar = screen.getByRole('textbox');
    expect(searchbar).toBeInTheDocument();
    expect(searchbar).toBeVisible();
  });
  it('has search button', () => {
    renderSearchPage();
    const searchbar = screen.getByRole('textbox');
    const searchbutton = searchbar.closest('form').querySelector('button');
    expect(searchbutton).toBeInTheDocument();
    expect(searchbutton).toBeVisible();
    expect(searchbutton.getAttribute('aria-label')).toMatch(/search/i);
  })
});

describe ('SearchPage: searchbar', () => {
  it('returns the right URL', async () => {
    renderSearchPage();

    const searchbar = screen.getByRole('textbox');
    const searchbutton = searchbar.closest('form').querySelector('button');
    userEvent.type(searchbar, "https://www.amazon.in/ESR-Paper-Feel-Compatible-Generation-Application/dp/B0B87PN2TZ/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=trc5M&content-id=amzn1.sym.cd312cd6-6969-4220-8ac7-6dc7c0447352&pf_rd_p=cd312cd6-6969-4220-8ac7-6dc7c0447352&pf_rd_r=0DR18XPTDV6RM8BF4WZF&pd_rd_wg=AK8mW&pd_rd_r=7dfb79db-4c46-4359-8dde-977c51ba069c&pd_rd_i=B0B87PN2TZ");
    fireEvent.click(searchbutton);

    await waitFor(() => expect(mockNav).toHaveBeenCalled());
    expect(mockNav).toHaveBeenCalledWith("product?url=amazon.in%2FESR-Paper-Feel-Compatible-Generation-Application%2Fdp%2FB0B87PN2TZ");
  })
});

describe ('SearchPage: Header', () => {
  it('contains link to About Page', () => {
    renderSearchPage();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  })
  it('contains link to Recents Page', () => {
    renderSearchPage();
    expect(screen.getByText(/recent/i)).toBeInTheDocument();
  })
});
