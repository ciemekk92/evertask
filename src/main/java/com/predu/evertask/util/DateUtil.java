package com.predu.evertask.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneId;

public class DateUtil {

    private DateUtil() {}

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

    public static OffsetDateTime addDaysToDateAndConvertToODTEndOfDay(LocalDate date, long days) {
        return date.plusDays(days)
                .atStartOfDay(ZoneId.systemDefault())
                .withHour(23).withMinute(59).withSecond(59)
                .toOffsetDateTime();
    }
}
