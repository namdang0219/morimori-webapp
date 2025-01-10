import React from "react";
import MainLayout from "../../../components/layout/MainLayout";
import Header from "../../../components/layout/Header";
import OptionPopover from "../../../components/popover/OptionPopover";
import { IoMdCheckboxOutline } from "react-icons/io";

const NotificationPage = () => {
	return (
		<MainLayout>
			<Header largeTitle="Notification" rightContainer={<>
                    <OptionPopover contents={[{
                        label: "Mark All Readed",
                        onClick: () => null,
                        icon: <IoMdCheckboxOutline size={24} />
                    }]} />
                </>}/>
		</MainLayout>
	);
};

export default NotificationPage;
