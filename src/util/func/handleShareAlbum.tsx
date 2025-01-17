export const handleShareAlbum = async (locationPathName: string) => {
	if (navigator.share) {
		const shareData = {
			title: "アルバムをシェアしよう！",
			text: "これをシェアしますか？",
			url: `https://morimori-webapp.vercel.app${locationPathName}`,
		};

		navigator
			.share(shareData)
			.then(() => console.log("完成！"))
			.catch((error) => console.error("エラーが発生しました", error));
	} else {
		console.log("シェア機能がサポートされていないブラウザー");
	}
};
