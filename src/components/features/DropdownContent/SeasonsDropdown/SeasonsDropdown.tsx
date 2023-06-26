import { memo, useCallback, useMemo } from 'react'

import styles from '../DropdownContentShared.styles.module.scss'

import { ISeasons } from '@store/types/FetchTypes'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { seasonFilterActions } from 'store/reducers/Filters'

export const SeasonsDropdown = memo(() => {
  const dispatch = useAppDispatch()

  const activeYear = useAppSelector(
    (state) => state.filterReducer.seasonFilters.year,
  )
  const activeSeason = useAppSelector(
    (state) => state.filterReducer.seasonFilters.season,
  )

  const seasonsData = useAppSelector((state) => state.dropdownData.seasonsData)

  const handleSeasonChange = useCallback(
    (year: string, season: string) => {
      if (year === activeYear && season === activeSeason) {
        dispatch(
          seasonFilterActions.removeSeasonData({ year: year, season: season }),
        )
      } else {
        dispatch(
          seasonFilterActions.setSeasonData({ year: year, season: season }),
        )
      }
    },
    [activeSeason, activeYear, dispatch],
  )

  return useMemo(() => {
    return (
      <>
        {seasonsData &&
          seasonsData.map((yearSeason: ISeasons) => (
            <div key={yearSeason.year} className={styles['container']}>
              <p
                className={
                  styles[yearSeason.year === activeYear ? 'active' : '']
                }
              >
                {yearSeason.year}
              </p>
              {yearSeason.seasons.map((season: string) => (
                <li
                  key={yearSeason.year + season}
                  className={
                    styles[
                      yearSeason.year === activeYear && season === activeSeason
                        ? 'active'
                        : ''
                    ]
                  }
                  onClick={() => handleSeasonChange(yearSeason.year, season)}
                >
                  {season}
                </li>
              ))}
            </div>
          ))}
      </>
    )
  }, [activeSeason, activeYear, handleSeasonChange, seasonsData])
})
