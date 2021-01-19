import keys from './keys.js';

export function generateRandomCoordinates(maxBoundary) {
	return {
		x: Math.floor(Math.random() * maxBoundary),
		y: Math.floor(Math.random() * maxBoundary)
	};
}
export function calculateAngle(initX, initY, eX, eY) {
	let angle = Math.atan2(Math.round(eY - initY), Math.round(eX - initX));
	angle *= 180 / Math.PI;
	return Math.round(angle);
}

export function convertAngleToKey(angle) {
	if (angle >= -135 && angle < -45) return keys.ArrowUp;
	if (angle >= -45 && angle < 45) return keys.ArrowRight;
	if (angle >= 45 && angle < 135) return keys.ArrowDown;
	return keys.ArrowLeft;
}

export function checkIfEnoughSwipeDistance(eX, initX, eY, initY, minSwipeDistance) {
	return !(Math.abs(Math.round(eY - initY)) < minSwipeDistance && Math.abs(Math.round(eX - initX)) < minSwipeDistance);
}

export function checkIfArraysEqual(firstArray, secondArray) {
	if (!(firstArray || secondArray)) return false;
	return JSON.stringify(firstArray) === JSON.stringify(secondArray);
}

export function convertMillisToMinutesAndSeconds(millis) {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	if (!minutes) return `${seconds} seconds`;
	const minutesToShow = `${minutes === 1 ? `${minutes} minute` : `${minutes} minutes`}`;
	return `${minutesToShow} ${seconds} seconds`;
}