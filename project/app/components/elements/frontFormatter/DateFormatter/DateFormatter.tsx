export default function DateFormatter({
	date,
	fallback = "",
}: { date: string | Date | null; fallback?: string }) {
	if (!date) {
		return <>{fallback}</>;
	}
	const dateConstructor = new Date(date);
	const year = dateConstructor.getFullYear();
	const month = `0${dateConstructor.getMonth() + 1}`.slice(-2);
	const dayDate = `0${dateConstructor.getDate()}`.slice(-2);
	const hour = `0${dateConstructor.getHours()}`.slice(-2);
	const minutes = `0${dateConstructor.getMinutes()}`.slice(-2);
	const seconds = `0${dateConstructor.getSeconds()}`.slice(-2);

	return (
		<time
			dateTime={`${year}-${month}-${dayDate}T${hour}:${minutes}:${seconds}`}
		>{`${year}/${month}/${dayDate} ${hour}:${minutes}:${seconds}`}</time>
	);
}
