import { useState } from "react";
import '../../styles/tooltip.scss';
interface tooltipProps {
	delay: number;
	direction: string;
	content: React.ReactNode;
	children: React.ReactNode;
}

export const Tooltip: React.FC<tooltipProps> = (props) => {
	let timeout: NodeJS.Timeout;
	const [active, setActive] = useState(false);

	const showTip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, props.delay || 400);
	};

	const hideTip = () => {
		clearInterval(timeout);
		setActive(false);
	};

	return (
		<div
			className="Tooltip-Wrapper"
			// When to show the tooltip
			onMouseEnter={showTip}
			onMouseLeave={hideTip}
		>
			{props.children}
			{active && (
				<div className={`Tooltip-Tip ${props.direction || "top"}`}>
					{props.content}
				</div>
			)}
		</div>
	);
};
