export const convertTimestampToMillis = (timestamp: {
	seconds: number;
	nanoseconds: number;
}) => {
	return timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
};
