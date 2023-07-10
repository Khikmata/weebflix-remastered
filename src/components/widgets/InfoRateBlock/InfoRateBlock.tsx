import { ReactComponent as DropdownIcon } from '@assets/icons/DropdownIcon.svg'
import { ReactComponent as StarIcon } from '@assets/icons/StarIcon.svg'
import { Dropdown } from '@components/shared/Dropdown/Dropdown'
import { IDetails } from '@store/types/FetchTypes'
import axios from 'axios'
import { useAppSelector } from 'hooks/redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import styles from './InfoRateBlock.styles.module.scss'

interface InfoRateBlockProps {
  details: IDetails | undefined
}

const rateOptions = [
  { value: '1', label: '1⭐' },
  { value: '2', label: '2⭐' },
  { value: '3', label: '3⭐' },
  { value: '4', label: '4⭐' },
  { value: '5', label: '5⭐' },
  { value: '6', label: '6⭐' },
  { value: '7', label: '7⭐' },
  { value: '8', label: '8⭐' },
  { value: '9', label: '9⭐' },
  { value: '10', label: '10⭐' },
]
const watchstateOptions = [
  { value: 'watching', label: 'Currently Watching' },
  { value: 'planned', label: 'Watched' },
  { value: 'dropped', label: 'Dropped' },
]

export const InfoRateBlock = ({ details }: InfoRateBlockProps) => {
  const { t } = useTranslation()

  const [rateDropdown, setRateDropdown] = useState(false)
  const [addlistDropdown, setAddlistDropdown] = useState(false)

  const user = useAppSelector((state) => state.auth.user)

  const handleSelectRate = async (rating: string) => {
    try {
      if (!user) {
        return
      }
      await axios.post('http://localhost:4001/star', {
        animeData: details,
        myRating: rating,
        userId: user._id,
      })
    } catch (error) {
      toast.error('You need to authorize to get a rate option', {
        position: 'bottom-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }

  return (
    <>
      <button
        onClick={() => setRateDropdown((state) => (state = !state))}
        className={styles['anime-info__rate']}
      >
        <p>{t('animepage_rate_button')}</p>
        <StarIcon />
        <Dropdown
          onSelect={handleSelectRate}
          open={rateDropdown}
          options={rateOptions}
          direction={'horizontal'}
        />
      </button>
      <button
        onClick={() => setAddlistDropdown((state) => (state = !state))}
        className={styles['anime-info__addlist']}
      >
        <p>{t('animepage_add_button')}</p>
        <DropdownIcon />
        {/* <Dropdown
          onSelect={handleSelectWatch}
          open={addlistDropdown}
          options={watchstateOptions}
        /> */}
      </button>
    </>
  )
}
