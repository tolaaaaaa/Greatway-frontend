type ActivityItem = {
  activity: string
  date: string
  time: string
}

type ActivityLogProps = {
  activityDetails: ActivityItem[]
}

export default function ActivityLog({ activityDetails }: ActivityLogProps) {
  return (
    <div className="flex flex-col w-full overflow-x-auto">
      {/* Header Row */}
      <div className="flex items-center justify-between px-3 sm:px-4 h-12 bg-[#292929] border border-[#525252] min-w-0">
        <p className="text-sm sm:text-base text-white">Activity Description</p>
        <p className="text-sm sm:text-base text-white shrink-0 text-left">Date & Time</p>
      </div>

      {/* Activity Rows */}
      <div className="flex flex-col">
        {activityDetails.map((activity, index) => (
          <div key={index} className="relative">
            <div className="flex items-start sm:items-center justify-between px-3 sm:px-4 py-4 sm:py-3 gap-3 sm:gap-15.25">
              <p className="text-sm sm:text-base text-foreground flex-1 leading-snug">
                {activity.activity}
              </p>
              <p className="text-xs sm:text-base text-muted sm:text-foreground text-right whitespace-nowrap shrink-0">
                {activity.date} | {activity.time}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 border-b border-black/9" />
          </div>
        ))}
      </div>
    </div>
  )
}