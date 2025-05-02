export function GitActivityLegend() {
  return (
    <div className="w-full flex items-center justify-end space-x-1 px-4 py-2">
      <p className="text-sm opacity-50">Less</p>
      <div className="flex">
        <div
          className={`w-2.5 h-2.5 m-0.5 p-3 rounded-md opacity-60 group-hover:opacity-100 transition-all border-[0.5px] border-black/15 dark:border-white/10 bg-github-act-none dark:bg-github-act-none-dark`}
        />
        <div
          className={`w-2.5 h-2.5 m-0.5 p-3 rounded-md opacity-60 group-hover:opacity-100 transition-all border-[0.5px] border-black/15 dark:border-white/10 bg-github-act-some dark:bg-github-act-some-dark`}
        />
        <div
          className={`w-2.5 h-2.5 m-0.5 p-3 rounded-md opacity-60 group-hover:opacity-100 transition-all border-[0.5px] border-black/15 dark:border-white/10 bg-github-act-medium dark:bg-github-act-medium-dark`}
        />
        <div
          className={`w-2.5 h-2.5 m-0.5 p-3 rounded-md opacity-60 group-hover:opacity-100 transition-all border-[0.5px] border-black/15 dark:border-white/10 bg-github-act-lot dark:bg-github-act-lot-dark`}
        />
        <div
          className={`w-2.5 h-2.5 m-0.5 p-3 rounded-md opacity-60 group-hover:opacity-100 transition-all border-[0.5px] border-black/15 dark:border-white/10 bg-github-act-most dark:bg-github-act-most-dark`}
        />
      </div>
      <p className="text-sm opacity-50">More</p>
    </div>
  );
}
