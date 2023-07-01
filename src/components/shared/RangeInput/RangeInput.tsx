import { useDebounce } from 'hooks/useDebounce'
import { memo, useEffect, useState } from 'react'
import { Range, getTrackBackground } from 'react-range'
import styles from './RangeInput.styles.module.scss'

interface RangeComponentProps {
  handleRange: (values: number[]) => void
  title: string
  step: number
  max: number
  min: number
  showMiles?: boolean
}

export const RangeInput: React.FC<RangeComponentProps> = memo(
  ({ title, step, min, max, handleRange, showMiles }) => {
    const [values, setValues] = useState([min, max])

    const handleWithDebounce = useDebounce(() => {
      handleRange(values)
    }, 300)

    const handleChange = (values: number[]) => {
      setValues(values)
    }

    useEffect(() => {
      handleWithDebounce(values)
    }, [values])

    return (
      <div className={styles['range']}>
        <label>{title}</label>
        <Range
          step={step}
          min={min}
          max={max}
          values={values}
          onChange={(values) => handleChange(values)}
          renderMark={({ props, index }) => (
            <div
              {...props}
              style={{
                ...props.style,
                bottom: '13px',
                height: '8px',
                width: showMiles ? '3px' : '1px',
                backgroundColor:
                  index * step < values[1] && index * step > values[0]
                    ? '#abe96e'
                    : '#ccc',
              }}
            />
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '6px',
                backgroundColor: '#ffffff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                outline: 'none',
                border: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: '-28px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                  padding: '4px',
                  borderRadius: '4px',
                  backgroundColor: '#3a3a3a',
                }}
              >
                {values[index]}
              </div>
            </div>
          )}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '3px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values,
                    colors: ['#ccc', '#abe96e', '#ccc'],
                    min: min,
                    max: max,
                  }),
                  alignSelf: 'center',
                }}
              >
                {children}
              </div>
            </div>
          )}
        />
      </div>
    )
  },
)
