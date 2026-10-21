import type { ComponentType } from "react";

type Stat = {
  value: string;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  iconClassName: string;
};

const stats: Stat[] = [
  {
    value: "12,400+",
    label: "Submissions Verified",
    description:
      "Fully automated code audit & runtime deployment validation.",
    icon: ClipboardCheckIcon,
    iconClassName: "bg-indigo-100 text-indigo-700",
  },
  {
    value: "< 24 Hours",
    label: "Turnaround SLA",
    description: "98.2% of submissions graded and returned well within cohort limits.",
    icon: ClockIcon,
    iconClassName: "bg-purple-200 text-purple-700",
  },
  {
    value: "99.4%",
    label: "Pre-Flight Accuracy",
    description:
      "Catches broken builds and unlinked environments before mentor review.",
    icon: MonitorCheckIcon,
    iconClassName: "bg-blue-100 text-indigo-700",
  },
  {
    value: "450+",
    label: "Academic Cohorts",
    description:
      "Empowering computer science labs, bootcamps, and fellowships globally.",
    icon: AcademicCapIcon,
    iconClassName: "bg-indigo-100 text-slate-600",
  },
];

export function Stats() {
  return (
    <section
      id="metrics"
      aria-labelledby="stats-heading"
      className="w-full bg-blue-50 py-16"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:px-10">
        <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
          <h2
            id="stats-heading"
            className="text-balance font-serif text-2xl font-bold leading-8 text-slate-900 sm:text-3xl sm:leading-10"
          >
            Proven scale across top technical academies
          </h2>
          <p className="text-pretty text-sm font-normal leading-5 text-gray-700">
            Real performance metrics recorded across university programs,
            accelerator cohorts, and coding bootcamps.
          </p>
        </div>

        <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <li
                key={stat.label}
                className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm"
              >
                <span
                  className={`mb-6 flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconClassName}`}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>

                <p className="text-3xl font-bold leading-10 text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium leading-5 text-slate-900">
                  {stat.label}
                </p>
                <p className="mt-1 text-pretty text-xs font-normal leading-4 text-gray-700">
                  {stat.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ClipboardCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.96667 13.7958L13.4292 7.33333L12.1458 6.05L6.96667 11.2292L4.35417 8.61667L3.07083 9.9L6.96667 13.7958V13.7958M1.83333 18.3333C1.32917 18.3333 0.897569 18.1538 0.538542 17.7948C0.179514 17.4358 0 17.0042 0 16.5V3.66667C0 3.1625 0.179514 2.7309 0.538542 2.37188C0.897569 2.01285 1.32917 1.83333 1.83333 1.83333H5.68333C5.88194 1.28333 6.21424 0.840278 6.68021 0.504167C7.14618 0.168056 7.66944 0 8.25 0C8.83056 0 9.35382 0.168056 9.81979 0.504167C10.2858 0.840278 10.6181 1.28333 10.8167 1.83333H14.6667C15.1708 1.83333 15.6024 2.01285 15.9615 2.37188C16.3205 2.7309 16.5 3.1625 16.5 3.66667V16.5C16.5 17.0042 16.3205 17.4358 15.9615 17.7948C15.6024 18.1538 15.1708 18.3333 14.6667 18.3333H1.83333V18.3333M1.83333 16.5H14.6667V3.66667H1.83333V16.5V16.5V16.5V16.5M8.25 2.97917C8.44861 2.97917 8.61285 2.91424 8.74271 2.78437C8.87257 2.65451 8.9375 2.49028 8.9375 2.29167C8.9375 2.09306 8.87257 1.92882 8.74271 1.79896C8.61285 1.6691 8.44861 1.60417 8.25 1.60417C8.05139 1.60417 7.88715 1.6691 7.75729 1.79896C7.62743 1.92882 7.5625 2.09306 7.5625 2.29167C7.5625 2.49028 7.62743 2.65451 7.75729 2.78437C7.88715 2.91424 8.05139 2.97917 8.25 2.97917V2.97917"
        fill="currentColor"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 19 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7.74583 10.5417C8.1125 10.9083 8.58611 11.0878 9.16667 11.0802C9.74722 11.0726 10.175 10.8625 10.45 10.45L15.5833 2.75L7.88333 7.88333C7.47083 8.15833 7.25313 8.57847 7.23021 9.14375C7.20729 9.70903 7.37917 10.175 7.74583 10.5417V10.5417M9.16667 0C10.0681 0 10.9351 0.126042 11.7677 0.378125C12.6003 0.630208 13.3833 1.00833 14.1167 1.5125L12.375 2.6125C11.8708 2.35278 11.3476 2.15799 10.8052 2.02813C10.2628 1.89826 9.71667 1.83333 9.16667 1.83333C7.13472 1.83333 5.40451 2.54757 3.97604 3.97604C2.54757 5.40451 1.83333 7.13472 1.83333 9.16667C1.83333 9.80833 1.92118 10.4424 2.09687 11.0688C2.27257 11.6951 2.52083 12.2833 2.84167 12.8333H15.4917C15.8431 12.2528 16.099 11.6493 16.2594 11.0229C16.4198 10.3965 16.5 9.74722 16.5 9.075C16.5 8.525 16.4351 7.99028 16.3052 7.47083C16.1753 6.95139 15.9806 6.44722 15.7208 5.95833L16.8208 4.21667C17.2792 4.93472 17.642 5.69861 17.9094 6.50833C18.1767 7.31806 18.3181 8.15833 18.3333 9.02917C18.3486 9.9 18.2493 10.7326 18.0354 11.5271C17.8215 12.3215 17.5083 13.0778 17.0958 13.7958C16.9278 14.0708 16.6986 14.2847 16.4083 14.4375C16.1181 14.5903 15.8125 14.6667 15.4917 14.6667H2.84167C2.52083 14.6667 2.21528 14.5903 1.925 14.4375C1.63472 14.2847 1.40556 14.0708 1.2375 13.7958C0.840278 13.1083 0.534722 12.3788 0.320833 11.6073C0.106944 10.8358 0 10.0222 0 9.16667C0 7.89861 0.240625 6.71076 0.721875 5.60313C1.20312 4.49549 1.86007 3.52535 2.69271 2.69271C3.52535 1.86007 4.49931 1.20312 5.61458 0.721875C6.72986 0.240625 7.91389 0 9.16667 0V0"
        fill="currentColor"
      />
    </svg>
  );
}

function MonitorCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 12.8333V3.66667H9.16667V12.8333H0V12.8333M1.83333 11H7.33333V5.5H1.83333V11V11M0 1.83333V0H16.5V1.83333H0V1.83333M11 5.5V3.66667H16.5V5.5H11V5.5M11 9.16667V7.33333H16.5V9.16667H11V9.16667M11 12.8333V11H16.5V12.8333H11V12.8333M0 16.5V14.6667H16.5V16.5H0V16.5M4.58333 8.25V8.25V8.25V8.25V8.25V8.25"
        fill="currentColor"
      />
    </svg>
  );
}

function AcademicCapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 21 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10.0833 16.5L3.66667 13.0167V7.51667L0 5.5L10.0833 0L20.1667 5.5V12.8333H18.3333V6.50833L16.5 7.51667V13.0167L10.0833 16.5V16.5M10.0833 8.89167L16.3625 5.5L10.0833 2.10833L3.80417 5.5L10.0833 8.89167V8.89167M10.0833 14.4146L14.6667 11.9396V8.47917L10.0833 11L5.5 8.47917V11.9396L10.0833 14.4146V14.4146M10.0833 8.89167V8.89167V8.89167V8.89167V8.89167V8.89167"
        fill="currentColor"
      />
    </svg>
  );
}
