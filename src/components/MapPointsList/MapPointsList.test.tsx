import { render, screen, fireEvent } from '@testing-library/react';
import {describe, test, expect} from 'vitest';
import { MapPointsList } from "./MapPointsList";
import { MapPointType } from '../../utils/dataForMap';
import { mock } from 'strong-mock';

describe('MapPointsList', () => {
  test('should render and show the name', () => {

    const stubMapPoint = {
      name: 'Name', 
      location: {
          lat: 2,
          lng: 1
      }
        ,
    };

    const onClickHandlerMock = mock<(mapPoint: MapPointType) => void>();

    render(
      <MapPointsList list={[stubMapPoint]} onClickHandler={onClickHandlerMock}/>
    );
    expect(screen.queryByText('Name')).toBeDefined();
    expect(screen.getByText('Check our locations:')).toBeDefined();
    expect(screen.findByTestId('drag-indicator')).toBeDefined();
  });

  test('handle on click mobile', async () => {

    const stubMapPoint = {
      name: 'Name', 
      location: {
          lat: 2,
          lng: 1
      }
        ,
    };

    const onClickHandlerMock = mock<(mapPoint: MapPointType) => void>();

    render(
      <MapPointsList list={[stubMapPoint]} onClickHandler={onClickHandlerMock}/>
    );
    expect(screen.findByTestId('close')).toBeDefined();
    expect(screen.getByRole('close')).toBeDefined();

    // hide map points list
    fireEvent.click(screen.getByRole('close'))
    await expect(screen.getByRole('close', { hidden: true } )).toBeDefined();
    await expect((screen.getByRole('close')).classList).toContain("undisplayed");
    await expect(screen.getByRole('open')).toBeDefined();
    await expect((screen.getByRole('open')).classList).not.toContain("undisplayed");
    await expect((screen.getByRole('map-points-list')).classList).toContain("unvisible");

      // show map points list
    fireEvent.click(screen.getByRole('open'))
    await  expect(screen.getByRole('open', { hidden: true } )).toBeDefined();
    await expect((screen.getByRole('open')).classList).toContain("undisplayed");
    await expect(screen.getByRole('close')).toBeDefined();
    await expect((screen.getByRole('close')).classList).not.toContain("undisplayed");
    await expect((screen.getByRole('map-points-list')).classList).not.toContain("unvisible");
  })

  test('handle on click desktop', async () => {

    const stubMapPoint = {
      name: 'Name', 
      location: {
          lat: 2,
          lng: 1
      }
        ,
    };

    const onClickHandlerMock = mock<(mapPoint: MapPointType) => void>();

    render(
      <MapPointsList list={[stubMapPoint]} onClickHandler={onClickHandlerMock}/>
    );
    expect(screen.findByTestId('close')).toBeDefined();
    expect(screen.getByRole('close')).toBeDefined();

    // hide map points list
    fireEvent.click(screen.getByRole('carret-down'))
    await expect(screen.getByRole('carret-down', { hidden: true } )).toBeDefined();
    await expect((screen.getByRole('carret-down')).classList).toContain("undisplayed");
    await expect(screen.getByRole('carret-up')).toBeDefined();
    await expect((screen.getByRole('carret-up')).classList).not.toContain("undisplayed");
    await expect((screen.getByRole('map-points-list')).classList).toContain("unvisible");

      // show map points list
    fireEvent.click(screen.getByRole('carret-up'))
    await  expect(screen.getByRole('carret-up', { hidden: true } )).toBeDefined();
    await expect((screen.getByRole('carret-up')).classList).toContain("undisplayed");
    await expect(screen.getByRole('carret-down')).toBeDefined();
    await expect((screen.getByRole('carret-down')).classList).not.toContain("undisplayed");
    await expect((screen.getByRole('map-points-list')).classList).not.toContain("unvisible");
  })
});