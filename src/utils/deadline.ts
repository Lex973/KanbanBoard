export type DeadlineStatus = 'deadline-overdue' | 'deadline-red' | 'deadline-yellow' | 'deadline-green' | 'none';

interface DeadlineResult {
    label: string;
    status: DeadlineStatus;
}

export const getDeadLineInfo = (deadline: string, now: Date): DeadlineResult => {
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(23, 59, 0, 0);

    const diffMs    = deadlineDate.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMs <= 0)       return { label: 'Просрочено',              status: 'deadline-overdue' };
    if (diffHours <= 2)    return { label: `Осталось: ${diffHours}ч`, status: 'deadline-red'     };
    if (diffHours <= 12)   return { label: `Осталось: ${diffHours}ч`, status: 'deadline-yellow'  };
    if (diffDays <= 3)     return { label: `Осталось: ${diffDays}д`,  status: 'deadline-yellow'  };
    return                        { label: `Осталось: ${diffDays}д`,  status: 'deadline-green'   };
};