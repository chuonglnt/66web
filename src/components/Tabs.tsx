import React, { useState } from "react";

interface Tab {
  key: string;
  title: string;
  content: JSX.Element;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="w-full">
      <div className="flex items-center font-medium text-3xl my-4 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`items-center ${activeTab === tab.key} ? "active" : ""`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="items-center flex justify-center">
        {tabs.map((tab) => {
          if (tab.key === activeTab) {
            return <div key={tab.key}>{tab.content}</div>;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Tabs;
