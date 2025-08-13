import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { ChevronRight, Loader2 } from "lucide-react";

export default function Tasks({ searchQuery = "" }) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollRef = useRef(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      setShowScrollIndicator(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const tasks = [
    {
      id: 1,
      title: "User Research",
      description:
        "Conduct a user research by conducting online survey and draft out questionnaires.",
      status: "In Progress",
      date: "Monday",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 2,
      title: "Design System",
      description:
        "Conduct a user research by conducting online survey and draft out questionnaires.",
      status: "In Progress",
      date: "Monday",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 3,
      title: "Real Estate Landing Page",
      description:
        "Assist to leverage on our efforts in making the user research possible and ensure the design solution for the real estate project.",
      status: "Completed",
      date: "31/04/22",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 4,
      title: "Real Estate Landing Page",
      description:
        "Assist to leverage on our efforts in making the user research possible and ensure the design solution for the real estate project.",
      status: "Completed",
      date: "31/04/22",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 5,
      title: "Real Estate Landing Page",
      description:
        "Assist to leverage on our efforts in making the user research possible and ensure the design solution for the real estate project.",
      status: "Completed",
      date: "31/04/22",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 6,
      title: "Real Estate Landing Page",
      description:
        "Assist to leverage on our efforts in making the user research possible and ensure the design solution for the real estate project.",
      status: "Completed",
      date: "31/04/22",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
  ];

  const inProgressTasks = [
    {
      id: 7,
      title: "UI/UX Design",
      description:
        "Create wireframes and mockups for the new dashboard interface",
      status: "In Progress",
      date: "Tuesday",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 8,
      title: "Frontend Development",
      description: "Implement responsive design components using React",
      status: "In Progress",
      date: "Wednesday",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
  ];

  const completedTasks = [
    {
      id: 9,
      title: "Project Setup",
      description:
        "Initialize project repository and set up development environment",
      status: "Completed",
      date: "15/04/22",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
    {
      id: 10,
      title: "API Integration",
      description:
        "Connect frontend with backend APIs and implement error handling",
      status: "Completed",
      date: "20/04/22",
      avatars: [
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
        "/placeholder.svg?height=24&width=24",
      ],
    },
  ];

  const filterList = useCallbackFilter();

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return {
        tasks,
        inProgressTasks,
        completedTasks,
      };
    }
    return {
      tasks: filterList(tasks, q),
      inProgressTasks: filterList(inProgressTasks, q),
      completedTasks: filterList(completedTasks, q),
    };
  }, [searchQuery]);

  const TaskCard = ({ task }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 w-[280px] lg:w-[300px] xl:w-[320px] min-h-[342px] max-sm:min-h-[280px] flex-shrink-0 relative">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className={`w-2 h-2 rounded-full flex-shrink-0 ${task.status === "Completed" ? "bg-green-500" : "bg-orange-500"
              }`}
          />
          <span className="font-medium truncate">{task.title}</span>
        </div>
        <button className="p-1 hover:bg-zinc-800 rounded flex-shrink-0 ml-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      <p className="text-sm text-gray-400 mb-3 line-clamp-3">
        {task.description}
      </p>

      <div className="flex justify-between items-center bottom-4 absolute w-full pr-8 overflow-hidden">
        <div className="flex -space-x-2">
          {task.avatars.map((avatar, index) => (
            <div
              key={index}
              className="h-6 w-6 rounded-full border-2 border-zinc-900 overflow-hidden"
            >
              <img
                src={avatar || "/placeholder.svg"}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500">
          <span>{task.date}</span>
        </div>
      </div>
    </div>
  );

  const TaskSection = ({ title, tasks, badgeCount }) => (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="bg-zinc-700 text-white px-2 py-1 rounded-full text-sm">
          {badgeCount}
        </span>
      </div>

      <div className="relative w-full">
        <div
          className="overflow-x-auto pb-4 scrollbar-hide"
          ref={scrollRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-4 w-max min-w-full">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {tasks.length === 0 && (
              <div className="text-sm text-gray-400 py-6">No tasks match your search</div>
            )}
          </div>
        </div>
        {showScrollIndicator && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-zinc-900 to-transparent w-12 h-full flex items-center justify-end pr-2 pointer-events-none">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-zinc-600" />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col">
      <div className="flex-1 flex flex-col gap-6 w-full">
        <TaskSection
          title="Today's Tasks"
          tasks={filtered.tasks}
          badgeCount={filtered.tasks.length}
        />

        <TaskSection
          title="In Progress"
          tasks={filtered.inProgressTasks}
          badgeCount={filtered.inProgressTasks.length}
        />

        <TaskSection
          title="Completed"
          tasks={filtered.completedTasks}
          badgeCount={filtered.completedTasks.length}
        />
      </div>
    </div>
  );
}

function useCallbackFilter() {
  return useMemo(() => {
    return (list, q) =>
      list.filter((t) => {
        const title = t.title?.toLowerCase() || "";
        const description = t.description?.toLowerCase() || "";
        const status = t.status?.toLowerCase() || "";
        const date = t.date?.toLowerCase() || "";
        return (
          title.includes(q) ||
          description.includes(q) ||
          status.includes(q) ||
          date.includes(q)
        );
      });
  }, []);
}
