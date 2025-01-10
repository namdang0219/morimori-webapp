import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Header from "../../../components/layout/Header";
import OptionPopover from "../../../components/popover/OptionPopover";
import { IoMdCheckboxOutline } from "react-icons/io";
import { notificationMocks } from "../../../mock/notificationMocks";
import NotificationItem from "../../../components/item/NotificationItem";

const NotificationPage = () => {
	return (
		<MainLayout>
			<Header
				largeTitle="通知"
				rightContainer={
					<>
						<OptionPopover
							contents={[
								{
									label: "全てを既読にする",
									onClick: () => null,
									icon: <IoMdCheckboxOutline size={18} />,
								},
							]}
						/>
					</>
				}
			/>

			<div className="overflow-y-scroll h-svh pt-header-height">
				{[
					...notificationMocks,
					...notificationMocks,
					...notificationMocks,
				].map((item, index) => (
					<NotificationItem key={index} item={item} />
				))}
			</div>
		</MainLayout>
	);
};

export default NotificationPage;
