import { FieldValue } from "firebase/firestore";

export function handleTimestampToString(ts: FieldValue): string {
	// @ts-expect-error - cannot set type for data
	return new Date(ts.toDate()).toUTCString();
}
