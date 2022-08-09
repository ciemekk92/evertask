package com.predu.evertask.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DateUtil {

    private DateUtil() {}

    public static LocalDate dateToLocalDate(Date toConvert) {

        return toConvert
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    public static long numberOfDaysWithoutWeekends(LocalDate startDate, LocalDate finishDate) {

        long numberOfDays = 0L;

        while (startDate.isBefore(finishDate)) {
            if (startDate.getDayOfWeek() != DayOfWeek.SATURDAY && startDate.getDayOfWeek() != DayOfWeek.SUNDAY) {
                numberOfDays++;
            }
            startDate = startDate.plusDays(1L);
        }

        return numberOfDays;
    }
}
