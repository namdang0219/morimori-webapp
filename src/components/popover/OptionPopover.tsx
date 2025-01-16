import { Popover } from "antd";
import React, { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useOnClickOutside } from "usehooks-ts";

interface IContent {
	label: string;
	onClick: () => void;
	icon: React.ReactNode;
}

const OptionPopover = ({
	contents,
	iconClassName = "",
}: {
	contents: IContent[];
	iconClassName?: string;
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const ref = useRef(null);

	const handleClickOutside = () => {
		if (visible) setVisible(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	const content = (
		<div className="w-44" ref={ref}>
			{contents.length > 0 &&
				contents.map((c: IContent, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-1"
						onClick={() => {
							c.onClick();
							setVisible(false);
						}}
					>
						<p className="text-base">{c.label}</p>
						{c.icon}
					</div>
				))}
		</div>
	);

	return (
		<Popover
			content={content}
			open={visible}
			placement="bottomRight"
			trigger="click"
		>
			<span>
				<BsThreeDots
					size={22}
					onClick={() => setVisible(true)}
					className={iconClassName}
				/>
			</span>
		</Popover>
	);
};

export default OptionPopover;
