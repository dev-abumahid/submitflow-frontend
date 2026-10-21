import type { ReactNode } from "react";

export type IconProps = { className?: string };

function BaseIcon({
  className,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </BaseIcon>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </BaseIcon>
  );
}

export function FileUpIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6" />
      <path d="m9 15 3-3 3 3" />
    </BaseIcon>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </BaseIcon>
  );
}

export function ClipboardCheckIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <rect x="5" y="4" width="14" height="18" rx="2" />
      <path d="M9 4V2h6v2" />
      <path d="m9 13 2 2 4-4" />
    </BaseIcon>
  );
}

export function LogOutIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </BaseIcon>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m9 18 6-6-6-6" />
    </BaseIcon>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </BaseIcon>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </BaseIcon>
  );
}

export function BellIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </BaseIcon>
  );
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </BaseIcon>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
      <path d="M3 21v-5h5" />
      <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
      <path d="M21 3v5h-5" />
    </BaseIcon>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </BaseIcon>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </BaseIcon>
  );
}

export function CodeIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m8 7-5 5 5 5" />
      <path d="m16 7 5 5-5 5" />
    </BaseIcon>
  );
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </BaseIcon>
  );
}

export function GraduationCapIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5" />
      <path d="M22 9v6" />
    </BaseIcon>
  );
}

export function HourglassIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M6 2h12M6 22h12" />
      <path d="M7 2v4a5 5 0 0 0 5 5 5 5 0 0 0 5-5V2" />
      <path d="M7 22v-4a5 5 0 0 1 5-5 5 5 0 0 1 5 5v4" />
    </BaseIcon>
  );
}

export function ActivityIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.3M8.2 13.2l7.6 4.3" />
    </BaseIcon>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m5 12 4 4L19 6" />
    </BaseIcon>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m14.5 4.5 5 5" />
      <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="M13 6.5 17.5 11" />
    </BaseIcon>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </BaseIcon>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </BaseIcon>
  );
}

export function FileTextIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
    </BaseIcon>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </BaseIcon>
  );
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 20h16" />
    </BaseIcon>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M12 5v14M5 12h14" />
    </BaseIcon>
  );
}

export function CommitIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M3 12h5.5M15.5 12H21" />
    </BaseIcon>
  );
}

export function CloudIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M7 18h10a4 4 0 0 0 .4-8 6 6 0 0 0-11.6 1.6A3.5 3.5 0 0 0 7 18Z" />
    </BaseIcon>
  );
}

export function ChartIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M4 20V10M10 20V4M16 20v-6M22 20H2" />
    </BaseIcon>
  );
}

export function DatabaseIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </BaseIcon>
  );
}

export function AlertTriangleIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </BaseIcon>
  );
}

export function MoreHorizontalIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </BaseIcon>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m6 9 6 6 6-6" />
    </BaseIcon>
  );
}

export function ArrowUpDownIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m8 4-4 4 4 4M4 8h16" />
      <path d="m16 20 4-4-4-4M20 16H4" />
    </BaseIcon>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </BaseIcon>
  );
}

export function FolderIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" />
    </BaseIcon>
  );
}

export function SlidersHorizontalIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </BaseIcon>
  );
}

export function XCircleIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </BaseIcon>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="m15 18-6-6 6-6" />
    </BaseIcon>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </BaseIcon>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 15v2" />
    </BaseIcon>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </BaseIcon>
  );
}

export function EyeOffIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M3 3l18 18" />
      <path d="M10.6 6.2A10.9 10.9 0 0 1 12 6c6.5 0 10 6 10 6a17.7 17.7 0 0 1-3.1 3.7" />
      <path d="M6.6 6.6C3.6 8.5 2 12 2 12s3.5 6 10 6a10.9 10.9 0 0 0 5.4-1.4" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </BaseIcon>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.59 2.29 6.64 5.47 7.72.4.08.55-.18.55-.4 0-.2-.01-.86-.01-1.56-2.22.49-2.69-1.08-2.69-1.08-.36-.94-.89-1.19-.89-1.19-.73-.51.06-.5.06-.5.8.06 1.22.84 1.22.84.72 1.25 1.88.89 2.34.68.07-.53.28-.89.51-1.09-1.78-.21-3.64-.91-3.64-4.02 0-.89.31-1.61.82-2.18-.08-.21-.36-1.03.08-2.15 0 0 .67-.22 2.2.84A7.4 7.4 0 0 1 8 3.91c.68 0 1.36.09 2 .28 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.94.08 2.15.51.57.82 1.29.82 2.18 0 3.12-1.86 3.81-3.65 4.01.29.25.54.75.54 1.51 0 1.09-.01 1.97-.01 2.24 0 .22.15.49.55.4A8.14 8.14 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" />
    </svg>
  );
}
