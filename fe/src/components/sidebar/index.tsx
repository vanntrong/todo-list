import { CalendarOutlined, ContainerOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";

const menu = [
  {
    title: "Today",
    icon: <CalendarOutlined style={{ color: "green" }} />,
    link: "/",
  },
  {
    title: "Upcoming",
    icon: <ContainerOutlined style={{ color: "purple" }} />,
    link: "/upcoming",
  },
];

interface ISidebarProps {
  isOpen: boolean;
}

const Sidebar: FC<ISidebarProps> = ({ isOpen }) => {
  const router = useRouter();

  return (
    <div
      className={clsx(
        "w-[350px] bg-[#FAFAFA] pt-8 px-3 relative transition-all top-0 overflow-hidden",
        {
          "left-[-500px] w-0": !isOpen,
          "left-0": isOpen,
        }
      )}
    >
      <ul className="flex flex-col">
        {menu.map((item, index) => (
          <li key={index}>
            <Link href={item.link}>
              <div
                className={clsx(
                  "flex items-center gap-x-2 p-2 rounded-lg hover:bg-[#EEEEEE]",
                  {
                    "bg-[#EEEEEE]": router.pathname == item.link,
                  }
                )}
              >
                {item.icon}
                <span className="text-sm">{item.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
