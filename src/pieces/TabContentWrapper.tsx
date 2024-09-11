import React from "react";

interface TabContentWrapperProps {
    children: React.ReactNode;
}

const TabContentWrapper: React.FC<TabContentWrapperProps> = ({ children }) => {
    return (
        <div className="flex-grow overflow-hidden flex flex-col items-center justify-start w-full">
            {children}
        </div>
    );
};

export default TabContentWrapper;
