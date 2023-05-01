import { useMemo, useState } from 'react'

import styles from '../FilterDropdown.styles.module.scss'
import { seasonFilterActions } from '../../../../../store/reducers/Filters'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'
import { TranslateSeasonToRussian } from '../../../../../utils/Translation/TranslateRelease'

export const SeasonsDropdown = () => {
  const dispatch = useAppDispatch()

  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null)

  const seasonsData = useAppSelector((state) => state.dropDownData.seasonsData)

  const getSeasonsDropdown = useMemo(() => {
    const handleSeasonChange = (
      year: string,
      season: string,
      yearIndex: number,
      seasonIndex: number,
    ) => {
      if (yearIndex === selectedYear && seasonIndex === selectedSeason) {
        dispatch(seasonFilterActions.removeSeasonData({ year, season }))
        setSelectedYear(null)
        setSelectedSeason(null)
      } else {
        dispatch(seasonFilterActions.setSeasonData({ year, season }))
        setSelectedYear(yearIndex)
        setSelectedSeason(seasonIndex)
      }
    }
    return (
      seasonsData &&
      seasonsData.map((yearSeasons, yearIndex) => (
        <div key={yearIndex} className={styles['container']}>
          <p className={styles[yearIndex === selectedYear ? 'active' : '']}>{yearSeasons.year}</p>
          {yearSeasons.seasons.map((season, seasonIndex) => (
            <li
              key={seasonIndex}
              className={
                styles[yearIndex === selectedYear && seasonIndex === selectedSeason ? 'active' : '']
              }
              onClick={() =>
                handleSeasonChange(yearSeasons.year.toString(), season, yearIndex, seasonIndex)
              }
            >
              {TranslateSeasonToRussian(season)}
            </li>
          ))}
        </div>
      ))
    )
  }, [seasonsData, selectedSeason, selectedYear, dispatch])

  return <>{getSeasonsDropdown}</>
}
