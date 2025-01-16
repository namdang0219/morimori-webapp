import React, { useRef, useState } from "react";
import Moveable from "react-moveable";
import { ISticker } from "../../module/album/imageEditor/ImageEditor";
import { useOnClickOutside } from "usehooks-ts";

const DraggableSticker = ({ sticker }: { sticker: ISticker }) => {
	const targetRef = React.useRef<HTMLDivElement>(null);
	const [draggable, setDraggable] = useState<boolean>(true);
	const divRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = () => {
		setDraggable(false);
		// Your custom logic here
		console.log("clicked outside");
	};

	const handleClickInside = () => {
		setDraggable(true);
		// Your custom logic here
		console.log("clicked inside");
	};

	useOnClickOutside(divRef, handleClickOutside);

	return (
		<div ref={divRef} onClick={handleClickInside}>
			<div className="absolute">
				<div
					className="relative text-white target w-36 aspect-square"
					ref={targetRef}
					style={{
						transform:
							"translate(0px, 0px) rotate(0deg) scale(1, 1)",
					}}
				>
					<img
						src="https://i.pinimg.com/736x/c5/c5/a7/c5c5a7b5ba605c8f5ef2ceb0ebc4d16e.jpg"
						alt=""
						className="object-contain object-center w-full h-full"
					/>
				</div>
			</div>
			{draggable && (
				<Moveable
					target={targetRef}
					draggable={true}
					throttleDrag={1}
					edgeDraggable={false}
					startDragRotate={0}
					throttleDragRotate={0}
					scalable={true}
					keepRatio={true}
					throttleScale={0}
					renderDirections={[
						"nw",
						"n",
						"ne",
						"w",
						"e",
						"sw",
						"s",
						"se",
					]}
					rotatable={true}
					throttleRotate={0}
					// rotationPosition={"top"}
					// originDraggable={true}
					// originRelative={true}
					onDragOrigin={(e) => {
						e.target.style.transformOrigin = e.transformOrigin;
					}}
					onRender={(e) => {
						e.target.style.transform = e.transform;
					}}
				/>
			)}
		</div>
	);
};

export default DraggableSticker;
