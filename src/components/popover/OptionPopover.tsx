import { Popover } from "antd";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

interface IContent {
	label: string;
	onClick: () => void;
	icon: React.ReactNode;
}

const OptionPopover = ({ contents }: { contents: IContent[] }) => {
	const content = (
		<div className="w-48">
			{contents.length > 0 &&
				contents.map((c: IContent, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-2"
						onClick={c.onClick}
					>
						<p className="text-lg">{c.label}</p>
						{c.icon}
					</div>
				))}
		</div>
	);

	return (
		<Popover content={content} placement="bottomRight" trigger="click">
			<span>
				<BsThreeDots size={28} />
			</span>
		</Popover>
	);
};

export default OptionPopover;
