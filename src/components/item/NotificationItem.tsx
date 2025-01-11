import React from "react";
import { INotification } from "../../util/types/INotification";
import { findUserFromUid } from "../../util/func/findUserFromUid";

const NotificationItem = ({ item }: { item: INotification }) => {
	const renderNotificationContent = (item: INotification) => {
		switch (item.type) {
			case "NEW_POST":
				return `${
					findUserFromUid(item.noticeUser)?.displayName
				} さんが新しく投稿しました。すぐチェックして一緒に楽しみましょう！`;
			case "MENTION":
				return `${
					findUserFromUid(item.noticeUser)?.displayName
				} さんからメンションされました。さっそく確認に行きましょう！`;
			default:
				return null;
		}
	};

	return (
		<div className="flex gap-3 py-2 px-main-padding">
			<div className="w-[68px] h-[68px] rounded-full shrink-0 overflow-hidden mt-2">
				<img
					src={findUserFromUid(item.noticeUser)?.photoURL}
					alt="user-avatar"
					className="object-cover object-center w-full h-full"
				/>
			</div>
			<div className="flex flex-col flex-1 gap-0.5">
				<div className="flex items-center gap-2">
					<p className="font-medium">
						{findUserFromUid(item.noticeUser)?.displayName}
					</p>
					<div className="w-2 rounded-full aspect-square bg-violet-600" />
				</div>
				<div>
					<p className="text-sm text-gray-500">
						{renderNotificationContent(item)}
					</p>
					<span className="text-xs text-gray-600">
						{new Date(item.timestamp).toLocaleString()}
					</span>
				</div>
			</div>
		</div>
	);
};

export default NotificationItem;
