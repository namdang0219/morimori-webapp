import React from "react";

const SectionTitle = ({
	children,
	className,
}: {
	children: string;
	className?: string;
}) => {
	return <h2 className={`text-xl font-medium ${className}`}>{children}</h2>;
};

export default SectionTitle;
