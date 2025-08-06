"use client";

import React, { useState } from "react";
import WorldClock from "../sections/WorldClock";
import Calendar from "../sections/Calendar";
import Tasks from "../sections/Tasks";
import DashboardHeader from "../headers/DashboardHeader";
import DashboardSection from "../sections/DashboardSection";
import TaskProgress from "../sections/TaskProgress";
import Options from "../sections/Options";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white w-full overflow-x-hidden">
            <Options />

      <DashboardHeader />

      {/* Main Content */}
      <div className="w-full mx-auto py-4 mb-4 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="w-full h-full overflow-y-auto lg:w-1/3">
            <WorldClock />
          </div>
          <div className="w-full h-full overflow-y-auto lg:w-1/3">
            <Calendar />
          </div>
          <div className="w-full h-full overflow-y-auto lg:w-1/3">
            {/* <Tasks /> */}
            <TaskProgress />
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-hidden">
        <Tasks />
      </div>

      <div className="w-full overflow-x-hidden">
        <DashboardSection />
      </div>
    </div>
  );
};

export default Dashboard;
