import { render } from '@testing-library/react'
import { describe, test } from 'vitest'
import createReactMock from 'react-mock-component'
import { MapPointsListType } from '../MapPointsList/MapPointsList'
import { MyMapType } from '../Map/Map'
import { mock } from 'strong-mock'
import { MapPointType } from '../../utils/dataForMap'

describe('AppContent', () => {
  const MapPointsList = createReactMock<MapPointsListType>()
  const MyMap = createReactMock<MyMapType>()
  const onClickHandlerMock = mock<(mapPoint: MapPointType) => void>()

  const stubMapPoint = {
    name: 'Name',
    location: {
      lat: 2,
      lng: 1,
    },
  }
  test('should render', () => {
    render(
      <div>
        <MapPointsList
          list={[stubMapPoint]}
          onClickHandler={onClickHandlerMock}
        />
        <MyMap
          apikey={'222'}
          userPosition={stubMapPoint.location}
          mapPointPosition={stubMapPoint}
          mapPointsList={[stubMapPoint]}
          coordinatesList={[stubMapPoint.location]}
        />
      </div>
    )
  })
})
