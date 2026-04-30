import { Settings, Pencil } from "lucide-react";

export default function Profile() {
  return (
    <div className="w-full">
      <div className="relative mx-auto w-full max-w-2xl text-center transition">
        {/* Top Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
            aria-label="Profile settings"
          >
            <Settings size={18} />
          </button>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            aria-label="Edit profile"
          >
            <Pencil size={18} />
          </button>
        </div>

        {/* Avatar */}
        <div className="relative w-fit mx-auto">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="mx-auto h-28 w-28 rounded-full border-4 border-white object-cover shadow-xl ring-4 ring-teal-500/20 dark:border-slate-900"
          />
          <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"></span>
        </div>

        {/* Name */}
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          Naseem Khan
        </h2>

        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          Full Stack Developer
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="rounded-lg border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
            <p className="font-bold text-slate-950 dark:text-white">120</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Projects</p>
          </div>
          <div className="rounded-lg border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
            <p className="font-bold text-slate-950 dark:text-white">5K</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Clients</p>
          </div>
          <div className="rounded-lg border border-slate-200/70 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5">
            <p className="font-bold text-slate-950 dark:text-white">3+ yrs</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Experience</p>
          </div>
        </div>

        {/* Bio */}
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          Building premium web experiences with modern technologies like React,
          Node.js, and Tailwind CSS. Focused on performance, design, and user
          experience.
        </p>
      </div>
    </div>
  );
}
