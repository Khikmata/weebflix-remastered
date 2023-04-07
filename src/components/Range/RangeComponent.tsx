import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { useDispatch } from 'react-redux';
import { SearchFilterActions } from '../../store/reducers/SearchFilterSlice';



interface RangeComponentProps {
	step: number;
	max: number;
	min: number;
}


export const RangeComponent: React.FC<RangeComponentProps> = ({ step, min, max }) => {

	const [values, setValues] = useState([min, max])

	const dispatch = useDispatch();

	const handleScoreRange = (values: number[]) => {
		dispatch(SearchFilterActions.setMinScore(values[0]));
		dispatch(SearchFilterActions.setMaxScore(values[1]));
		setValues(values);
	}

	return (
		<>
			<p>Сортировка по рейтингу</p>
			<Range
				step={1}
				min={0}
				max={10}
				values={values}
				onChange={(values) => handleScoreRange(values)}
				renderMark={({ props, index }) => (
					<div
						{...props}
						style={{
							...props.style,
							height: '15px',
							width: '3px',
							backgroundColor: index * 1 < values[1] && index * 1 > values[0] ? '#abe96e' : '#ccc'
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
								top: '-28px',
								color: '#fff',
								fontWeight: 'bold',
								fontSize: '14px',
								fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
								padding: '4px',
								borderRadius: '4px',
								backgroundColor: '#28646c'
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
							width: '100%'
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
									min: 0,
									max: 10,
								}),
								alignSelf: 'center'
							}}
						>

							{children}
						</div>
					</div>
				)}
			/>
		</>
	)
}
