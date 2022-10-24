import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Calendar from 'react-calendar'
import { supabase } from '../../../utils/supabaseClient';

export default function ScheduleCalender({ }) {
    const router = useRouter();

    const [date, changeDate] = useState(new Date());

    useEffect(() => {
        router.push({
            query: {
                date: date.getFullYear() + "-" + date.getMonth() + '-' + date.getDate()
            },
        })
      }, []);

    const dateChanged = (e) => {
        changeDate(e);
        router.push({
            query: {
                date: e.getFullYear() + "-" + e.getMonth() + '-' + e.getDate()
            },
        })
    }

    return (
        <>
            <div>
                <Calendar onChange={dateChanged} value={date} />
            </div>
        </>
    )
}